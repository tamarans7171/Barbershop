import React,{useState} from 'react'
import './Login.css'
import { update } from "../../../redux/MyRedux/userSlicer";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {useNavigate } from "react-router-dom";

//התחברות
function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [mes, setMes] = useState('')
    const dispatch = useDispatch();
    var current = null;
// בודק נכונות סיסמא ומייל ומעביר לדף הנכון
    async function checkLogin() {
      if(email&&pass){
        await axios.get(`http://localhost:3030/user/login/` + email + `/` + pass).then((res) => {
          if (res.data.email == undefined)
            setMes("the email or the password are not correct");
          else if (res.data.password == pass) {
            dispatch(update({ name: res.data.firstName, id: res.data._id, isEmployee: false }));
            navigate('/home');
    
          }
    
        })}
        else alert("עליך למלא את כל התיבות")
      }
    

  return (
 
        <div className="login-box">
  <h2>Login</h2>
  <form>
    <div className="user-box">
      <input type="text" onChange={(e) => {setEmail(e.target.value);setMes('')}} id="email"/>
      <label htmlFor="email">Username</label>
    </div>
    <div className="user-box">
      <input id='password' type='password' placeholder='סיסמא' onChange={(e) => { setPass(e.target.value);setMes('') }}/>
      <label htmlFor='password'>Password</label>
    </div>
    <p style={{color:'red'}}>{mes}</p>
    <a  onClick={() => { checkLogin(); }}>
      
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
  </form>
</div>
)
        
  
}

export default SignIn