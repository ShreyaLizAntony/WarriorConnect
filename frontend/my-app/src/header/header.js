import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../images/Logo.pdf'

function Header () {
  return (
    <div class="header">
    <img class="logo" src="/logo.svg" alt="Logo"></img>
    <div class="header-right">
    <Link className='a' to='/Home'>Home</Link>
    <Link className='a' to='/ForYou'>For You</Link>
    <Link className='a' to='/Register'>Register</Link>
  </div>
</div>
  );
};

export default Header;