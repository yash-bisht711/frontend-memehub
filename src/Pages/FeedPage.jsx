import React from "react";
import MemeCard from "../components/Memecard";
import MainBody from "../components/MainBody";
import { MemesData } from "../componenets/util/RawData";

function FeedPage() {
  return (
    <MainBody>
      {MemesData.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </MainBody>
  );
}
export default FeedPage