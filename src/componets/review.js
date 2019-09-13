import React, { useState, useEffect } from 'react';
import axios from "axios";

function Rewiev(props) {
    const [loading, setLoading] = useState(true);
    const[ data, setData] = useState([])

    useEffect(() => {
        let fetchData = async () => {
            console.log(props.id)
            let result = await axios(
                'http://localhost:8080/api/collections/get/rewiev?token=dd9a8d75bef9abea2c7a79bc3be82c'
            );
            setData(result.data.entries[0]);
            console.log(result)
            setLoading(false);
        };
        fetchData();
        return () => {
            console.log("Unmount");
            setLoading(true);
        }
    }, []);

    return (

        <div className="col s12">
            <h6>Kommentarer</h6>
            <div className="card darken-1">
                <div className="card-content   ">
                    <span className="card-title">Card Title</span>
                    <p>I am a very simple card.
                       I am good at containing small bits of information.
                       I am convenient because I require little markup to
                       use effectively.
                     </p>

                </div>
                <div className="card-content   ">
                    <span className="card-title">Card Title</span>
                    <p>I am a very simple card.
                       I am good at containing small bits of information.
                       I am convenient because I require little markup to
                       use effectively.
                     </p>

                </div>
            </div>
        </div>


    );
}


export default Rewiev;