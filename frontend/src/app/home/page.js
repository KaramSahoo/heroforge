"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [team, setTeam] = useState([]);
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeamData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ mission: input })
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch team data");
      }
      
      const data = await response.json();
      setTeam(data.state.team || []);
      setStory(data.state.story || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <input
        type="text"
        placeholder="Enter a command..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 rounded-md text-black w-full max-w-md"
      />
      <button
        onClick={fetchTeamData}
        className="mt-4 px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-400 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Team Info"}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {team && (<div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-lg text-center border border-gray-700 transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-bold text-blue-400">{member.alias}</h2>
            <p className="text-lg text-gray-300">{member.name}</p>
            <p className="mt-2 text-sm text-gray-400">{member.origin}</p>
            <p className="mt-2 text-sm">{member.power}</p>
            <div className="mt-4 p-3 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-green-400">{member.weapon.weapon_name}</h3>
              <p className="text-sm italic">{member.weapon.weapon_lore}</p>
              <p className="text-sm text-gray-400">Type: {member.weapon.weapon_type}</p>
            </div>
          </div>
        ))}
      </div>)}
      {story && (
        <div className="mt-10 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 w-full max-w-full text-center">
          <h2 className="text-2xl font-bold text-blue-400">Mission Story</h2>
          <p className="mt-4 text-gray-300 text-sm text-left">{story}</p>
        </div>
      )}
    </div>
  );
}
