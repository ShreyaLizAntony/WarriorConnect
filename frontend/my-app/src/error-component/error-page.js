import React from 'react';
import './error-page.css';

const ErrorPage = () => {
  return (
    <div class="container">
      <img class='errorImg' src="/Goodies Error.png" alt="Error"></img>
      <p class='errorText'>An Error Occurred. Try Refreshing the page.</p>
    </div>
  );
};

export default ErrorPage;