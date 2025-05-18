import MemeCard from "../components/Memecard";
import MainBody from "../components/MainBody";
import { useSelector } from "react-redux";
import { MemesData } from "../componenets/util/RawData"; // mock data


function FeedPage() {
  const { posts, search } = useSelector(state => state.app)

  const filter = () => {
    return posts.filter(meme => {
      if (search == '') return true

      return meme.tags.toLowerCase().includes(search.toLowerCase())
    })
  }

  return (
    <MainBody>
      {filter().map((meme, index) => (
        <MemeCard
          key={meme.id}
          meme={meme}
      
        />
      ))}
      
    </MainBody>
  );
}

export default FeedPage;
