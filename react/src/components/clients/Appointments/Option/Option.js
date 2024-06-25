import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useLocation, useNavigate } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { parseISO } from 'date-fns'
import './Option.css'
// דף אופציה 
export default function Option() {
    const navigate = useNavigate()
    let location = useLocation()
    const id = useSelector((state) => state.user.id)
    const [hairDressers, setHairdressers] = useState();
    const [HairDresserTimes, setHairDresserTimes] = useState([])
    const [hairDressersAppointments, setHairDressersAppointments] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    const [viewTimes, setViewTimes] = useState([])
    const [occupiedviewTimes, setoccupiedViewTimes] = useState([])
    const [Newappointment, setNewappointment] = useState({
        user: id,
        date: startDate,
        option: location.state._id,
        hairDresser: ''
    });
    // כשהקומפ מתרנדרת/עולה
    useEffect(() => {
        getHairDressers()
    }, [])

    useEffect(() => {
        if (hairDressers) {
            const index = hairDressers.findIndex(h => h._id == Newappointment.hairDresser)
            const hairDresser = hairDressers[index];
            // מעדכן את הזמנים של הספר 
            setHairDresserTimes(hairDresser.time)
            getAppointments()
        }
        setViewTimes(["select date..."])
        setNewappointment({ ...Newappointment, date: '', })
    }, [Newappointment.hairDresser])

    useEffect(() => {
        if (hairDressers) {
            setTimesOfTheSelectedHairDresser()
            getAppointmentsOfThisDate()
        }

    }, [Newappointment.date])

    function getAppointmentsOfThisDate() {
        if (Newappointment.date) {
            const dateString = Newappointment.date.getFullYear() + "-" + (Newappointment.date.getMonth() + 1) + "-" + Newappointment.date.getDate();
            console.log(Newappointment);
            axios.get("http://localhost:3030/appointment/getAppointmentByDate/" + dateString + "/" + Newappointment.hairDresser).then((res) => {
                console.log(res.data);
                const arrT = res.data.map(x => {
                    let d = new Date(x.date)
                    let hours = d.getHours().toString()
                    let minutes = d.getMinutes().toString()
                    if (hours.length < 2)
                        hours = "0" + hours;
                    if (minutes.length < 2)
                        minutes = "0" + minutes;

                    return hours + ":" + minutes
                })
                setoccupiedViewTimes(arrT);
                console.log(arrT);
            }
            )
            console.log("occupiedviewTimes" + occupiedviewTimes);
        }
    }

    // קריאת שרת לקבלת הספרים
    function getHairDressers() {
        console.log(location.state.name);
        axios.get(`http://localhost:3030/hairDresser/getHairDressersByOptionName/${location.state.name}`).then((res) => {
            setHairdressers(res.data.hairDressers)
        });
    }

    function saveappointment() {
        // Newappointment.date.setHours(Newappointment.date.getHours()+2)
        if (Newappointment.date == null) {
            alert("עליך לבחור תאריך לקביעת התור")
        }
        else if (Newappointment.date.getHours() == 0) {
            alert("עליך לבחור שעה לקביעת התור")
        }
        else {
            console.log(Newappointment)
            axios.post('http://localhost:3030/appointment/addAppointment', Newappointment)
                .then(alert("התור נקבע בהצלחה"));
        }

    }

    function setTimesOfTheSelectedHairDresser() {
        if (Newappointment.date) {
            const selectedDay = Newappointment.date.getDay() + 1
            console.log(HairDresserTimes);
            const times = HairDresserTimes.filter(h => h.day == selectedDay)[0]
            if (times) {
                console.log("times" + times.startTime);
                const arr = [];
                for (let i = times.startTime; i < times.endTime; i++) {
                    for (let j = 0; j < 2; j++) {
                        arr.push(`${i}:${j === 0 ? `00` : 30 * j}`);
                    }
                } setViewTimes(arr)
            }
            else setViewTimes("choose other day in week")
        }
    }

    function filterDate(date) {
        const days = HairDresserTimes.map(h => h.day);
        //   console.log(days);
        const day = date.getDay();
        return day !== 6 && days.includes(day + 1)
    }
    // מקב//////////////////////////////////////////////////////////
    function getAppointments() {

        axios.get('http://localhost:3030/appointment/getTimesByIdOfHairDresser/' + Newappointment.hairDresser).then((res) => {
            const times = res.data.times.map(t => parseISO(t.date))
            // console.log(times); 
            console.log(times);
            setHairDressersAppointments(times)
        });
    }
    function setTime(e) {
        console.log(e.target.value);
        let date = new Date(Newappointment.date), time = e.target.value;
        date.setHours(Number(time.substring(0, 2)))
        date.setMinutes(Number(time.substring(3)))
        setNewappointment({ ...Newappointment, date: date })

    }
    return (

        <div>
            <img className="return" onClick={() => navigate("/home")} src="/Images/return.png" />
            <p>{location.state.name} </p>
            <p>{location.state.description}</p>
            <select className="form-select form-select-lg mb-3" defaultValue={""} onChange={(e) => { setNewappointment({ ...Newappointment, hairDresser: e.target.value }); }}>
                <option value="" disabled hidden>Choose the Hair dresser</option>

                {hairDressers && hairDressers.map((s, i) => (
                    <option value={s._id} key={i}>{s.user.lastName} {s.user.firstName}</option>))}
            </select>

            {Newappointment.hairDresser &&

                <DatePicker
                    shouldCloseOnSelect={false}

                    className={"datePickerC"}
                    onChange={(newDate) => { setNewappointment({ ...Newappointment, date: newDate }); }}

                    timeFormat="HH:mm"
                    timeIntervals={30}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy"

                    startDate={Newappointment.date}
                    filterDate={filterDate}
                    minDate={new Date().setDate(new Date().getDate()+1)}
                    maxDate={endDate}
                    selected={Newappointment.date ? Newappointment.date : new Date()}


                />}
            <select className="form-select form-select-lg mb-3" onChange={setTime}>
                {viewTimes && viewTimes.map((o, i) => {
                    if (occupiedviewTimes.includes(o)) return <option disabled key={i}> {o} התור תפוס </option>
                    else return <option key={i}>{o}</option>
                })}
            </select>
            <br></br><br></br>
            <button className="button" onClick={saveappointment}> לקביעת תור</button>

        </div>
    )
}
