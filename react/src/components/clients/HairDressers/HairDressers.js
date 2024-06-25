import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import './HairDressers.css'
const HairDressers = () => {
  const navigate = useNavigate();
  const [hairDressers, setHairDressers] = useState([])
  async function getHairDressers() {
    await axios.get("http://localhost:3030/hairDresser/getAllHairDressers").then((resp) => {
      console.log(resp.data)
      setHairDressers(resp.data)
    })
  }

  useEffect(() => {
    getHairDressers()
  }, [])
  return (
    <div>

      <h1>הספרים שלנו</h1>
      <div className="containerH">
        {hairDressers && hairDressers.length > 0 && hairDressers.map((object, i) => (
          <div key={i} className="cardH">
            <div className="boxH">
              <div className="contentH">
                <h2>{i + 1}</h2>
                <h3>{object.user.lastName}  {object.user.firstName}</h3>
                <p>{object.expertise.map((e, i) => {
                  if (i > 0)
                    return (", " + e)
                  else { return e }
                })}</p>
                <Link className="ll" to={object._id}>לקביעת תור לספר</Link>
              </div>
            </div>
          </div>))}

      </div>

    </div>
  )
}
export default HairDressers