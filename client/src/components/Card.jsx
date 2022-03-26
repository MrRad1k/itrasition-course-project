import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios'

const Card = ({ post }) => {
  const [reviews, setReview] = useState()

  useEffect(() => {
    async function data() {
      try {
        const res = await axios.get(process.env.REACT_APP_API_URL + 'api/review/' + post.id, { mode: 'cors' })
        setReview(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    data()
  }, [])


  return (
    <div className="card">
      <Link className="link" to={`/review/${post.id}`}>
        <span className="title">{post.titel}</span>
        <img src={reviews?.images[0]?.img} alt="" className="img" />
        <button className="cardButton">Read More</button>
      </Link>
    </div>
  );
};

export default Card;