import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import DatePicker from "react-datepicker";
import axios from "axios";
import { parseISO } from 'date-fns'
import { useSelector } from "react-redux";

function AddAppointmentByHairDresser(params) {
  const idUser = useSelector((state) => state.user.id)

    let id=useParams().id;
    const [options, setOptions] = useState([])
    const [hairDresser, setHairDresser] = useState()
    const [HairDresserTimes, setHairDresserTimes] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    const [viewTimes, setViewTimes] = useState(['בחר אופציה'])
    const [occupiedviewTimes, setoccupiedViewTimes] = useState([])
    const [Newappointment, setNewappointment] = useState({
        user: idUser,
        date: startDate,
        option: '',
        hairDresser: id
    });
    
    useEffect(() => {
      getOptions()
      
      setViewTimes(["select date..."])
  }, [])


  useEffect(() => {
      if (hairDresser) {
          setTimesOfTheSelectedHairDresser()
          getAppointmentsOfThisDate()
      }

  }, [Newappointment.date])

  function getAppointmentsOfThisDate() {
      if (Newappointment.date) {
          const dateString = Newappointment.date.getFullYear() + "-" + (Newappointment.date.getMonth() + 1) + "-" + Newappointment.date.getDate();
          console.log(Newappointment);
          axios.get("http://localhost:3030/appointment/getAppointmentByDate/" + dateString + "/" + id).then((res) => {
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

  // קריאת שרת לקבלת ספר והאופציות שלו
  function getOptions() {
      axios.get(`http://localhost:3030/hairDresser/getHairDresserById/${id}`).then((res) => {
      console.log(res.data);   
      setHairDresser(res.data.hairDresser)
      setOptions(res.data.hairDresser.expertise)
      setHairDresserTimes(res.data.hairDresser.time)

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
          axios.get('http://localhost:3030/option/getOptionByName/'+Newappointment.option, Newappointment)
          .then((res)=>{
            Newappointment.option=res.data.option._id;
            axios.post('http://localhost:3030/appointment/addAppointment', Newappointment)
              .then(alert("התור נקבע בהצלחה"));
            });
          
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
          // else setViewTimes("choose other day in week")
      }
  }

  function filterDate(date) {
      const days = HairDresserTimes.map(h => h.day);
      //   console.log(days);
      const day = date.getDay();
      return day !== 6 && days.includes(day + 1)
  }
  // מקב//////////////////////////////////////////////////////////
  // function getAppointments() {

  //     axios.get('http://localhost:3030/appointment/getTimesByIdOfHairDresser/' + id).then((res) => {
  //         const times = res.data.times.map(t => parseISO(t.date))
  //         console.log(times);
  //         // setHairDressersAppointments(times)
  //     });
  // }
  function setTime(e) {
      console.log(e.target.value);
      let date = new Date(Newappointment.date), time = e.target.value;
      date.setHours(Number(time.substring(0, 2)))
      date.setMinutes(Number(time.substring(3)))
      setNewappointment({ ...Newappointment, date: date })

  }

    return (
    <div>
      {hairDresser&&<h3>קביעת תור לספר {hairDresser.user.lastName+" "+hairDresser.user.firstName}</h3>
}
<select className="form-select form-select-lg mb-3" defaultValue={""} onChange={(e) => { setNewappointment({ ...Newappointment, option: e.target.value }); }}>
                <option value="" disabled hidden>בחר את סוג הטיפול</option>

                {options && options.map((o, i) => (
                    <option value={o} key={i}>{o}</option>))}
            </select>
       {

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
{viewTimes &&viewTimes.length>0&& viewTimes.map((o, i) => {
    if (occupiedviewTimes.includes(o)) return <option disabled key={i}> {o} התור תפוס </option>
    else return <option key={i}>{o}</option>
})}
</select>
<br></br><br></br>
<button className="button" onClick={saveappointment}> לקביעת תור</button>

    </div>
  )
}

export default AddAppointmentByHairDresser






