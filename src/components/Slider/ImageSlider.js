import React, {useState, useEffect, useRef} from 'react'
import './ImageSlider.css'
import axios from 'axios'


const ImageSlider = () => {
    const firstRender = useRef(true)
    const [dataResponse, setDataResponse] = useState(null)
    const [slideIndex, setSlideIndex] = useState(1)
    const [pathArray, setPathArray] = useState([])

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;

            axios.get('/smartparking/news')
            .then(res => {
                setDataResponse(res.data)
            })
            .catch(err => {
                console.log(err)
            })

            // mapDataArray();
        }
    }, []);

    useEffect(() => {
        if(dataResponse !== null){
            setPathArray(dataResponse['data']);
        }
    })

    // const mapDataArray = () => {
    //     let check = true;
    //     while (check) {
    //         if (newsObj !== null) {
    //             setNewsPathArray(newsObj['data']);
    //             console.log("Array news path is already set");
    //             check = false
    //         }
    //     }
    // }


    const nextSlide = () => {
        if(slideIndex !== dataResponse['data'].length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataResponse['data'].length){
            setSlideIndex(1)
        }
    }


    const moveDot = index => {
        setSlideIndex(index)
    }

// ทำการ slide อัตโนมัติ
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