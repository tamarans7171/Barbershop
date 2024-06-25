import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Myqueues.css"
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup';
import DatePicker from "react-datepicker";
import { parseISO } from 'date-fns'

const Myqueues = () => {
    const [mainText, setMainText] = useState("התורים שלי")
    const id = useSelector((state) => state.user.id)
    const navigate = useNavigate()
    const [endDate, setEndDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    const [startDate, setStartDate] = useState(new Date());
    const [hairDressersAppointments, setHairDressersAppointments] = useState([])

    const [HairDresserTimes, setHairDresserTimes] = useState([])
    const [viewTimes, setViewTimes] = useState([])
    const [occupiedviewTimes, setoccupiedViewTimes] = useState([])
    const [appointment, setappointment] = useState([]);
    const [render, setRender] = useState(false)
    const [Newappointment, setNewappointment] = useState({
        user: id,
        date: startDate,
        option: '',
        hairDresser: ''
    });
    useEffect(() => {
        console.log("-------------------------------------------------------------------");
        axios.get(`http://localhost:3030/appointment/getAppointmentByUserId/${id}`).then((res) => {
            console.log(res.data);
            if (res.data.length == 0) {
                console.log("jjjjjjjjjjjjjj");
                setMainText("עדין לא קבעת תור כלשהו")
            }
            else {
                const now = new Date();
                let result = res.data.filter(a => {
                    let date = new Date(a.date)
                    if (date < now)
                        return false;
                    else return true;
                })
                axios.get("http://localhost:3030/hairDresser/getAllHairDressers").then((res2) => {
                    console.log(res2.data);

                    console.log(res2.data.length);
                    result = result.map(((a) => {
                        let h = res2.data.filter(h => h._id == a.hairDresser._id)
                        if (h) {
                            h = h[0]

                            return { ...a, hairDresserName: h.user.firstName + " " + h.user.lastName }

                        }
                    }))

                    setappointment(result)

                })

            }
        });

    }, [render])

    async function deleteQ(q) {
        //  alert(q._id)
        const date = (new Date(q.date)), today = new Date();
        // DELETE request using fetch with async/await
        console.log(date.getDate())
        // console.log(.getDate())
        if ((date.getFullYear() > today.getFullYear()) ||
            (date.getMonth() > today.getMonth() && date.getFullYear() == today.getFullYear()) ||
            (date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear() && date.getDate() > today.getDate())) {
            await axios.delete('http://localhost:3030/appointment/deleteAppointment/' + q._id).then(console.log("התור נמחק בהצלחה"));
            setRender(!render)
        }
        else alert("אתה יכול לבטל את התור רק עד יום לפני התאריך שנקבע")
    }

    function filterDate(date) {
        const days = HairDresserTimes.map(h => h.day);
        //   console.log(days);
        const day = date.getDay();
        return day !== 6 && days.includes(day + 1)
    }

    function saveappointment(id) {
        if (Newappointment.date == null) {
            alert("עליך לבחור תאריך לקביעת התור")
        }
        else if (Newappointment.date.getHours() == 0) {
            alert("עליך לבחור שעה לקביעת התור")
        }
        else {
            console.log(Newappointment)
            axios.put('http://localhost:3030/appointment/updateAppointment/' + id, Newappointment)
                .then(() => {
                    alert("התור התעדכן בהצלחה");
                    setRender(!render)
                });
        }

    }

    useEffect(() => {
        if (Newappointment.hairDresser) {
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

    /////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////
    function inChanging(object) {
        setNewappointment({ ...Newappointment, user: id, date: object.data, option: object.option._id, hairDresser: object.hairDresser._id })
        axios.get("http://localhost:3030/hairDresser/getHairDresserById/" + object.hairDresser._id).then((res) => {
            setHairDresserTimes(res.data.hairDresser.time)
            getAppointments()
        })
        setViewTimes(["select date..."])
    }
    function getAppointments() {
        console.log(Newappointment);
        if (Newappointment.hairDresser) {
            axios.get('http://localhost:3030/appointment/getTimesByIdOfHairDresser/' + Newappointment.hairDresser).then((res) => {
                const times = res.data.times.map(t => parseISO(t.date))
                // console.log(times); 
                console.log(times);
                setHairDressersAppointments(times)
            });
        }

    }
    function setTime(e) {
        console.log(e.target.value);
        let date = new Date(Newappointment.date), time = e.target.value;
        date.setHours(Number(time.substring(0, 2)))
        date.setMinutes(Number(time.substring(3)))
        setNewappointment({ ...Newappointment, date: date })

    }

    const now = new Date();
    return (
        <div className="container-fluid">


            <h1>{mainText}</h1>


            {appointment.length > 0 ? appointment.map((object, i) => (
                <div className="row cancellation" key={i}>
                    <div className="col-3">
                        {(new Date(object.date) > (new Date(now).setDate(now.getDate() + 2))) ?
                            <div>
                                <button className="boton" onClick={
                                    () => { if ((new Date(object.date) > (new Date(now).setDate(now.getDate() + 2)))) { if (window.confirm("האם אתה בטוח שברצונך לבטל את התור ל " + object.option.name)) deleteQ(object) } else (alert("התור הנו ביומיים הקרובים, על כן אינל יכול לבטלו!")) }

                                }>בטל תור</button>


                                <Popup contentStyle={{ border: "5px solid", borderColor: "#ac7b07", borderWidth: "2px", backgroundColor: "#f5d5f5", width: "50%", height: "40%", backgroundPosition: "center", backgroundSize: "cover" }} onOpen={() => inChanging(object)} trigger={<button className="boton"
                                    style={{ display: (new Date(object.date) > (new Date(now).setDate(now.getDate() + 2))) ? 'inherit' : 'none' }} >שנה תור </button>} position="left center">
                                    <div>
                                        {HairDresserTimes && HairDresserTimes.length > 0 && <DatePicker
                                            shouldCloseOnSelect={false}

                                            className={"datePickerC"}
                                            onChange={(newDate) => { setNewappointment({ ...Newappointment, date: newDate }); }}

                                            timeFormat="HH:mm"
                                            timeIntervals={30}
                                            timeCaption="time"
                                            dateFormat="MMMM d, yyyy"

                                            startDate={Newappointment.date}
                                            filterDate={filterDate}
                                            minDate={new Date().setDate(new Date().getDate() + 1)}
                                            maxDate={endDate}
                                            selected={Newappointment.date ? Newappointment.date : object.data}


                                        />}
                                        <hr className="hrCss"></hr>
                                        <select onChange={(e) => { e.preventDefault(); setTime(e); }}>
                                            {viewTimes && viewTimes.map((o, i) => {
                                                if (occupiedviewTimes.includes(o)) return <option disabled key={i}> {o} התור תפוס </option>
                                                else return <option key={i}>{o}</option>
                                            })}
                                        </select>
                                        <hr className="hrCss"></hr>
                                        <button className="boton" onClick={() => saveappointment(object._id)}>שמור שינויים</button>
                                    </div>
                                </Popup>
                            </div> :
                            <div style={{ width: '130px', backgroundColor: 'mistyrose', borderColor: "rgba(255,222,23,.7)" }}><p>אינך יכול לשנות\לבטל את התור מפני שהנו ביומיים הקרובים!</p>                        </div>}
                    </div>
                    <div className="col-6 details">
                        <p>שם הספר:   {object.hairDresserName}   </p>
                        <p>תספורת:  {object.option.name}</p>
                        <p>תאריך:  {format(new Date(object.date), 'dd/MM/yyyy')}</p>
                        <p>שעה:  {format(new Date(object.date), 'HH:mm')}</p>

                    </div>
                    <div className="col-3">
                        <img className='images' src={object.option.srcImage} />
                    </div>
                </div>
            )) : <></>}

        </div>

    )
}

export default Myqueues

