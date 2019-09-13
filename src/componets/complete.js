import React from 'react';
import Styles from "../style/complete.module.css"

function Complete (props) {


  return (
      <div className={`row ${Styles['background']}`}>
            <div className="col s2"></div>
            <div>
            <div className="col s8">
                <div className="col s12">
                    <h1 className="center white-text ">Tack för din beställning!</h1>
                    <h6 className="center white-text">Vi på Ölbolaget är glada att du valde att beställa hos oss.</h6>
                    <h6 className={`center white-text ${Styles['info']}`}> 
                        <span onClick={()=>{props.history.push("/")}} className={Styles.click}> Klicka här </span> för att komma till startsidan</h6>
                </div>
            </div>
            </div>
            <div className="col s2"></div>

        </div>
  );
}


export default Complete;