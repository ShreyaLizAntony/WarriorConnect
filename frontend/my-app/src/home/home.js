// Home.js
import React from 'react';
import './home.css';
import xIcon from '../images/X.pdf';
import editIcon from '../images/Edit.pdf';
import Header from '../header/header'

function getProfileData() {
  return {
      firstName: "Firstname",
      lastName: "LastName",
      academicTerm: "Fall 2023",
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget enim lorem. Nam porttitor blandit volutpat. Nam a vulputate nisi, at egestas nisi. Vivamus lobortis ex in condimentum laoreet. Nunc ac pretium nulla, et porttitor tortor. Donec eleifend nunc mi, porttitor viverra tortor consequat interdum.",
      socials: {
          instagram: "your_instagram",
          x: "your_x_account",
          linkedin: "your_linkedin"
      },
      courses: [
          { id: "COURSEXXXX", section: "XXX" },
          { id: "COURSEYYYY", section: "YYY" } // Add more courses as needed
      ]
  };
}

function Home() {
  const Profile = getProfileData();
  
  return (
    
    <div>
        
        <Header />
        
    <div className="profile-container">
      <header className="profile-header">
        <h1>{Profile.firstName} {Profile.lastName} Profile:</h1>
        <p>Academic Term: {Profile.academicTerm}</p>
        <p>You introduced yourself as:</p>
      </header>
      
      <div className="profile-introduction">
        <textarea 
          className="introduction-text" 
          placeholder={Profile.introduction}
          rows="5"
          readOnly
        />
        <img src={editIcon} alt="Edit" className="icon edit-icon" />
      </div>

      <section className="socials-section">
        <h2>Socials:</h2>
        <div className="socials-icons">
          <img src={xIcon} alt="Remove" className="icon remove-icon" />
          <img src={editIcon} alt="Edit" className="icon edit-icon" />
        </div>
        <ul className="socials-list">
          <li>Instagram Account:</li>
          <li>X Account:</li>
          <li>LinkedIn Account:</li>
          <li>Discord Account:</li>
          <li>Snapchat Account:</li>
          <li>Personal Email Address:</li>
        </ul>
      </section>

      <section className="courses-section">
      <h2>The Courses They You Taking in {Profile.academicTerm} Term:</h2>
                <div className="course-table">
                    <div className="course-header">
                        <span className='course-header-section'>Course ID</span>
                        <span className='course-header-section'>Section Number</span>
                        <img src={xIcon} alt="Remove" className="icon table-icon" />
                        <img src={editIcon} alt="Edit" className="icon table-icon" /> 
                    </div>
                    {Profile.courses.map((course, index) => (
                        <div key={index} className="course-row">
                            <span>{course.id}</span>
                            <span>{course.section}</span>
                        </div>
                    ))}
                </div>

      
                
      </section>

      <button className="save-button">Save Changes</button>
    </div>
    </div>
  );
}

export default Home;
