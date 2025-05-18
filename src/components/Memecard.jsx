import { Heart, MessageCircle, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MemeCard({ meme }) {
  const { allUserDetails } = useSelector(state => state.app)

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow overflow-hidden border border-gray-200 dark:border-zinc-700 hover:shadow-lg transition-all duration-200 w-170 mx-auto">
      <Link to={`/meme/${meme.id}`}>
        <div className="relative aspect-square w-full">
          <img
            src={meme.post_image}
            alt="Post Image"
            className="object-cover w-full h-full"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex justify-between">
          <span>👤 {allUserDetails[meme.created_by].handle}</span>
          <span>{new Date(meme.timestamp).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" /> {meme.up_vote - meme.down_vote}
            </span>
            {/* <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" /> {meme.commentsCount}
            </span> */}
            {/* <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {meme.views}
            </span> */}
          </div>
          {meme.tags && (
            <div className="text-xs text-blue-500 truncate max-w-[120px]">
              {meme.tags.split(',').map(tag => `#${tag.trim()}`).join()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
