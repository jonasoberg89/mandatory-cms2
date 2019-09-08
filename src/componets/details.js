import React, { useState, useEffect } from 'react';
import axios from "axios";
import {newItem} from "./cart";
function Details(props) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [amount, setAmount] = useState(0)
    let productId = props.match.params.id
    const [item , setItem] = useState([])

    useEffect(() => {
        console.log(productId)
        let fetchData = async () => {
            let result = await axios(
                'http://localhost:8080/api/collections/get/products?token=dd9a8d75bef9abea2c7a79bc3be82c&filter[_id]=' + productId
            );
            setData(result.data.entries[0]);
            setLoading(false);
            console.log(result.data.entries)
        };
        fetchData();
        return () => {
            console.log("Unmount");
            setLoading(true);
          }
    }, []);

    function addToCart(){
        setItem({
            name:data.name,
            amount: amount
        })
    }

    return (
        <div className="row">
            <div className="col s2"></div>
            <div className="col s8">
                {loading ? <div className="progress"><div className="indeterminate"></div></div>
                    :

                    <div className="col s12 ">
                        <h2 className="header center">{data.name}</h2>
                        <div className="card horizontal medium">
                            <div className="card-image">
                                <img src={"http://localhost:8080/" + data.image.path} alt=""/>
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <p>{data.description}</p>
                                    <br/>
                                    <p>Lagersaldo: {data.amount}st</p>
                                    <h2>{data.price}:-</h2>
                                </div>
                                <div className="card-action">
                                <div className="col s2">
                                <input 
                                    onChange={(e)=>setAmount(e.target.value)}
                                    placeholder="välj antal" 
                                    type="number" min="1" 
                                    max="100"/>
                                </div>
                                <a onClick={addToCart} class="waves-effect waves-light btn right">LÄGG TILL I VARUKORG</a>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
            <div className="col s2"></div>

        </div>
    );
}


export default Details;