import React, { useState, useEffect } from 'react';

export function newItem (){

}

function Cart(props) {
    const[cart, setCart] = useState({
        name: "",
        adress:"",
        Price:0,
        products: {
    
        }
      })
  
    useEffect(() => {
      

        return () => {
        
          }
    }, []);

    return (
        <div className="row">
            <div className="col s2"></div>
            <div className="col s8">
            tjena

            </div>
            <div className="col s2"></div>

        </div>
    );
}


export default Cart;        