import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import Table from 'react-bootstrap/Table';

import { format } from 'date-fns'
export default function Schedual() {
  let id = useSelector((state) => state.user.id)
  const [render, setRender] = useState(false)
  const [appointments, setAppointments] = useState([])

  async function getAppointments(params) {
    console.log(id);
    if (id) {
      await axios.get(`http://localhost:3030/appointment/getAppointmentsByIdOfHairDresser/${id}`).then((res) => {
        if (res) {
          let now = new Date();
          let in7days = new Date();
          in7days.setDate(now.getDate() + 7)

          console.log(in7days + "   " + now);
          //  console.log(res.data);
          let newAppointments = res.data
            .appointments
            .filter((a) => {
              console.log(a.date); return ((new Date(a.date)) > now)
                && (in7days > (new Date(a.date)))
            }
            );
          console.log(newAppointments);
          newAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
          setAppointments(newAppointments);
        }
      })
    }

  }
  useEffect(() => {
    getAppointments()


  }, [render, id])
  return (

    <div>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>תאריך</th>
            <th>שעה</th>
            <th>סוג התור</th>
            <th>שם הלקוח</th>
            <th>טלפון</th>
            <th>כתובת מייל</th>
          </tr>
        </thead>
        <tbody>
          {appointments && appointments.length > 0 && appointments.map((o, i) => {
            return <tr key={i}>
              <td>{format(new Date(o.date), 'dd/MM/yyyy')}</td>
              <td>{format(new Date(o.date), 'HH:mm')}</td>
              <td>{o.option.name}</td>
              <td>{o.user.lastName + " " + o.user.firstName}</td>
              <td>{o.user.phone}</td>
              <td>{o.user.email}</td>
            </tr>
          })}

        </tbody>
      </Table>








    </div>
  )

}
