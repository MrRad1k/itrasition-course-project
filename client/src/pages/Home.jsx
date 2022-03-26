import Card from "../components/Card"
import axios from 'axios'
import { useEffect, useState } from 'react';

const Home = () => {
    const [reviews, setReview] = useState([])

    useEffect(() => {
        async function data() {
            try {
                const res = await axios.get(process.env.REACT_APP_API_URL + 'api/review', { mode: 'cors' })
                setReview(res.data.rows)
            } catch (e) {
                console.log(e)
            }
        }
        data()
    }, [])

    return (
        <div className="home">
            {reviews.map(post => (
                <Card key={post.id} post={post} />
            ))}
        </div>
    )
}

export default Home