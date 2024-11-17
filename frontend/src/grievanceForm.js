import React, { useState } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import logo from './images/jjm_logo.png'
import leakage from './images/leakage.png'
import waterSupply from './images/water-tap.png'
import others from './images/Others.png'
import user from './images/user.png'
import location from './images/location.png'
import description from './images/description.png'
import issue from './images/issue.png'


const serverURL = 'https://dummy-jjm-back.onrender.com'

function GrievanceForm() {
    const initialValues = {
        Location:{
            District:'',
            Block:'',
            Panchayat:'',
            Village:''
        },
        Complainant:{
            Name:'',
            "Mobile No":''
        },
        Complaint:{
            Type:'',
            Issue:''
        },
        Description:''
    }

    const [selected, setSelected] = useState('');
     
    const handleSubmit = (values)=>{
        
        console.log(values);
        fetch(`${serverURL}/grievance`,{
            method:'POST',
            body:JSON.stringify(values),
            headers:{
                "Content-Type":"application/json"
            }
            
        }).then((res)=>console.log(res)).catch((err)=>console.log(err));
    }
  return (
    
    <div className='grievanceForm'>
        <div className="grievance_header">
            <img src={logo} alt="" />
            <h1>Jal Jeevan Mission</h1>
        </div>
        
        <h2 style={{ width:'100%', marginBottom:'1rem'}}>Submit Your Grievance</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, touched, setFieldValue })=>
        (<Form>
        <div className="grievance_section">
            <p><img style={{scale:'1.2'}} src={location} alt="" /> LOCATION</p>
            <div className="grievanceElement">
                <label htmlFor="District">District</label>
                <Field required type='text' name='Location.District' />
            </div>
            <div className="grievanceElement">
                <label htmlFor="Block">Block</label>
                <Field required type='text' name='Location.Block' />
            </div>
            <div className="grievanceElement">
                <label htmlFor="Panchayat">Panchayat</label>
                <Field required type='text' name='Location.Panchayat' />
            </div>
            <div className="grievanceElement">
                <label htmlFor="Village">Village</label>
                <Field required type='text' name='Location.Village' />
            </div>
        </div>
        <div className="grievance_section">
            <p><img style={{scale:'1.2'}} src={user} alt="" /> PERSONAL DETAILS</p>
            <div className="grievanceElement">
                <label htmlFor="Name">Name</label>
                <Field required type='text' name='Complainant.Name' />
            </div>
            <div className="grievanceElement">
                <label htmlFor="Name">Mobile No.</label>
                <Field required type='text' name='Complainant[Mobile No]' />
            </div>
            
            
        </div>
        <div style={{justifyContent:'left'}} className="grievance_section">
            <p><img style={{scale:'1.2'}} src={issue} alt="" /> ISSUE</p>
            <div  className={` elementSelector ${selected=='one'?'select':''}`} onClick={()=>{
                setSelected('one');
                setFieldValue("Complaint.Issue","");
            }}>
                <Field required style={{visibility:'hidden'}} type="radio" id="Type1" name="Complaint.Type" value="Leakage Related"  />
                
                <label style={{fontSize:'20px',fontWeight:'500', display:'flex', flexDirection:'column', color:selected=='one'?'blue':''}} htmlFor="Type1"><img style={{width:'4rem'}} src={leakage} alt="" />Leakage Related</label>
            </div>
            <div className={` elementSelector ${selected=='two'?'select':''}`} onClick={()=>{
                setSelected('two');
                setFieldValue("Complaint.Issue","");
            }}>
                <Field required style={{visibility:'hidden'}} type="radio" id="Type2" name="Complaint.Type" value="Water Supply Related"  />
                
                <label style={{fontSize:'20px',fontWeight:'500', display:'flex', flexDirection:'column', color:selected=='two'?'blue':''}} htmlFor="Type2"><img style={{width:'4rem'}} src={waterSupply} alt="" />Water Supply Related</label>
            </div>
            <div className={` elementSelector ${selected=='three'?'select':''}`} onClick={()=>{
                setSelected('three');
                setFieldValue("Complaint.Issue","");
            }}>
                <Field required style={{visibility:'hidden'}} type="radio" id="Type3" name="Complaint.Type" value="Others"  />
                
                <label style={{fontSize:'20px',fontWeight:'500', display:'flex', flexDirection:'column', color:selected=='three'?'blue':''}} htmlFor="Type3"><img style={{width:'4rem'}} src={others} alt="" />Others</label>
            </div>
            {   
                
                selected=='one' &&
                <div className="options">
                    <div className="option">
                        
                        <label htmlFor="Tap1"><Field required  type="radio" name="Complaint.Issue" id="Tap1" value="Tap Leakage" />Tap Leakage</label>
                    </div>
                    <div className="option" >
                        
                        <label htmlFor="Tap2"><Field required  type="radio" name="Complaint.Issue" id="Tap2" value="Pipe Leakage" />Pipe Leakage</label>
                    </div>
                    <div className="option" >
                        
                        <label  htmlFor="Tap3"><Field required  type="radio" name="Complaint.Issue" id="Tap3" value="Tank Leakage" />Tank Leakage</label>
                    </div>
                </div>
            }
            {
                selected=='two' &&
                <div className="options">
                    <div className="option">
                        
                        <label htmlFor='1' ><Field required id='1' type="radio" name="Complaint.Issue" value="No Water Supply" />No Water Supply</label>
                    </div>
                    <div className="option" >
                        
                        <label htmlFor='2' ><Field required id='2' type="radio" name="Complaint.Issue" value="Irregular Water Supply" />Irregular Water Supply</label>
                    </div>
                    <div className="option" >
                        
                        <label  htmlFor='3'><Field required id='3' type="radio" name="Complaint.Issue" value="Inadequate Water Supply" />Inadequate Water Supply</label>
                    </div>
                    <div className="option" >
                        
                        <label htmlFor='4' ><Field required id='4' type="radio" name="Complaint.Issue" value="Poor Qaulity of Water" />Poor Qaulity of Water</label>
                    </div>
                </div>
            }
            {
                selected=='three' &&
                <div className="options">
                    <div className="option">
                        <label htmlFor='1' ><Field required id='1' type="radio" name="Complaint.Issue" value="Tap connection not provided" />   Tap connection not provided</label>
                    </div>
                    <div className="option" >
                        
                        <label htmlFor='2' ><Field required id='2' type="radio" name="Complaint.Issue" value="Tap connection broken" />Tap connection broken</label>
                    </div>
                    <div className="option" >
                        
                        <label htmlFor='3' ><Field required id='3' type="radio" name="Complaint.Issue" value="Additional tap connection required" />Additional tap connection required</label>
                    </div>
                    <div className="option" >
                        
                        <label htmlFor='4' ><Field required id='4' type="radio" name="Complaint.Issue" value="Damage by flood" />Damage by flood</label>
                    </div>
                    <div className="option" >
                        
                        <label htmlFor='5' ><Field required id='5' type="radio" name="Complaint.Issue" value="Tap stolen" />Tap stolen</label>
                    </div>
                </div>
            }
        </div>
        <div className="grievance_section">
            <p><img style={{scale:'1.2'}} src={description} alt="" /> Description</p>
            <div className="grievanceElement" style={{maxWidth:'100%'}}>
                <label htmlFor="Description" style={{width:'100%'}} >Description <span style={{fontWeight:'100'}}>(Optional)</span></label>
                <textarea id='Description' name='Description' rows={2}  onChange={(e)=>{
                    setFieldValue('Description',e.target.value)
                }}/>
            </div>
        </div>
        <button id='grievanceSubmit_btn'>Submit</button>
        </Form>)}
      </Formik>
    </div>
  )
}

export default GrievanceForm
