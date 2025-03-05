"use client";

import { GalleryPage } from "@/components/gallery/gallery";
import { useState } from "react";

export default function Gallery() {
  const [input, setInput] = useState("");
  const [team, setTeam] = useState([]);
  const [story, setStory] = useState("");
  const [storyName, setStoryName] = useState("");
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
      setStoryName(data.state.team_name || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <GalleryPage></GalleryPage>
  );
}
