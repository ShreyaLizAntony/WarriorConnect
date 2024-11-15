import React, { useState } from 'react';
import Header from '../header/header';
import XIcon from '../images/X.pdf';
import './profile.css';

const ProfileSetup = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    intro: '',
    academicTerm: '',
    program: '',
    courses: [{ courseID: '', section: '' }],
    socials: [{ platform: '', username: '' }],
    email: '',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (index, e) => {
    const updatedCourses = profile.courses.map((course, i) =>
      i === index ? { ...course, [e.target.name]: e.target.value } : course
    );
    setProfile({ ...profile, courses: updatedCourses });
  };

  const handleSocialChange = (index, e) => {
    const updatedSocials = profile.socials.map((social, i) =>
      i === index ? { ...social, [e.target.name]: e.target.value } : social
    );
    setProfile({ ...profile, socials: updatedSocials });
  };

  const addCourse = () => {
    setProfile({ ...profile, courses: [...profile.courses, { courseID: '', section: '' }] });
  };

  const deleteCourse = (index) => {
    setProfile({ ...profile, courses: profile.courses.filter((_, i) => i !== index) });
  };

  const addSocial = () => {
    setProfile({ ...profile, socials: [...profile.socials, { platform: '', username: '' }] });
  };

  const deleteSocial = (index) => {
    setProfile({ ...profile, socials: profile.socials.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile submitted:', profile);
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className="profile-setup">
        <h2>Setting up your profile</h2>
        
        <section>
          <h3>1. Personal Information</h3>
          <label>
            First Name:
            <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} />
          </label>
        </section>

        <section>
          <h3>2. Introductory Information</h3>
          <textarea
            name="intro"
            placeholder="start here..."
            value={profile.intro}
            onChange={handleChange}
          />
        </section>

        <section>
          <h3>3. Academic Information</h3>
          <label>
            Academic Term:
            <input type="text" name="academicTerm" value={profile.academicTerm} onChange={handleChange} />
          </label>
          <label>
            Program:
            <input type="text" name="program" value={profile.program} onChange={handleChange} />
          </label>
          <div className="course-list">
            <h4>What courses are you taking this term?</h4>
            {profile.courses.map((course, index) => (
              <div key={index} className="course-item">
                <input
                  type="text"
                  name="courseID"
                  placeholder="Course ID"
                  value={course.courseID}
                  onChange={(e) => handleCourseChange(index, e)}
                />
                <input
                  type="text"
                  name="section"
                  placeholder="Section Number"
                  value={course.section}
                  onChange={(e) => handleCourseChange(index, e)}
                />
                <button type="button" onClick={() => deleteCourse(index)}>
                  <img src={XIcon} alt="Delete" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addCourse} className="add-btn">Add</button>
          </div>
          <button className="upload-btn">Upload Current Class Schedule</button>
          <button className="upload-btn black">Upload Past Class Schedule</button>
        </section>

        <section>
          <h3>4. Contact Information</h3>
          {profile.socials.map((social, index) => (
            <div key={index} className="social-item">
              <input
                type="text"
                name="platform"
                placeholder="Platform (e.g., Instagram)"
                value={social.platform}
                onChange={(e) => handleSocialChange(index, e)}
              />
              <input
                type="text"
                name="username"
                placeholder="Username/Account"
                value={social.username}
                onChange={(e) => handleSocialChange(index, e)}
              />
              <button type="button" onClick={() => deleteSocial(index)}>
                <img src={XIcon} alt="Delete" />
              </button>
            </div>
          ))}
          <button type="button" onClick={addSocial} className="add-btn">Add Social Platform</button>

          <label>Personal Email Address: <input type="email" name="email" value={profile.email} onChange={handleChange} /></label>

        </section>
        <button type="submit" className="create-profile-btn">Create Profile</button>

      </form>
    </div>
  );
};

export default ProfileSetup;
