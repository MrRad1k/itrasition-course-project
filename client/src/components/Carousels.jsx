import React from 'react';
import { Carousel } from 'react-bootstrap'
import { fetchOneReview } from "../http/reviewAPI";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'


const Carousels = () => {
    const [reviews, setReview] = useState()

    const { id } = useParams()

    useEffect(() => {
        fetchOneReview(id).then(data => setReview(data))
    }, [])

    return (
        <div>
            <Carousel >
                <Carousel.Item interval={1000} className='postImg'>
                    <img
                        src={reviews && reviews.images[0].img}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1000} className='postImg'>
                    <img
                        src={reviews && reviews.images[1].img}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1000} className='postImg'>
                    <img
                        src={reviews && reviews.images[2].img}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Carousels;