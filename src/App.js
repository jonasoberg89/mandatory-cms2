import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./componets/home";
import Navbar from "./componets/navbar";
import Details from "./componets/details"
import Cart from "./componets/cart";
function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Home}></Route>
         <Route path="/details/:id" component={Details}></Route>
        {/* <Route path="/cart/:id" component={Cart}></Route> */}
      </div>
    </BrowserRouter>

  );
}

export default App;
