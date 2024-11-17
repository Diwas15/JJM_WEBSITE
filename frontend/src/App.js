import './App.css';
import jjm_logo from './images/jjm_logo.png';
import org from './images/org.png';
import React, { useEffect, useState, } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {myContext} from './Contexts/myContext';
import whatsapp from './images/whatsapp.png';
import phone from './images/calling.png';
import message1 from './images/message (1).png';
import facebook from './images/facebook.png';
import twitter from './images/twitter.png';
import instagram from './images/instagram.png';
import One from './Components/One';
import Two from './Components/Two';
import Three from './Components/Three';
import Four from './Components/Four';
import Five from './Components/Five';
import Six from './Components/Six';
import Seven from './Components/Seven';
import Login from './Login';
import SchemeForm from './SchemeForm';
import Complaint from './grievanceForm';


const serverURL = 'https://dummy-jjm-back.onrender.com'

function App() {
  const [authToken, setAuthToken] = useState('d');
  
  
  return (
      <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Login/>}/>
        <Route path='/schemes' element={<Scheme/>} />
        <Route path='/grievanceForm' element={<Complaint/>} />
      </Routes>
    </BrowserRouter>
  );
}


function Scheme(){
  const [clicked, setClicked] = useState("one");
  const [scheme,setScheme] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get('schemeID');
    fetch(`${serverURL}/schemes?schemeID=${id}`).then((res)=>{
      if(res.status == 301) {
        window.alert("scheme not found");
        navigate('/')
      }
      res.json().then((data)=>{
        console.log(data);
        setScheme(()=>data);
        
      })
    }).catch((err)=>{
      console.log("data banane me gadbad");
    }).catch((err)=>console.log("fetch nahi hua"));
  },[]);

  useEffect(()=>{
    setDesc(scheme.Basic_Details);
  },[scheme]);

 

  
  return(
    <div id='App' className="App">
      <myContext.Provider value={{clicked,setClicked, scheme,setScheme}}>
        <header className = "header" >
          <img src={jjm_logo} alt="" />
          <div className="head_text">
            <h2>Jal Jeevan Mission</h2>
            <p>Jal Nigam Uttarakhand</p> 
          </div>
          <div id="google_translate_element"></div>
        </header>
        <div className="scheme_Head">
          <img src={org} alt="Uttarakhand Sarkar" />
          <h1>{scheme? scheme.Basic_Details.Name:''}</h1>
          <p style = {{margin: '1rem'}} >{scheme?`${scheme.Basic_Details.Village}, ${scheme.Basic_Details.District}`:''}</p>
          <p>Jal Nigam Uttarakhand</p>
          <p>{desc?desc.Division:''} Division</p>
        </div>
        <div className='videos'>
          <div className="video_container">
            <iframe className='player' src="https://www.youtube.com/embed/Qu7gGnwzi9M?si=_-UKk15m4V1xET8Z" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
            {
              scheme && 
              scheme.Video_Links.map((value,key)=>{
                let str = value.replace('youtu.be','www.youtube.com/embed');
                console.log(str);
                return <div className="video_container">
                  <iframe className='player' src={str} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                
              })
            }
          
        </div>
        <div className="content_body">
          <div className="selector_box">
            <p id='one' className={clicked=="one"?'change_back':''} onClick={()=>setClicked("one")}>Basic Details</p>
            <hr />
            <p id='two' className={clicked=="two"?'change_back':''} onClick={()=>setClicked("two")}>Scheme Details</p>
            <hr />
            <p id='three' className={clicked=="three"?'change_back':''} onClick={()=>setClicked("three")}>Field Functionary</p>
            <hr />
            <p id='four' className={clicked=="four"?'change_back':''} onClick={()=>setClicked("four")}>Water Quality</p>
            <hr />
            <p id='five' className={clicked=="five"?'change_back':''} onClick={()=>setClicked("five")}>Scheme Component</p>
            <hr />
            <p id='six' className={clicked=="six"?'change_back':''} onClick={()=>setClicked("six")}>Scheme Layout</p>
            <hr />
            <p id='seven' onClick={()=>setClicked("seven")} style={{color:'red', backgroundColor:clicked=="seven"?'black':'#edf2f7'}}>Scheme Evaluation</p>
          </div>
          <div className="display_box">
        
              <One/>
              <Two/>
              <Three/>
              <Four/>
              <Five/>
              <Six/>
              <Seven/>
         
          </div>
          <div className="grievance_box">
            <div className="title">Submit your grievance through : </div>
            <a href="https://wa.me/919720678657"><div style={{backgroundColor:'#16A34A'}} className="tabs"><img src={whatsapp} alt="" />WhatsApp</div></a>
            <a href="tel:919720678657"><div style={{backgroundColor:'#CB8A1D'}} className="tabs"><img src={phone} alt="" />Phone</div></a>
            <a href="http://192.168.29.100:3001/grievanceForm" target='_blank'><div style={{backgroundColor:'red'}} className="tabs"><img src={message1} alt="" />Online</div></a>
          </div>
        </div>
        <hr />
        <footer className='footer'>
          <h2>You can follow us on</h2>
          <a href="https://m.facebook.com/jjmuttarakhand1/?" target='_blank'><img src={facebook} alt="" /></a>
          <a href="https://www.instagram.com/jjmuttarakhand1/" target='_blank'><img src={instagram} alt="" /></a>
          <a href="https://x.com/jjmuttarakhand1" target='_blank'><img src={twitter} alt="" /></a>
        </footer>
      </myContext.Provider>
      </div>
  )
}
export default App;
