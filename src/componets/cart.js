import React, { useState, useEffect } from 'react';
import { product$ } from "./store";
import { updateOrder } from "./store";
import Styles from "../style/cart.module.css"
import axios from "axios";
export function newItem() {

}

function Cart(props) {
    const [items, setitems] = useState();
    const [name, setName] = useState("");
    const [adress, setAdress] = useState("")
    // const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const [totalPrice, setTotalPrice] = useState();
    const [cart, setCart] = useState([])
    const [product, setProduct] = useState([""]);

    useEffect(() => {
        if(product === null)return
        setLoading(false);
        const total = product.reduce((total, data) => total + parseInt(data.amount * data.price), 0)
        setTotalPrice(total);
        return () => {

        }
    }, [product]);
    useEffect(() => {
        const subscription = product$.subscribe(setProduct)
        const total = product.reduce((total, data) => total + parseInt(data.amount * data.price), 0)
        setTotalPrice(total);
        return () => {
            subscription.unsubscribe();
        }
    }, []);


    function orderFunction(e) {
        e.preventDefault();
        if(name.length === 0|| adress.length === 0||product.length===0)return;
        axios.post("http://localhost:8080/api/collections/save/orders?token=dd9a8d75bef9abea2c7a79bc3be82c",
            {
                data: {
                    "name": name,
                    "adress": adress,
                    "price": totalPrice,
                    "products":  
                        product.map(val =>{
                            return(
                                {value:{
                                    name:val.name,
                                    amount:val.amount + "st",
                                    price:val.price + "sek"
                                }
                                }
                            )
                        })
                    
                }
            })
            .then(res => {
                updateOrder(null);
                props.history.push("/complete");
            }).catch(err => {
                console.log(err);
            })


    }

    function removeItem(id) {
        let newData = product.filter(product => {
            return (
                product.id !== id
            )
        })
        updateOrder(newData);
    }

    function renderCart(){
        if(product === null) return
      let render =   product.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.amount}</td>
                    <td>{product.price}</td>
                    <td onClick={(e) => { removeItem(product.id) }}><i className={`material-icons ${Styles['remove_item']}`}>remove_circle_outline</i></td>
                </tr>
            )
    })
    return render;
}

    return (
        <div className="row">
            <h1 className="center">Varukogen</h1>
            <div className="col s2"></div>
            <div className="col s8">
                <div className="row ">

                    <table>
                        <thead>
                            <tr>
                                <th>Namn</th>
                                <th>Antal</th>
                                <th>Pris</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td>Din varukorg är tom!</td></tr>:renderCart()}
                        </tbody>
                    </table>
                    <div className="col s12">
                        <h4 className="right">Total: {totalPrice} :-</h4>
                    </div>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6 ">
                                <i className="material-icons prefix">account_circle</i>
                                <input
                                    value={name}
                                    onChange={(e => setName(e.target.value))}
                                    id="icon_prefix"
                                    type="text"
                                    className="validate" />
                                <label htmlFor="icon_prefix">Namn</label>
                            </div>
                            <div className="input-field col s6">
                                <i className="material-icons prefix">house</i>
                                <input
                                    value={adress}
                                    onChange={(e => setAdress(e.target.value))}
                                    id="icon_house"
                                    type="text"
                                    className="validate" />
                                <label htmlFor="icon_house">Adress</label>
                            </div>
                        </div>
                        <a onClick={orderFunction} href="" className="waves-effect waves-light btn-large right black">Beställ</a>
                    </form>
                </div>
            </div>
            <div className="col s2"></div>

        </div>
    );
}


export default Cart;        