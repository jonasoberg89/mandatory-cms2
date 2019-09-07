import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
function Body(props) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setData(props.beer)
        setLoading(false);
        console.log(props.beer);
        return () => {
          setLoading(true);
          }
    }, [props.beer]);

    return (
        <div className="row">
            <div className="col s2"></div>
            <div className="col s8">
                {loading ? <div className="progress"><div className="indeterminate"></div></div>
                    : data.map(product => {
                        return (
                            <div key={product._id} className="col s4">
                                <div className="card large">
                                    <div className="card-image">
                                        <img className="responsive-img" src={"http://localhost:8080/" + product.image.path} alt="" />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title">{product.name}</span>
                                        <p>Pris: {product.price} sek</p>
                                    </div>
                                    <div className="card-action">
                                        <Link to={"/details/"+ product._id}>Info...</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                }

            </div>
            <div className="col s2"></div>

        </div>
    );
}


export default Body;        