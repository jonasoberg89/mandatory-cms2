import React, { useState, useEffect } from 'react';

export function newItem() {

}

function Cart(props) {
    const [item, setitems] = useState();
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState({
        name: "",
        adress: "",
        Price: 0,
        products: {

        }
    })

    useEffect(() => {
        var result = JSON.parse(localStorage.getItem("products"));
        setitems(result);
        setLoading(false);
        return () => {

        }
    }, []);

    return (
        <div className="row">
        <h1 className="center">Varukogen</h1>
            <div className="col s2"></div>
            <div className="col s8">
                <div className="row ">
                    <form className="col s8">
                        <div className="row">
                            <div className="input-field col s8 ">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="icon_prefix" type="text" className="validate" />
                                <label htmlFor="icon_prefix">Namn</label>
                            </div>
                            <div className="input-field col s8">
                                <i className="material-icons prefix">house</i>
                                <input id="icon_house" type="tel" className="validate" />
                                <label htmlFor="icon_house">Adress</label>
                            </div>
                        </div>
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>Namn</th>
                                <th>Antal</th>
                                <th>Pris</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <div className="progress"><div className="indeterminate"></div></div>
                                : item.map(product => {
                                    return (
                                        <tr>
                                            <td>{product.name}</td>
                                            <td>{product.amount}</td>
                                            <td>{product.price}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
            <div className="col s2"></div>

        </div>
    );
}


export default Cart;        