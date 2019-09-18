import React, { useState, useEffect } from 'react';
import axios from "axios";

function Comment(props) {
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [rank, setRank] = useState("");
    const [comment, setComment] = useState("");


    useEffect(() => {

    }, [props.id]);

    function addComment(e) {
        e.preventDefault();
        if (title.length === 0 || comment.length === 0 || rank === null) return;
        axios.post("http://localhost:8080/api/collections/save/rewiev?token=dd9a8d75bef9abea2c7a79bc3be82c",
            {
                data: {
                    "title": title,
                    "body": comment,
                    "rating": rank,
                    "id":props.id,
                    "link": [{
                        link: "products",
                        display: props.beer,
                        _id: props.id,
                    }]
                }
            })
            .then(res => {
                setTitle("");
                setRank("");
                setComment("");
            }).catch(err => {
                console.log(err);
            })
    }

    return (

        <div className="row">
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s4 ">
                        <input
                            value={title}
                            onChange={(e => setTitle(e.target.value))}
                            id="icon_prefix"
                            type="text"
                            className="validate" />
                        <label htmlFor="icon_prefix">Title</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4 ">
                        <input
                            value={rank}
                            onChange={(e => setRank(e.target.value))}
                            id="icon_prefix"
                            min ="0"
                            max = "5"
                            type="number"
                            className="validate" />
                        <label htmlFor="icon_prefix">Rank</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s4">
                        <textarea value={comment} onChange={(e => setComment(e.target.value))} id="textarea1" className="materialize-textarea"></textarea>
                        <label htmlFor="textarea1">Kommentar</label>
                    </div>
                </div>
                <a onClick={addComment} className="waves-effect waves-light btn right">Kommentera</a>
            </form>
        </div>


    );
}


export default Comment;