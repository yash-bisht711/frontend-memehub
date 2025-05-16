import { Heart, MessageCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function MemeCard({ meme }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-zinc-700 hover:shadow-lg transition-all duration-200">
      <Link to={`/meme/${meme.id}`}>
        <div className="relative aspect-square w-full">
          <img
            src={meme.imageUrl}
            alt={meme.captionTop || "Meme"}
            className="object-cover w-full h-full"
          />

          {meme.captionTop && (
            <div className="absolute top-2 w-full text-center font-bold text-white text-xl drop-shadow-md px-2">
              {meme.captionTop}
            </div>
          )}

          {meme.captionBottom && (
            <div className="absolute bottom-2 w-full text-center font-bold text-white text-xl drop-shadow-md px-2">
              {meme.captionBottom}
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex justify-between">
          <span>👤 {meme.creator}</span>
          <span>{new Date(meme.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" /> {meme.upvotes - meme.downvotes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" /> {meme.commentsCount}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {meme.views}
            </span>
          </div>
          {meme.tags && (
            <div className="text-xs text-blue-500 truncate max-w-[120px]">
              {meme.tags.map((tag) => `#${tag}`).join(" ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
