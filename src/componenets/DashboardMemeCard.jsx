import React from "react";
import { Trash2, Edit } from "lucide-react";

const MemeCard = ({ meme, onEdit, onDelete }) => {
  return (
    <div className="bg-[#1a1a1b] rounded p-4 shadow text-white space-y-2">
      <div className="relative">
        <img
          src={
            meme.post_image ||
            "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={meme.description || "Meme"}
          className="rounded w-full h-60 object-cover"
        />
        <span className="absolute top-2 right-2 text-xs text-gray-300 bg-black/50 px-2 py-1 rounded">
          {new Date(meme.timestamp).toLocaleDateString()}
        </span>
      </div>

      <h3 className="text-lg font-semibold">
        {meme.description || "Untitled Meme"}
      </h3>

      <div className="text-sm text-gray-400 flex flex-wrap gap-x-4 gap-y-1">
        <p>Views: 0</p>
        <p>Votes: {(meme.up_vote ?? 0) - (meme.down_vote ?? 0)}</p>
        <p>Comments: 0</p>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onEdit(meme)}
          className="text-blue-400 hover:underline flex items-center gap-1"
        >
          <Edit size={16} /> Edit
        </button>

        <button
          onClick={() => onDelete(meme.id)}
          className="text-red-400 hover:underline flex items-center gap-1"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

export default MemeCard;
