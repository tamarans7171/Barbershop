import React, { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { update } from "../../../redux/MyRedux/userSlicer";
import { useDispatch } from 'react-redux';
function SignUp() {

  // const [user, setuser] = useState({ name: "", lastName: "", password: "", phone: "", email: "" });
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [displayMes, setdisplayMes] = useState({ name: "none", lastName: "none", password: "none", phone: "none", email: "none" })


  let nameRef = useRef();
  let lastnameRef = useRef();
  let phoneRef = useRef();
  let passwordRef = useRef();
  let emailRef = useRef();
  let empPasRef = useRef();

  function trySignUp() {
    let d = empPasRef.current.value;
    if (nameRef.current.value == '' || lastnameRef.current.value == '' || phoneRef.current.value == '' || passwordRef.current.value == '' || emailRef.current.value == '')
      alert("עליך למלא את כל הפרטים..");
    else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value))
        setdisplayMes({ ...displayMes, email: "inherit" })
      else if (!/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/.test(phoneRef.current.value))
        setdisplayMes({ ...displayMes, phone: "inherit" })
      else {
        let user = {
          firstName: nameRef.current.value,
          lastName: lastnameRef.current.value,
          phone: phoneRef.current.value,
          password: passwordRef.current.value,
          email: emailRef.current.value,
          isAnEmployee: d == 999 ? true : false

        }
        console.log(user);

        axios.get(`http://localhost:3030/user/isExist/${user.email}`).then(res => {
          if (res.data)
            console.log("כתובת מייל זו כבר קיימת במאגר, אנא הכנס כתובת מייל שונה מזו");
          else {
            // מוסיף משתמש חדש למערכת
            axios.post(`http://localhost:3030/user/NewUser`, user).then((res) => {
              if (res.data) {
                alert("נרשמת בהצלחה!")
                // מקבל את הפרטים על מנת לעדכן נתונים ברדוסר
                axios.get(`http://localhost:3030/user/login/` + user.email + `/` + user.password).then(async (response) => {
                  // בודק אם נרשם בתור עובד - ויוצר עובד חדש 
                  if (d == 999) {
                    console.log("hhhhhhhhhhhhhhhhh");
                    const hairDresser = {
                      user: response.data._id,
                      expertise: [],
                      time: []

                    }
                    axios.post('http://localhost:3030/hairDresser/addHairDresser', hairDresser).then((resEmp) => {
                    console.log({ name: response.data.firstName, id: resEmp.data.hairDresser._id, isEmployee: true }); 
                    dispatch(update({ name: response.data.firstName, id: resEmp.data.hairDresser._id, isEmployee: true }));

                    })
                    // מנווט לדף הבית של העובד
                    navigate('/home/emp');

                  }
                  else {
                    dispatch(update({ name: response.data.firstName, id: response.data._id }));
                  }
                })
                // מנווט לדף הבית
                navigate('/home');

              }
              else {
                alert("לא עובד")
              }
            })
          }
        })

      }
    }
  }
  return (
    <div className="login-box">

      <form>
        <div className="user-box">
          <input required={true} ref={nameRef} name='name' id='firstname' type='text' placeholder='שם פרטי ' />
          <label htmlFor='firstname'>שם פרטי</label>
        </div>
        <div className="user-box">
          <input required={true} ref={lastnameRef} name='lastName' id='lastName' type='text' placeholder='שם משפחה ' />
          <label htmlFor='lastname'>שם משפחה</label>
        </div>
        <div className="user-box">
          <input required={true} ref={passwordRef} name='password' id='password' type='password' placeholder='צור סיסמא' />
          <label htmlFor='password'>סיסמא</label>
        </div>
        <div className="user-box">
          <input required={true} ref={phoneRef} onChange={(e) => setdisplayMes({ ...displayMes, phone: "none" })} name='phone' id='tel' type={"tel"} placeholder='טלפון' />
          <label htmlFor='tel'>טלפון</label>
          <p style={{ "color": "red", "display": displayMes.phone }}>מספר הטלפון אינו תקין!</p>

        </div>
        <div className="user-box">
          <input required={true} ref={emailRef} name='email' onChange={(e) => setdisplayMes({ ...displayMes, email: "none" })} id='email' type='email' placeholder='הכנס איימיל' />
          <label htmlFor='email'>מייל</label>

          <p style={{ "color": "red", "display": displayMes.email }}>כתובת המייל אינה תקינה!</p>
        </div>


        <div className="user-box">
          <input required={false} ref={empPasRef} name='empPas' id='empPas' type='number' placeholder='קוד עובד' />
          <label htmlFor='empPas'>קוד עובד</label>
        </div>
        {<a type='Submit' onClick={trySignUp} >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          OK
        </a>}

      </form>
    </div>

  )
}
export default SignUp