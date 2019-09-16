import React, { useState, useEffect } from 'react';
import axios from "axios";

function Rewiev(props) {
    const [loading, setLoading] = useState(true);
    const[ data, setData] = useState([])
    const [rating, setRating] = useState([])

    useEffect(() => {
        let fetchData = async () => {
            console.log(props.id)
            let result = await axios(
                'http://localhost:8080/api/collections/get/rewiev?token=dd9a8d75bef9abea2c7a79bc3be82c'
            );
            setData(result.data.entries);
            console.log(result)
            
        };
        fetchData();
        return () => {
            console.log("Unmount");
            setLoading(true);
        }
    }, [props.id]);

    useEffect(()=>{
        let newData = []
        data.map(rating =>{
            return rating.link.filter(id =>{
               if(id._id === props.id){
                   newData.push(rating);
               }
            })
        })
        setRating(newData)
        if(!rating.length) return;
        setLoading(false);
      
    },[data])

    return (

        <div className="col s12">
            <h6>Kommentarer</h6>
            <div className="card darken-1">
                <div className="card-content   ">
                {loading ? <h6>Inga Kommentarer...</h6>
                    : rating.map(rate => {
                        return (
                            <div key={rate._id}>
                            <span className="card-title">{rate.title}</span>
                            <p>{rate.body}</p>
                            <p>Rate:{rate.rating}</p>
                            </div>
                        )
                    })
                }
                </div>
                
            </div>
        </div>


    );
}


export default Rewiev;