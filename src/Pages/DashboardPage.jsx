import React, { useState } from "react";
import MemeCard from "../componenets/DashboardMemeCard";
import { MemesData } from "../componenets/util/RawData";

const UserDashboard = () => {
  const [memes, setMemes] = useState(MemesData);
  const [sortBy, setSortBy] = useState("date");


  const sortedMemes = [...memes].sort((a, b) => {
    if (sortBy === "date") return b.createdAt - a.createdAt;
    if (sortBy === "votes") return b.votes - a.votes;
    return 0;
  });

  const handleDelete = (id) => {
    setMemes((prev) => prev.filter((meme) => meme.id !== id));
  };

  const handleEdit = (meme) => {
    console.log("Editing meme:", meme);
    // Navigate to editor or open a modal
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Memes</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[#1a1a1b] border border-gray-600 p-2 rounded text-white"
        >
          <option value="date">Sort by Date</option>
          <option value="votes">Sort by Popularity</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMemes.map((meme) => (
          <MemeCard
            key={meme.id}
            meme={{
              ...meme,
              comments: meme.comments ?? [],
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
