import React from "react";
import { useParams } from "react-router-dom";
import { MemesData } from "../componenets/util/RawData";

function MemeDetailPage() {
  const { id } = useParams();
  const meme = MemesData.find((m) => m.id === id);

  if (!meme) {
    return <div className="p-4 text-white">Meme not found.</div>;
  }

  return (
    <div className="p-4 text-white max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{meme.title}</h2>
      <img src={meme.imageUrl} alt={meme.title} className="w-full rounded mb-4" />
      <div className="text-gray-400 space-y-2">
        <p>Views: {meme.views}</p>
        <p>Votes: {meme.votes}</p>
        <p>Comments:</p>
        <ul className="list-disc pl-6">
          {meme.comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MemeDetailPage;
