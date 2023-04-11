import React, { useState } from 'react';
import './Contact.css';
import InputField from '../../components/fields/InputField';
import Button from '../../components/button/Button';
import LeafletMap from '../../components/map/LeafletMap';
import axios from 'axios';
import Swal from 'sweetalert2';


function Contact() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = ({
            email: email,
            phone: phone,
            title: topic,
            msg: content
        });

        axios
            .post('/smartparking/contact/post', data)
            .then((res) => {
                Swal.fire({
                    title: 'ส่งข้อความสำเร็จ',
                    text: 'เราได้รับข้อความติดต่อเป็นที่สำเร็จ และจะติดต่อกลับไปในภายหลัง',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.reload();
                })
            })
            .catch((err) => {
                Swal.fire({
                    title: 'ส่งข้อความไม่สำเร็จ',
                    text: err.msg,
                    icon: 'error',
                    showConfirmButton: true
                })
                console.log(err);
            });
    };


  return (
    <div className='page-layout'>
        <div id='contact-page-background'>
            <div id='contact-content-container'>
                <div id='contact-form-layout'>
                    <h1>ติดต่อเจ้าหน้าที่</h1>
                    <form id='contact-form' onSubmit={handleSubmit}>
                        <InputField 
                            label="อีเมล"
                            name="email"
                            className="contact-field"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ตัวอย่างเช่น 'you@gmail.com' "
                            required={true}
                            errMessage="Email must be formatted correctly."
                        />
                        <InputField 
                            label="เบอร์โทรศัพท์"
                            name="phone"
                            className="contact-field"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="ตัวอย่างเช่น '063-123-4567' "
                            required={true}
                            pattern="^[0-9\s-]+$"
                            errMessage="Phone number can only contain numbers, spaces, and hyphens."
                        />
                        <InputField 
                            label="เรื่อง"
                            name="topic"
                            className="contact-field"
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="หัวข้อ / topic"
                            required={true}
                            pattern="^.+$"
                            errMessage="Please provide information."
                        />
                        <label>เนื้อความ</label>
                        <textarea 
                            rows={6}
                            type="text"
                            name="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="เนื้อหา / content"
                            required={true}
                        />

                        <Button label="ส่ง" type="submit" className="id-btn" />

                    </form>
                </div>
                <div id='map-layout'>
                    <LeafletMap/>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Contact