import React from 'react';

const ChoiceButtons = ({ onMakeChoice }) => {
    const choices = [
        { id: 'explore_forest', label: 'Explore the Forest' },
        { id: 'help_villager', label: 'Help the Villager' },
        { id: 'write_poem', label: 'Write a Poem' },
    ];

    return (
        <div className="choices">
            {choices.map((choice) => (
                <button
                    key={choice.id}
                    className="choice-btn"
                    onClick={() => onMakeChoice(choice.id)}
                >
                    {choice.label}
                </button>
            ))}
        </div>
    );
};

export default ChoiceButtons;
