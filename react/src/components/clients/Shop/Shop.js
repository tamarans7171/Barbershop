import React from "react";

import './Shop.css'
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
const Shop = () => {
    const [products, setProduct] = useState([]);
    useEffect(() => {
      axios.get(`http://localhost:3030/product/getAllProducts`).then((res) => {
        console.log(res.data)
        setProduct(res.data.pro)
      });
  
    }, [])
    return (
        <>
            <div className="container mar">

                <div className="row">
                    {products&&products.length>0&&products.map((p,i)=>{
                        return <div className="box col-4" key={i}>
                     
                        <img alt={p.srcImage} className='images' src={String('/Images/'+p.srcImage)} />
                        <h5>{p.name}</h5>
                        <hr></hr>
                        <h4>{"₪"} {p.price}</h4>
                        {/* <nav>
                            <Nav.Link ><Link to='Spreyhair'> ראה מוצר</Link></Nav.Link>
                        </nav> */}
                          </div>
                    })}
                    

                </div>
            </div>
        </>
    )
}


export default Shop













