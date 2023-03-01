import React, { useState, useEffect, useRef } from 'react'
import './SearchCar.css'
import axios from 'axios'


function SearchPage() {
    const firstRender = useRef(true)
    const [provinceArray, setProvinceArray] = useState([])
    const [vehicleId, setVehicleId] = useState('')
    const [province, setProvince] = useState('')

    useEffect(() => {
        if(firstRender.current) {
            firstRender.current = false;

            axios.get('/smartparking/api/search/licenseplates/provinces')
            .then(res => {
                setProvinceArray(res.data['data'])
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = ({
            text: vehicleId,
            province: province
        });

        axios
            .post('/smartparking/api/search/licenseplates', data)
            .then((res) => {
                console.log("response =",res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    
        return (
            <div id='search-root'>
                <div className='hero-container'>
                    <h1>ค้นหารถยนต์ด้วยเลขทะเบียน</h1>
        
                    <form id='search-form' onSubmit={handleSubmit}>
                        <div className='search-input-field'>
                            <input 
                            type="text"
                            name="vehicleId"
                            onChange={(e) => setVehicleId(e.target.value)}
                            value={vehicleId}
                            placeholder="กรอกชุดตัวอักษรตามด้วยชุดตัวเลข เช่น ษฮ4992" 
                            />
                        </div>
        
                        <div className='search-select-field'>
                            <select 
                            name="province"
                            defaultValue={'DEFAULT'}
                            onChange={(e) => setProvince(e.target.value)}
                            >
                                <option value="DEFAULT" disabled>เลือกจังหวัด</option>
                                {provinceArray.map((object) => 
                                <option key={object.numberID} value={object.province_EN}>{object.province_TH}</option>
                                )}
                            </select>
                        </div>
        
                        <button className="search-button" type="submit">ค้นหา</button>
                    </form>
                    
                </div>
                <div id="search-section2">
                    Display Vehicle Data
                </div>
            </div>
          )
}

export default SearchPage