import React from "react";

const StatsPanel = ({ stats }) => {
  return (
    <div className="stats">
      <h2>Your Progress</h2>
      <p>Creativity: {stats.creativity}</p>
      <p>Kindness: {stats.kindness}</p>
      <p>Adventure: {stats.adventure}</p>
    </div>
  );
};

export default StatsPanel;
