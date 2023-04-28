import React, {useState, useEffect, useRef} from 'react'
import './ImageSlider.css'
import axios from 'axios'


const ImageSlider = () => {
    const firstRender = useRef(true)
    const [slideIndex, setSlideIndex] = useState(1)
    const [pathArray, setPathArray] = useState([])

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;

            axios.get('/smartparking/news')
            .then(res => {
                setPathArray(res.data['data'])
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, []);

    const nextSlide = () => {
        if(slideIndex !== pathArray.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === pathArray.length){
            setSlideIndex(1)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

// ทำการ slide อัตโนมัติในทุกๆ 3 วินาที
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        },3000);
        return () => clearInterval(interval);
    });

    return (
        <div className="container-slider" >
            {pathArray.map((object, index) => {
                return (
                    <div
                    // ในกรณีที่ไม่มี id key ให้กำหนด key={index}
                    key={index}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img 
                        src={`https://smart-park.ino.nectec.or.th:60249${object.path}`} 
                        alt=""
                        />
                    </div>
                )
            })}

            <div className="container-dots">
                {Array.from({length: pathArray.length}).map((item, index) => (
                    <div 
                    key={index}
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider