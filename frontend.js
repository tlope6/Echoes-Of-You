async function makeChoice(choice) {
    const response = await fetch('/make_choice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice })
    });

    const data = await response.json();
    const output = document.getElementById("output");

    if (response.ok) {
        output.innerHTML = `<p>${data.message}</p><pre>${JSON.stringify(data.player_data, null, 2)}</pre>`;
    } else {
        output.innerHTML = `<p>Error: ${data.error}</p>`;
    }
}
