import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { update } from "../../../redux/MyRedux/userSlicer";

export default function Password() {
  const [employee, setEmployee] = useState({ email: "", password: "" });
  const [mes, setMes] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // בודק נכונות סיסמא ומייל
  async function checkpassword(e) {
    await axios
      .get(
        `http://localhost:3030/user/loginEmployee/` +
          employee.email +
          `/` +
          employee.password
      )
      .then(async (res) => {
        if (res.data.email === undefined)
          setMes("the email or the password are not correct");
        else if (res.data.password === employee.password) {
          if (res.data.isAnEmployee) {
            console.log(res.data);
            await axios
              .get(
                "http://localhost:3030/hairDresser/getHairDresserByUserId/" +
                  res.data._id
              )
              .then((res2) => {
                console.log(res2.data);

                dispatch(
                  update({
                    name: res.data.firstName,
                    id: res2.data.hairDresser._id,
                    isEmployee: true,
                  })
                );
              });

            navigate("/home/emp");
          } else {
            setMes("אין לך הרשאת עובד!");
          }
        } else {
          setMes("the password is not correct");
        }
        console.log("email:" + res.data.email);
        console.log("pass:" + res.data.password);
      });
  }
  return (
    <div className="login-box">
      <h2>כניסת עובד</h2>
      <form>
        <div className="user-box">
          <input
            onChange={(e) => {
              setEmployee({ ...employee, email: e.target.value });
              setMes("");
            }}
            id="email"
            type="text"
            placeholder="כתובת מייל"
          />
          <label htmlFor="email">מייל</label>
        </div>
        <div className="user-box">
          <input
            onChange={(e) => {
              setEmployee({ ...employee, password: e.target.value });
              setMes("");
            }}
            id="password"
            type="password"
            placeholder="סיסמא"
          />
          <label htmlFor="password">סיסמא</label>
        </div>
        <p style={{ color: "red" }}>{mes}</p>

        <a onClick={checkpassword}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
      </form>
    </div>
  );
}
