import React, { useState, useEffect } from 'react';
import Body from "./body";
import axios from "axios";
import {updateToken} from "./storage";

function Home() {

    const [data, setData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(0);
    const pageNumbers = [];
    const[pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        console.log("tjena")
        if (!checked) {
            let fetchData = async () => {
                let result = await axios(
                    'http://localhost:8080/api/collections/get/products?token=dd9a8d75bef9abea2c7a79bc3be82c&limit=9&skip='+pageNumber+'&filter[name][$regex]=' + search
                );
                setData(result.data.entries);
                setPerPage(Math.ceil(result.data.entries.length / 9));
            };
            fetchData();
        } else {
            let fetchData = async () => {
                let result = await axios(
                    'http://localhost:8080/api/collections/get/products?token=dd9a8d75bef9abea2c7a79bc3be82c&filter[amount][$gte]=1',
                );
                setData(result.data.entries);
            };
            fetchData();

        }
        return () => {
            console.log("Unmount");
        }
    }, [checked, search]);

    function pagination(){

        for (let i = 1; i <= perPage; i++) {
            pageNumbers.push(i);
        }
        console.log(pageNumbers)
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li key={number} onClick={(number)=>{setPageNumber(number)}} className="active"><a href="#!"id={number}>{number}</a></li>
            )
        });
        return renderPageNumbers
    }
 


    return (
        <div>
            <div className="row">
                <div className="col s4"></div>
                <div className="col s4">
                    <div className="input-field">
                        <input id="input_text"
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                            type="text" />
                        <label htmlFor="textarea1">Search</label>
                    </div>
                </div>
                <div className="col s4"></div>
                <div className="col s12">
                    <form className="center" action="">
                        <p>
                            <label>
                                <input onClick={(e) => setChecked(!checked)} type="checkbox" id="check" className="filled-in" checked={checked} />
                                <span htmlFor="check">Finns i lager</span>
                            </label>
                        </p>
                    </form>
                </div>
            </div>
            <Body beer={data} />
                <div className="col s12">
                    <ul className="pagination center">
                        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                        {
                            pagination()
                        }
                        <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                    </ul>
                </div>
        </div>
    );
}


export default Home;