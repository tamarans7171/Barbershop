import React,{useState} from 'react'
import './buttonsLog.css';
import SignIn from './signIn'
import SignUp from './signUp'
import LogEmployee from '../../employees/Enter/enter'
import logo from '../../Images/4998317.jpg'


function ButtonsLog() {
    const [view, setView] = useState({signIn:false,signUp:false,emp:false})
  return (
        <div className='frame'>
        <div className="row d-flex justify-content-center">
        <img className="logoLog col-md-3" src={logo}></img>
      </div>

     <button className="custom-btn btnLog btn-5" onClick={()=>setView({...view,signUp:false,signIn:true,emp:false})}>התחברות</button>
     <button className="custom-btn btnLog btn-5" onClick={()=>setView({...view,signUp:true,signIn:false,emp:false})}>הרשמה</button>
     <button className="custom-btn btnLog btn-5" onClick={()=>setView({...view,signUp:false,signIn:false,emp:true})}>כניסת עובד</button><br/>
     {view.signIn?<SignIn/>:view.signUp?<SignUp/>:view.emp?<LogEmployee/>:" "}
</div>
  )
}

export default ButtonsLog