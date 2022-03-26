import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Carousels from '../components/Carousels';
import { fetchOneReview } from "../http/reviewAPI";

const Post = () => {
  const [reviews, setReview] = useState([])

  const { id } = useParams()

  useEffect(() => {
    fetchOneReview(id).then(data => setReview(data))
  }, [])


  return (
    <div className="post">
      <Carousels />
      <h1 className="postTitle">{reviews.titel}</h1>
      <p className="postDesc">{reviews.text}</p>
    </div>
  );
};

export default Post;