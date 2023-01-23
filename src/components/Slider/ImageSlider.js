import React, {useState} from 'react'
import './ImageSlider.css'
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'



const ImageSlider = () => {
    // const [currentIndex, setCurrentUser] = useState(0);
    
    // const slideContainer = {
    //     height: "100%",
    //     position: "relative",
    // };
    // const slideStyle = {
    //     width: "100%",
    //     height: "100%",
    //     borderRadius: "10px",
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    //     backgroundImage: `url(${slides[currentIndex].url})`,
    // };

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
            {dataSlider.map((obj, index) => {
                return (
                    <div
                    key={obj.id}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img 
                        src={process.env.PUBLIC_URL + `/images/image-${index + 1}.jpg`} 
                        />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: 5}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider