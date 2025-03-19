import React from "react";
import "./css/ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact-container">
      {/* Background Image */}
      <div className="background-overlay">
        {/*<img src="../images/groupphoto.jpg" alt="loading" />
      */}</div>

      <h2>Contact Us</h2>

      {/* Team Members in One Line */}
      <div className="team-container">
        <div className="team-member">
          <img src="../public/images/vedant.jpg" alt="Vedant Karle" />
          <h3>Vedant Karle</h3>
          <p>vedantkarle03@gmail.com </p>
        </div>
        <div className="team-member">
          <img src="../public/images/harshad.jpg" alt="Harshad Gidaye" />
          <h3>Harshad Gidaye</h3>
          <p>gidayeharshad37@gmail.com </p>
        </div>
        <div className="team-member">
          <img src="../public/images/sakshi.jpeg" alt="Sakshi Naphade" />
          <h3>Sakshi Naphade</h3>
          <p>sakshinaphade3@gmail.com</p>
        </div>
        <div className="team-member">
          <img src="../public/images/suraj.jpg" alt="Suraj Mitake" />
          <h3>Suraj Mitake</h3>
          <p>surajmitake2003@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;