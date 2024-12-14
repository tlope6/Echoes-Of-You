from flask import Flask, request, jsonify
import random
import requests

app = Flask(__name__)

# Example book API (Open Library)
BOOK_API_URL = "https://openlibrary.org/search.json"

# Example Spotify API (Replace with real OAuth token handling for production)
SPOTIFY_API_URL = "https://api.spotify.com/v1/recommendations"
SPOTIFY_AUTH_TOKEN = "YOUR_SPOTIFY_AUTH_TOKEN"

# User's evolving choices and actions
player_data = {
    "choices": [],
    "personality": {"creativity": 0, "kindness": 0, "adventure": 0}
}

@app.route('/start_game', methods=['POST'])
def start_game():
    # Reset player data
    global player_data
    player_data = {"choices": [], "personality": {"creativity": 0, "kindness": 0, "adventure": 0}}
    return jsonify({"message": "Game started!", "player_data": player_data})

@app.route('/make_choice', methods=['POST'])
def make_choice():
    # Player makes a choice
    data = request.json
    choice = data.get("choice")

    if not choice:
        return jsonify({"error": "No choice provided!"}), 400

    # Update personality traits based on choice
    outcomes = {
        "explore_forest": {"adventure": 5, "creativity": 2},
        "help_villager": {"kindness": 10},
        "write_poem": {"creativity": 8},
    }

    if choice in outcomes:
        for trait, value in outcomes[choice].items():
            player_data["personality"][trait] += value

        player_data["choices"].append(choice)
        return jsonify({"message": "Choice recorded!", "player_data": player_data})
    else:
        return jsonify({"error": "Invalid choice!"}), 400

@app.route('/get_music', methods=['GET'])
def get_music():
    # Fetch personalized music recommendations based on traits
    seed_genres = "classical,jazz" if player_data["personality"]["creativity"] > 10 else "pop,rock"
    headers = {"Authorization": f"Bearer {SPOTIFY_AUTH_TOKEN}"}
    params = {"seed_genres": seed_genres, "limit": 5}

    response = requests.get(SPOTIFY_API_URL, headers=headers, params=params)
    if response.status_code == 200:
        return jsonify({"music_recommendations": response.json()["tracks"]})
    else:
        return jsonify({"error": "Failed to fetch music recommendations!"}), 500

@app.route('/get_books', methods=['GET'])
def get_books():
    # Fetch books based on personality
    query = "adventure" if player_data["personality"]["adventure"] > 10 else "creativity"
    response = requests.get(BOOK_API_URL, params={"q": query, "limit": 5})

    if response.status_code == 200:
        books = response.json()["docs"][:5]
        book_results = [{"title": book["title"], "author": book.get("author_name", ["Unknown"])[0]} for book in books]
        return jsonify({"book_recommendations": book_results})
    else:
        return jsonify({"error": "Failed to fetch book recommendations!"}), 500

@app.route('/end_game', methods=['GET'])
def end_game():
    # Generate an artifact based on player actions
    artifact = f"You created a path full of {', '.join(player_data['choices'])}, revealing your adventurous and creative spirit!"
    return jsonify({"artifact": artifact, "personality_summary": player_data["personality"]})

if __name__ == "__main__":
    app.run(debug=True)
