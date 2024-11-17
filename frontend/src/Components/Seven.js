import React, {useContext, useState} from 'react';
import { myContext } from '../Contexts/myContext';
import '../Styles/One.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';


const serverURL = 'https://dummy-jjm-back.onrender.com'


function Seven() {    
    const context = useContext(myContext);
    const  [reviewToken,setReviewToken] = useState(null);
    const [otpBox,setOtpBox] = useState(false);
    const [otp,setOtp] = useState('');
    const [user,setUser] = useState('');
    const [evalData, setEvalData] = useState('');
    const initials = {
        Email:''
    }

    const handleSubmit = (values)=>{
        setUser(values.Email);
        fetch(`${serverURL}/getOtp`,{
            method:'GET',
            headers:{
                user:values.Email
            }
        }).then((res)=>{
            if(res.status==200) setOtpBox(true);
        }).catch((err)=>console.log(err));
    }

    const submitOTP = ()=>{
        fetch(`${serverURL}/verifyOtp`,{
            method:'POST',
            body:JSON.stringify({otp:otp,user:user}),
            headers:{
                "Content-Type":"application/json"
            }

        }).then((res)=>res.text().then((data)=>{
            console.log(data);
            setReviewToken(data);
            setOtpBox(null);
        })).catch((err)=>console.log(err));
    }

    const sendEvaluation = ()=>{
        fetch(`${serverURL}/verifyToken`,{
            method:'POST',
            body:JSON.stringify({
                data:evalData,
                schemeID:context.scheme.Basic_Details["Scheme ID"],
            }),
            headers:{
                authorization:reviewToken,
                "Content-Type":"application/json"
            }
        }).then((res)=>res.text().then((data)=>window.alert(data))).catch((err)=>console.log(err));
        setEvalData('');
    }
  return (
    <div className={`${context.clicked=="seven"?'show':''} container`}>
        {!reviewToken && !otpBox &&
        <>
        <p>You need to login to evaluate a scheme.</p>
        <h2 style={{color:'black', margin:'.5rem'}}>Login </h2>
        <div className='review_form'>
            <Formik initialValues={initials} onSubmit={handleSubmit}> 
                <Form>
                    <Field type="email" name="Email" placeholder='Email'/>
                    <button className='review_otp_btn'>Get Otp</button>
                </Form>
            </Formik>
        </div>
        </>}
        {otpBox &&
            <div className='review_form'>
                <div className="otp_box">
                    <input type="text" placeholder='otp' value={otp} onChange={(e)=>{
                        setOtp(e.target.value)
                    }}/>
                    <button  type='button' className='review_otp_btn' onClick={submitOTP} >Verify Otp</button>
                </div>
            </div>
        }
        {reviewToken &&
            <div className="evaluation_form">
                <h3>Write the evaluation to submit</h3>
                <form>
                    <textarea placeholder='write your detailed evaluation here...' value = {evalData} onChange={(e)=>{
                        setEvalData(e.target.value);
                    }}/>
                    <button type='button' className='review_otp_btn' onClick={sendEvaluation}>Submit</button>
                </form>
            </div>
        }
    </div>
    
  )
}

export default Seven
