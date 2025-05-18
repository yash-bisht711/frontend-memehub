import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MemesData } from "../componenets/util/RawData";
import axios from "axios";
import { useSelector } from "react-redux";

function MemeDetailPage() {
  const { id } = useParams();
  const { posts } = useSelector(state => state.app)
  const meme = posts.find((m) => m.id === id);
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments();
  }, [])

  const getComments = async () => {
    try {
      const response = await axios.get(`https://backend-memehub-production.up.railway.app/api/comments/?post_id=${id}`)
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  if (!meme) {
    return <div className="p-4 text-white">Meme not found.</div>;
  }

  return (
    <div className="p-4 text-white max-w-3xl mx-auto">
      {/* <h2 className="text-2xl font-bold mb-4">{meme.title}</h2> */}
      <img src={meme.post_image} alt='Post' className="w-full rounded mb-4" />
      <div className="text-gray-400 space-y-2">
        {/* <p>Views: {meme.views}</p> */}
        <p>Votes: {meme.up_vote - meme.down_vote}</p>
        <p>Comments:</p>
        <ul className="list-disc pl-6">
          {comments.map((comment, i) => (
            <li key={i}>{comment.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MemeDetailPage;
