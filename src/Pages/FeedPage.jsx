import React, { useState, useEffect, useRef, useCallback } from "react";
import MemeCard from "../components/Memecard";
import MainBody from "../components/MainBody";
import { useSelector } from "react-redux";
import { MemesData } from "../componenets/util/RawData"; // mock data


function FeedPage() {
  const { posts, search } = useSelector(state => state.app)
  
  const [visibleMemes, setVisibleMemes] = useState([]);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const itemsPerPage = 5;
  
  const filter = () => {
    return posts.filter(meme => {
      if (search == '') return true

      return meme.tags.join(', ').toLowerCase().includes(search.toLowerCase())
    })
  }
  
  useEffect(() => {
    const newMemes = MemesData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    setVisibleMemes((prev) => [...prev, ...newMemes]);
  }, [page]);
    const lastMemeRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    []
  );

  return (
    <MainBody>
      {filter().visibleMemes.map((meme, index) => (
        <MemeCard
          key={meme.id} 
          meme={meme} 
          ref={index === visibleMemes.length - 1 ? lastMemeRef : null}
        />
      ))}
      <p style={{ textAlign: "center", margin: "1rem" }}>Loading...</p>
    </MainBody>
  );
}

export default FeedPage;
