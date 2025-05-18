import React from "react";
import MemeCard from "../components/Memecard";
import MainBody from "../components/MainBody";
import { MemesData } from "../componenets/util/RawData";
import { useSelector } from "react-redux";

function FeedPage() {
  const { search } = useSelector(state => state.app)

  const filter = () => {
    return MemesData.filter(meme => {
      if (search == '') return true

      return meme.tags.join(', ').toLowerCase().includes(search.toLowerCase())
    })
  }

  return (
    <MainBody>
      {filter().map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </MainBody>
  );
}
export default FeedPage