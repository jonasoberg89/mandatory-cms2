import React from 'react';

function Navbar () {


  return (
  <nav>
    <div className="nav-wrapper black">
      <a href="/" className="brand-logo center">Ölbolaget</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <a href="/cart"><i className="material-icons">shopping_cart</i></a>
      </ul>
    </div>
  </nav>
  );
}


export default Navbar;