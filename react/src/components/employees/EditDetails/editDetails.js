import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './editDetails.css'
function EditDetails() {
    const navigate = useNavigate()
    let id = useSelector((state) => state.user.id)
    const [expertises, setExpertises] = useState([])
    const [options, setOptions] = useState([])
    const [days, setDays] = useState([false, false, false, false, false, false])
    const [hairDresser, setHairDresser] = useState([])
    const [nameDays, setNameDays] = useState(["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"])

    function updateList(name, status) {
        console.log(name, status);
        if (status) {
            setExpertises([...expertises, name])
        }
        else {
            setExpertises(expertises.filter(o => o != name))
        }
    }

    function updateDays(day, status) {
        console.log(day, status, "kkkkkkkkkkkkkkk");
        let temp = days
        temp[day - 1] = status;
        setDays([...temp])
        console.log(temp);
    }
    async function getOptions() {

        let options = await axios.get("http://localhost:3030/option/getAllOptions").then((res) => {
            let optionsNames = res.data.map(x => x.name)
            console.log(optionsNames);
            axios.get("http://localhost:3030/hairDresser/getHairDresserById/" + id).then((res2) => {
                setHairDresser(res2.data.hairDresser)
                let temp = [...days]
                res2.data.hairDresser.time.forEach(element => {
                    temp[element.day - 1] = true;
                });
                setDays(temp)
                console.log(temp);

                let hairDresserOptions = res2.data.hairDresser.expertise;
                console.log(res2.data);
                console.log(hairDresserOptions);
                let op = optionsNames.filter(o => !hairDresserOptions.includes(o))
                console.log(op);
                setOptions(op)
            })
        })
    }
    useEffect(() => {
        getOptions()
    }, [])

    function updateExpertise() {

    }


    async function updateDetails() {
        console.log(expertises);
        let body = { expertises: expertises }
        await axios.put("http://localhost:3030/hairDresser/updateHairDresserExpertise/" + id, body).then((data) => {
            console.log(data);
        })
        let tempTimes = days.map((b, i) => {
            if (b) {
                if (i == 5) {
                    return { day: 6, startTime: 9, endTime: 13 }
                }
                else {
                    return { day: i + 1, startTime: 10, endTime: 20 }
                }
            }

        }).filter(x => x != undefined)
        let newHairDrsser = { ...hairDresser, time: tempTimes }
        console.log(newHairDrsser);
        await axios.put("http://localhost:3030/hairDresser/updateHairDresserById/" + id, newHairDrsser).then((res) => {
            console.log(res);
            navigate(-1)

        })
    }
    return (
        <div style={{ margin: "2%" }}>
            <fieldset>
                <legend>אנא בחר את ההתמחויות בהם הנך רוצה להוסיף לרשימת ההתמחויות שלך</legend>
                {options ? <div> {options.map((o, i) => {
                    return <div key={i}><input type={"checkbox"} value={o} id={o} name={o} onChange={(e) => { updateList(e.target.value, e.target.checked) }} /><label htmlFor={o}>{o}</label> </div>
                })}
                </div>
                    : <></>}
            </fieldset>
            <hr />
            <fieldset>
                <legend>אנא בחר את הימים בהם הנך מעונין לעבוד</legend>
                <div> {days && days.map((d, i) => {
                    return <div key={i}><input checked={d} type={"checkbox"} value={i + 1} id={i + 1} name={i + 1} onChange={(e) => { console.log("ff"); updateDays(e.target.value, e.target.checked) }} /><label htmlFor={i + 1}>{nameDays[i]}</label> </div>
                })}
                </div>
            </fieldset>
            <button className='boton' onClick={updateDetails}>עדכון פרטים</button>
        </div>
    )
}

export default EditDetails