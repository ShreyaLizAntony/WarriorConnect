import React from "react";
import './frontpage.css';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header'


const FrontPage = () => {

  const navigate = useNavigate();

    return (
        <div className="landing-page">
          
          <Header />
    
          {/* Tagline */}
          <h1 className="tagline">Connect with other like-minded students!</h1>
    
          {/* Paragraph */}
          <p className="description">
            Here we can put a small paragraph talking about the features of the website
          </p>
    
          {/* Sign-Up Section */}
          <div className="sign-up-section">
            <button className="sign-up-button">
              <span className="sign-up-text">Sign up now!</span>
            </button>
          </div>
    
          {/* Background Image */}
          <div 
            className="background-image"
            style={{
              backgroundImage: "url('/Stuck at Home Group Call.png')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          ></div>
        </div>
      );
  };
  
  export default FrontPage;
