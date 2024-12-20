import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../css/Carousel.css';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
    const history=useNavigate();
    const carouselRef = useRef(null);
    const sliderRef = useRef(null);
    const thumbnailBorderRef = useRef(null);
    const timeRef = useRef(null);
    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
        const fetchCarouselItems = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/stuffs');
                setCarouselItems(response.data.stuffs);
            } catch (error) {
                console.error('Error fetching carousel items:', error.message);
            }
        };

        fetchCarouselItems();

        const nextDom = document.getElementById('next');
        const prevDom = document.getElementById('prev');
        const timeRunning = 3000;
        const timeAutoNext = 7000;

        let runTimeOut;
        let runNextAuto = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext);

        const showSlider = (type) => {
            const SliderItemsDom = sliderRef.current.querySelectorAll('.carousel .list .item');
            const thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

            if (type === 'next') {
                sliderRef.current.appendChild(SliderItemsDom[0]);
                thumbnailBorderRef.current.appendChild(thumbnailItemsDom[0]);
                carouselRef.current.classList.add('next');
            } else {
                sliderRef.current.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
                thumbnailBorderRef.current.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
                carouselRef.current.classList.add('prev');
            }

            clearTimeout(runTimeOut);
            runTimeOut = setTimeout(() => {
                carouselRef.current.classList.remove('next');
                carouselRef.current.classList.remove('prev');
            }, timeRunning);

            clearTimeout(runNextAuto);
            runNextAuto = setTimeout(() => {
                nextDom.click();
            }, timeAutoNext);
        };

        nextDom.onclick = () => showSlider('next');
        prevDom.onclick = () => showSlider('prev');

        return () => {
            nextDom.onclick = null;
            prevDom.onclick = null;
            clearTimeout(runNextAuto);
            clearTimeout(runTimeOut);
        };
    }, []);

    const handleSeeMore = (id) => {
        history(`/data/${id}`);
    };

    return (
        <div className="carousel" ref={carouselRef}>
            <div className="list" ref={sliderRef} >
                {carouselItems.map((item, index) => (
                    <div className="item" key={item._id}>
                        <img src={item.imageSrc} alt={`Slide ${index + 1}`} />
                        <div className="content" style={{backgroundColor:"#21252970",boxShadow: "0 2px 30px rgb(33, 37, 41)"}}>
                            <div className="title">{item.name}</div>
                            <div className="topic">{item.state}</div>
                            <div style={{fontSize:"16px"}} className="des">{item.description}</div>
                            <div className="buttons">
                                <button onClick={() => handleSeeMore(item._id)}>SEE MORE</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="thumbnail" ref={thumbnailBorderRef}>
                {carouselItems.map((item, index) => (
                    <div className="item" key={`thumb${item._id}`}>
                        <img src={item.imageSrc} alt={`Thumbnail ${index}`} />
                        <div className="content">
                            <div className="title">{item.name}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="arrows">
                <button id="prev">{'<'}</button>
                <button id="next">{'>'}</button>
            </div>
            <div className="time" ref={timeRef}></div>
        </div>
    );
};

export default Carousel;
