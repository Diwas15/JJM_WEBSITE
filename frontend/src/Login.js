import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom";
import { myContext } from './Contexts/myContext';
import jjmLogo from './images/jjm_logo.png';

const serverURL = 'http://localhost:8080'

function Login() {
    const context = useContext(myContext);
    const [verifier, setVerifier] = useState(false);
    const [user, setUser] = useState('');
    const [otp, setOtp] = useState('');

    const initialValues = {
        username:'',
    }
    const init = {
      otp:''
    }
    const navigate = useNavigate();

    function getOTP(values){
      setUser(values.username);
      fetch(`${serverURL}/getOtp`,{
        method:"GET",
        headers:{
          user:values.username
        }
      }).then((res)=>{
        if(res.status!=200){
          window.alert("invalid Email");
        }
        else {
          setVerifier(true);
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
    function Submit(data){
        fetch(`${serverURL}/verifyOtp` ,{
          method:'POST',
          body: JSON.stringify({
            user:user,
            otp:data.otp
          }),
          headers:{
            "Content-Type":"application/json"
          }
        }).then((res)=>{
          if(res.status==401){
            window.alert("Unauthorized User");
            window.location.reload();
          }
          else if(res.status==402){
            window.alert("INVALID OTP Try Again");
            window.location.reload();
          }
          else if(res.status==200){
            res.text().then((token)=>{
              console.log(token);
              let a = document.createElement('a');
              a.href = `${serverURL}/?token=${token}`;
              a.click();
            })
          }
        }).catch((err)=>console.log(err));
        // ;
    }
  return (
    <div className='LoginPage'>
        <header style={{}}>
          <img height='50px' src={jjmLogo} alt="" />
          <h1 style={{alignContent:'end', marginLeft:'.5rem', color:'#0483d1'}}>Jal Jeevan Mission</h1>
        </header>
        {!verifier &&
        <div className='adminLoginForm'>
          <Formik initialValues={init} onSubmit={getOTP}>
            <Form>
                <h3 style={{marginBottom:'1rem', color:'#404040'}}>Welcome to Jal Jeevan Mission, Uttarakhand Portal <hr /></h3>
                
                <Field  type="text" id="username" name="username" placeholder='Username (xyz@gmail.com)' />
                <button style={{marginTop:'1rem'}} className='submit_btn' type='submit'>Get OTP</button>
            </Form>
          </Formik>
        </div>}
        {
          verifier &&
          <div className='adminLoginForm'>
            <Formik initialValues={initialValues} onSubmit={Submit}>
              <Form>
                  <h3 style={{marginBottom:'1rem', color:'#404040'}}>Welcome to Jal Jeevan Mission, Uttarakhand Portal <hr /></h3>
                  
                  <label htmlFor="otp">OTP</label>
                  <Field  type="text" id="otp" name="otp" />
                  <button style={{marginTop:'1rem'}} className='submit_btn' type='submit'>Verify Otp</button>
              </Form>
            </Formik> 
            {/* <form action="http://192.168.29.100:8080/" target='' method='GET' encType='application/x-www-form-urlencoded' >
              <h3 style={{marginBottom:'1rem', color:'#404040'}}>Welcome to Jal Jeevan Mission, Uttarakhand Portal <hr /></h3>
              
              <input type="text" name='user' value={user} />
              <input type="text" value={otp} name='otp' placeholder='Enter OTP' onChange={(e)=>{
                setOtp(e.target.value);
              }}/>
              <button type='submit' style={{marginTop:'1rem'}} className='submit_btn' >Submit</button>
            </form> */}
          </div>
        }
    </div>
  )
}

export default Login
