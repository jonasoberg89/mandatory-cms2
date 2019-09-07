import React from 'react';

function Navbar () {


  return (
  <nav>
    <div className="nav-wrapper">
      <a href="/" className="brand-logo center">Beer</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      <i className="material-icons">shopping_cart</i>
      </ul>
    </div>
  </nav>
  );
}


export default Navbar;