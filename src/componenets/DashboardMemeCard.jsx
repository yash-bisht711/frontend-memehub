import React from "react";
import { Trash2, Edit } from "lucide-react";

const MemeCard = ({ meme, onEdit, onDelete }) => {
  return (
    <div className="bg-[#1a1a1b] rounded p-4 shadow text-white space-y-2">
      <img
        src={
          meme.post_image || "https://via.placeholder.com/400x300?text=No+Image"
        }
        alt={meme.description || "Meme"}
        className="rounded w-full h-60 object-cover"
      />
      <h3 className="text-lg font-semibold">
        {meme.description || "Untitled Meme"}
      </h3>

      <div className="text-sm text-gray-400 space-y-1">
        <p>Views: 0</p> {/* Placeholder since views aren't in the data */}
        <p>Votes: {(meme.up_vote ?? 0) - (meme.down_vote ?? 0)}</p>
        <p>Comments: 0</p> {/* Placeholder since comments aren't in the data */}
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
