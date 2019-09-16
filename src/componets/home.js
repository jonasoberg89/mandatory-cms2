import React, { useState, useEffect } from 'react';
import Body from "./body";
import axios from "axios";
import Classnames from "classnames"



function Home(props) {

    const [data, setData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(0);
    const pageNumbers = [];
    const [pageNumber, setPageNumber] = useState(1)
    props.match.params = pageNumber;
    
    useEffect(() => {
        if (!checked) {
            let fetchData = async () => {
                let result = await axios(
                    'http://localhost:8080/api/collections/get/products?token=dd9a8d75bef9abea2c7a79bc3be82c&filter[name][$regex]=' + search + '&limit=9&skip=' + (pageNumber - 1) * 9);
                setData(result.data.entries);
                console.log(result)
                setPerPage(Math.ceil(result.data.total / 9));
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
        let myData = async () => {
            let result = await axios(
                'http://localhost:8080/api/collections/get/orders?token=dd9a8d75bef9abea2c7a79bc3be82c',
            );
           console.log(result.data)
        };
        myData();
        return () => {
            console.log("Unmount");
        }

    }, [checked, search, pageNumber]);

    function pagination() {

        for (let i = 1; i <= perPage; i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li key={number}
                    onClick={() => setPageNumber(number)}
                    className={Classnames("waves-effect", {
                        "active": pageNumber === number
                    })}>
                    <a href={"#page" + number} id={number}>
                        {number}
                    </a>
                </li>
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
                            onChange={(event) => {
                                setPageNumber(1);
                                setSearch(event.target.value);
                            }}
                            type="text" />
                        <label htmlFor="textarea1">Search</label>
                    </div>
                </div>
                <div className="col s4"></div>
                <div className="col s12">
                    <form className="center" action="">
                        <p>
                            <label>
                                <input onChange={(e) => setChecked(!checked)} type="checkbox" id="check" className="filled-in" checked={checked} />
                                <span htmlFor="check">Finns i lager</span>
                            </label>
                        </p>
                    </form>
                </div>
            </div>
            <Body beer={data} />
            <div className="col s12">
                <ul className="pagination center">
               
                    {
                        pagination()
                    }
                
                </ul>
            </div>
        </div>
    );
}


export default Home;