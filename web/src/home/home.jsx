import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosClient from "../axios"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Autocomplete } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';


export default function Home() {

    const { admin_id } = useParams()
    const [current_admin , setCurrent_admin] = useState({}) // name,id,pwd,email
    const [value, setValue] = useState(''); // State to store the selected value
    const [employees , setEmployees] = useState([])
    const [date , setDate] = useState('')
    const [time , setTime] = useState('')
    const [description , setDescription] = useState('')
    const [titre , setTitre] = useState('')

    useEffect(()=>{
        axiosClient.get(`/admins/current_user_data/${admin_id}`, { withCredentials: true })
        .then(({data})=>{
            setCurrent_admin(data.admin)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
      axiosClient.get('/users/get_users')
      .then(({data})=>{
        setEmployees(data.users)
      })
      .catch((err)=>{
        console.log(err);
    })
    },[])

    const handleSumit = (e)=>{
      e.preventDefault()
      axiosClient.post(`/users/store_taches/${value._id}`, {titre, description, time, date})
      .then(()=>{
        setValue()
        setDate('')
        setTime('')
        setTitre('')
        setDescription('')
      }
      )
    }
    
  return (
    <div className=" p-5">

    <div>
      <h1>hello this is home , you are logged in with id <strong>{current_admin._id}</strong>  !</h1>
    </div>  <br />

    <form onSubmit={handleSumit} className=" p-4 bg-slate-600 rounded-2xl w-1/3 flex items-center justify-center " >
      <div >
        <Autocomplete
            disablePortal
            options={employees}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            getOptionLabel={(option) => option.name || ''} 
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search employee..." />}
        /> <br />

        <FloatingLabel
        controlId="floatingInput"
        label="date pour la tache"
        className="mb-3"
        >
          <Form.Control value={date} onChange={(e)=>{setDate(e.target.value)}}
          type="date" placeholder="name@example.com" />
        </FloatingLabel> 

        <FloatingLabel
        controlId="floatingInput"
        label="titre"
        className="mb-3"
        >
          <Form.Control value={titre} onChange={(e)=>{setTitre(e.target.value)}}
          type="text" placeholder="titre.." />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" label="description">
          <Form.Control value={description} onChange={(e)=>{setDescription(e.target.value)}}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '80px' }}
          />
        </FloatingLabel> <br />

        <FloatingLabel
        controlId="floatingInput"
        label="TIME"
        className="mb-3"
        >
          <Form.Control value={time} onChange={(e)=>{setTime(e.target.value)}}
          type="time" placeholder="titre.." />
        </FloatingLabel>

        <button className=" p-2 bg-slate-300 rounded-xl" >submit</button>
      </div>

    </form>

    </div>
  )
}
