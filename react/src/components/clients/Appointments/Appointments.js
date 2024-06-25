import React, { useEffect, useState } from 'react'
import './Appointments.css'
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import axios from 'axios'
import './Appointments.css'
// דף האופציות
export default function Buttons(props) {

  const [options, setOptions] = useState([]);
// קבלת האופציות מהשרת
  useEffect(() => {
    const controller=new AbortController()
    const signal=controller.signal
  // if(!isEmployee)
   async function getOptions() {
    try{await axios.get(`http://localhost:3030/option/getAllOptions`,{signal:signal}).then((res) => {
      setOptions(res.data)
    });}catch(e){
console.log(e);
    }
     
  }
    getOptions()
return()=>{
  controller.abort()
}
  }, [])
 

  return (
    <>

      <div className="container">
        <h1>בחר תספורת</h1>
        <div className="row d-flex justify-content-around">
          <div className="col-8">
            <div className="container">


              <div className="row">
                {options && options.length > 0 ? options.map((option, i) => (
                  <div key={i} className="boxO col-lg-4 col-sm-6 detailDiv">
                   <img className='imgOption' src={option.srcImage} alt={option.name} />
                    <br />
                    <p>{option.description}</p>
                    <hr></hr>
                    <p>{option.price} ₪ </p>
                    <button className='boton'>
                      <Link to='Option' state={option}> {option.name}</Link>


                    </button>
                  </div>

                )) : <></>}




              </div>

            </div>
          </div>
        </div>
      </div>
    </>

  )

}
















