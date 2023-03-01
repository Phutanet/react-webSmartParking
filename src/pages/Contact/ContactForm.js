import React, { useState } from 'react'
import './ContactForm.css'
import axios from 'axios'



function ContactForm() {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [topic, setTopic] = useState('')
    const [content, setContent] = useState('')

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
                console.log("response =",res);
            })
            .catch((err) => {
                console.log(err);
            });
    };


  return (
    <div id='contact-section-1'>
        <div id='contact-form-container'>
            <h2>แบบฟอร์มการติดต่อ</h2>

            <form id='contact-form' onSubmit={handleSubmit}>

                <div className="input-box">
                    <label>อีเมล</label>
                    <input 
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="ตัวอย่างเช่น 'you@gmail.com' " 
                    />
                </div>

                <div className="input-box">
                    <label>เบอร์โทรศัพท์</label>
                    <input 
                    type="text"
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    placeholder="ตัวอย่างเช่น '063-123-4567' " 
                    />
                </div>

                <div className="input-box">
                    <label>เรื่อง</label>
                    <input 
                    type="text"
                    name="topic"
                    onChange={(e) => setTopic(e.target.value)}
                    value={topic}
                    placeholder="เรื่อง"
                    />
                </div>

                <div className="input-box">
                    <label>เนื้อความ</label>
                    <textarea
                    rows={6}
                    type="text"
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    placeholder="ข้อความที่ต้องการส่ง..."
                    />
                </div>

                <div id="contact-submit-btn-container">
                    <button id="contact-submit-btn" type="submit">ส่ง</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ContactForm