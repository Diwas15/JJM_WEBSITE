import React, { useContext, useState, useEffect } from 'react'
import { myContext } from '../Contexts/myContext';

const serverURL = 'https://dummy-jjm-back.onrender.com'


function Three() {

    const context = useContext(myContext);

    const [data, setData] = useState({});

    useEffect(()=>{
      setData(context.scheme.Field_Functionary);
      // console.log(data);
    },[context.scheme]);

  
  return (
    <div className={`${context.clicked=="three"?'show':''} container`}>
      <p>Jal Mitra & WUC Users details of the scheme are enlisted here</p>
      <h3>About Jal Mitra / PTC</h3>
      {
        data && data["About Jal Mitra/PTC"] && 
        Object.keys(data["About Jal Mitra/PTC"]).map((key)=>{
          return <>
          <div className="element">
            <dt className='key'>{key}</dt>
            <dd className='value'>{data["About Jal Mitra/PTC"][key]==''?'N/A':data["About Jal Mitra/PTC"][key]}</dd>
          </div>
          <hr className='rule'/>
        </>
        })
      }
      
      <h3>About VWSC</h3>
      {
        data && data["About VWSC"] && 
        Object.keys(data["About VWSC"]).map((key)=>{
          if(typeof(data["About VWSC"][key])=='string')  return <>
          <div className="element">
              <dt className='key'>VWSC {key}</dt>
              <dd className='value'>{data["About VWSC"][key]==''?'N/A':data["About VWSC"][key]}</dd>
            </div>
            <hr className='rule'/>
          </>
          let name = data["About VWSC"][key].Name;
          let no = data["About VWSC"][key]["Phone No"];
          return<>
            <div className="element">
              <dt className='key'>{key} Name<p>Mobile No.</p></dt>
              <dd className='value'>{name==''?'N/A':name} <p>{no==''?'N/A':no}</p></dd>
            </div>
            <hr className='rule'/>
          </>
        })
      }
      <h3>About Divison Office</h3>
      {
        data && data["About Division Office"] &&

        Object.keys(data["About Division Office"]).map((key)=>{
          
          let name = data["About Division Office"][key].Name;
          let no = data["About Division Office"][key]["Phone No"];
          return <>
            <div className="element">
              <dt className='key'>{key} Name<p>Phone No</p></dt>
              <dd className='value'>{name==''?'N/A':name}<p>{no==''?'N/A':no}</p></dd>
            </div>
            <hr className='rule'/>
          </>
        })
      }

    </div>
  )
}

export default Three
