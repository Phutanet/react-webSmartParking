import React, { useState } from 'react';
import './ContactPage.css'
import ContactForm from './ContactForm';
import Info from './Info';
import Map from './Map';



function ContactPage() {
  return (
    <div id="contact-root">
      {/* Contact Form */}
      <div id="contact-section-1">
        <ContactForm />
      </div>
      {/* close tag section1 */}

      <div id="contact-section-2">
        <Info />
      </div>
      {/* close tag section2 */}

      <div id="contact-section-3">
        <Map />
      </div>
      {/* close tag section3 */}
    </div>
    
  )
}

export default ContactPage