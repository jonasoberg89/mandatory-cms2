import React, { useState, useEffect } from 'react';
import axios from "axios";
function Details(props) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    let productId = props.match.params.id

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

    return (
        <div className="row">
            <div className="col s2"></div>
            <div className="col s8">
                {loading ? <div className="progress"><div className="indeterminate"></div></div>
                    :

                    <div class="col s12 ">
                        <h2 class="header center">{data.name}</h2>
                        <div class="card horizontal medium">
                            <div class="card-image">
                                <img src={"http://localhost:8080/" + data.image.path} alt=""/>
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                    <p>{data.description}</p>
                                    <br/>
                                    <p>Lagersaldo: {data.amount}st</p>
                                    <h2>{data.price}:-</h2>
                                </div>
                                <div class="card-action">
                                    <a href="/">Lägg till i varukorgen</a>
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