import React from 'react';
import './forYou.css';
import Header from '../header/header'

// Rectangle Component
function Rectangle({ title, content, buttonText , info}) {
  return (
    <div className="rectangle">
      <h3>{title} <span>{info}</span></h3>
      <p>{content}</p>
      {buttonText && <button className="button">{buttonText}</button>}
    </div>
  );
}

// Main App Component
function ForYou() {
  return (
    <div>
      <Header />
      <div className="content-container">
        <h1 className='title'>Latest Updates From Students You Connected With!</h1>
        <Rectangle 
        title="{FirstName} {LastName}" 
        info="{firstName} updated the introductory paragraph"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget enim lorem. Nam porttitor blandit volutpat. Nam a vulputate nisi, at egestas nisi. Vivamus lobortis ex in condimentum laoreet. Nunc ac pretium nulla, et porttitor tortor. Donec eleifend nunc mi, porttitor viverra tortor consequat interdum."
        buttonText="Unconnect!"/>
        
            
        <h1 className='title'>Look! These Students Are Taking The Same Courses As You! </h1>
        <Rectangle 
        title="{FirstName} {LastName}" 
        info="You and {FirstName} are both in {CourseID}"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget enim lorem. Nam porttitor blandit volutpat. Nam a vulputate nisi, at egestas nisi. Vivamus lobortis ex in condimentum laoreet. Nunc ac pretium nulla, et porttitor tortor. Donec eleifend nunc mi, porttitor viverra tortor consequat interdum."
        buttonText="Connect!"/>

        <h1 className='title'>You Share Simlar Interests With: </h1>
        <Rectangle 
        title="{FirstName} {LastName}" 
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget enim lorem. Nam porttitor blandit volutpat. Nam a vulputate nisi, at egestas nisi. Vivamus lobortis ex in condimentum laoreet. Nunc ac pretium nulla, et porttitor tortor. Donec eleifend nunc mi, porttitor viverra tortor consequat interdum."
        buttonText="Connect!"/>
      </div>
    </div>
  );
}

export default ForYou;
