import omnilink from './assets/images/omnilink.png'
import react from './assets/images/react.png'
import login from './assets/images/login.png'
import google from './assets/images/google.png'
import 'boxicons/css/boxicons.min.css'; 
import { Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import axiosClient from './axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault()
    axiosClient.post('/admins/login_admin', {email , password})
    .then((response)=>{
      console.log(response);
      if (response.status == 200){
        navigate(`/home/${response.data.admin._id}`)
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  return (
    
    <div style={{display:'grid',gridTemplateRows:'10% 77% 13%'}} className=" h-screen" > 

      {/* header */}
      <div className=" bg-slate-900 p-4 pl-16" >
          <img src={react} className=' w-10'  />  
      </div>

      {/* container */}
      <div className=" bg-slate-50 pl-40 pr-40 pt-10 pb-10" style={{display:'flex',gap:'10%'}} >
        <div className=' p-5 flex flex-col gap-4 justify-center  '>
          <h1 className=' text-4xl' style={{fontFamily:'Poppins', fontWeight:'700'}}>Login</h1>
          <h1>See your growth and get support!</h1>
          <div className=' flex gap-5 justify-center p-2 border-2 rounded-3xl border-gray-900 w-96'>
            <img src={google} className=' w-6'/>
            <h1>Sign in with google</h1>  
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <h1>email <span className=' text-red-600'>*</span></h1>
              <input onChange={(e)=>setEmail(e.target.value)}
              className=' w-full p-2' style={{height:'50px',borderRadius:'5px',border:'1px solid #8F8F8F',background:'#EDF0F2'}}
              type="text" id='email'   />
            </div>

            <div>
              <h1>password <span className=' text-red-600'>*</span></h1>
              <input onChange={(e)=>setPassword(e.target.value)}
              className=' w-full p-2' style={{height:'50px',borderRadius:'5px',border:'1px solid #8F8F8F',background:'#EDF0F2'}}
              type="password" id='email'   />
            </div>

            <div className=' flex justify-between items-center'>
              <FormControlLabel control={
                <Checkbox
                  sx={{
                    color: '#101540',
                    '&.Mui-checked': {
                      color: '#101540',
                    },
                  }}
                /> } 
              label="Remember me" />
              <h1 className=' hover:cursor-pointer hover:underline' >Forgot password?</h1>
            </div>

            <button 
            className=' flex gap-5 hover:cursor-pointer hover:bg-gray-700 justify-center p-2 border-2 rounded-3xl bg-gray-900 w-96'>
              <h1 className=' text-white p-1 '>Login</h1>  
            </button>
          </form>
          
          <div className=' flex justify-center'>
            <h1> Not regestered yet? <span className=' hover:cursor-pointer underline'> Create a new account</span> </h1>
          </div>
          
        </div>
        <div className=' flex justify-center items-center'>
          <img src={login} style={{width:'83%'}}  />  
        </div>
      </div>
      
      {/* footer */}
      <div className=" bg-slate-900 p-2">
        <div className=' flex flex-col justify-center items-center gap-1 '>
          <img src={omnilink} className=' w-20' />
          <h1 className=' text-white text-xs'>© 2024, All Rights Reserved</h1>
          <div className=' flex justify-evenly gap-3'>
            <i style={{color:'white'}} className='bx bxl-facebook'></i>
            <i style={{color:'white'}} className='bx bxl-instagram'></i>
            <i style={{color:'white'}} className='bx bxl-linkedin'></i>
          </div>
        </div>
      </div>
      
    </div>
  )
}
