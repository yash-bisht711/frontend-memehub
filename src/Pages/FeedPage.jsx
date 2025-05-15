import React from "react";
import MemeCard from "../componenets/Memecard";

const memes = [
  {
    id: "1",
    imageUrl: "https://i.imgflip.com/1ur9b0.jpg",
    captionTop: "When the code",
    captionBottom: "finally works at 3 AM",
    creator: "code_guy",
    createdAt: Date.now(),
    upvotes: 123,
    downvotes: 7,
    views: 2031,
    commentsCount: 14,
    tags: ["relatable", "developer"],
  },
];

function FeedPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {memes.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </div>
  );
}
export default FeedPage