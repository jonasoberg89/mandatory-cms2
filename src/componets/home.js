import React, { useState, useEffect } from 'react';
import Body from "./body";
import axios from "axios";

function Home() {

    const [data, setData] = useState([]);
    const[checked, setChecked] =useState(false);

    useEffect(() => {
        if(!checked){
        let fetchData = async () => {
            let result = await axios(
                'http://localhost:8080/api/collections/get/products?token=dd9a8d75bef9abea2c7a79bc3be82c',
            );
            setData(result.data.entries);
        };
        fetchData();
    }else{
        let fetchData = async () => {
            let result = await axios(
                'http://localhost:8080/api/collections/get/products?token=dd9a8d75bef9abea2c7a79bc3be82c&filter[amount][$gte]=1',
            );
            setData(result.data.entries);
        };
        fetchData();

    }
    }, [checked]);


    return (
        <div>
            <div className="row">
                <div className="col s4"></div>
                <div className="col s4">
                    <div className="input-field">
                        <input id="input_text"
                            autoComplete="off"
                            minLength="1"
                            maxLength="40"
                            type="text" data-length="20" />
                        <label htmlFor="textarea1">Search</label>
                    </div>
                </div>
                <div className="col s4"></div>
                <div className="col s12">
                    <ul className="pagination center">
                        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                        <li className="active"><a href="#!">1</a></li>
                        <li className="waves-effect"><a href="#!">2</a></li>
                        <li className="waves-effect"><a href="#!">3</a></li>
                        <li className="waves-effect"><a href="#!">4</a></li>
                        <li className="waves-effect"><a href="#!">5</a></li>
                        <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                    </ul>
                    <form className="center" action="">
                        <p>
                            <label>
                                <input onChange={(e)=>setChecked(!checked)} type="checkbox" id="check" className="filled-in" checked={checked} />
                                <span htmlFor="check">Finns i lager</span>
                            </label>
                        </p>
                    </form>
                </div>
            </div>
            <Body beer={data} />
        </div>
    );
}


export default Home;