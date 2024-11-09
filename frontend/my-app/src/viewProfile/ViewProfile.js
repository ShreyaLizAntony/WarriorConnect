import React from 'react';
import Header from '../header/header';
import './ViewProfile.css';

function getProfileData() {
    return {
        firstName: "Firstname",
        lastName: "LastName",
        birthday: "__/__/____",
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

function ViewProfile() {
    const profile = getProfileData();

    return (
        <div className="view-profile">
            <Header />
            <div className="profile-container">
                <h1>{profile.firstName} {profile.lastName} Profile:</h1>
                <p>Their birthday is {profile.birthday}</p>
                <p>Academic Term: {profile.academicTerm}</p>
                <p>They introduced yourself as:</p>
                <div className="introduction-box">
                    <p>{profile.introduction}</p>
                </div>

                <h2>Socials:</h2>
                <p>Instagram Account: {profile.socials.instagram}</p>
                <p>X Account: {profile.socials.x}</p>
                <p>LinkedIn Account: {profile.socials.linkedin}</p>

                <h2>The Courses They Are Taking in {profile.academicTerm} Term:</h2>
                <div className="course-table">
                    <div className="course-header">
                        <span className='course-header-section'>Course ID</span>
                        <span className='course-header-section'>Section Number</span>
                    </div>
                    {profile.courses.map((course, index) => (
                        <div key={index} className="course-row">
                            <span>{course.id}</span>
                            <span>{course.section}</span>
                        </div>
                    ))}
                </div>

                <button className="connect-button">Connect!</button>
            </div>
        </div>
    );
}

export default ViewProfile;
