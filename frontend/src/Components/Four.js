import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../Contexts/myContext';


const serverURL = 'https://dummy-jjm-back.onrender.com'


function Four() {

    const context = useContext(myContext);
    const [data, setData] = useState({});

    useEffect(()=>{
      setData(context.scheme.Water_Quality);
      // console.log(data);
    },[context.scheme]);

  
  return (
   <div className={`${context.clicked=="four"?'show':''} container`}>
    <p>Water Quality details of the scheme are enlisted here.</p>
      <h3>About Water Quality</h3>
      
      {
        data &&
        Object.keys(data).map((key)=>{
          return <>
            <div className="element">
              <dt className='key'>{key}</dt>
              <dd className='value'>{data[key]==''?'N/A':data[key]}</dd>
            </div>
            <hr className='rule'/>
          </>
        })
      }
      {/* <div className="element">
        <dt className='key'>TDS</dt>
        <dd className='value'>SURSURI PT-II PWSS</dd>
      </div>
      <hr className='rule'/>
      <div className="element">
        <dt className='key'>Iron</dt>
        <dd className='value'>SURSURI PT-II PWSS</dd>
      </div>
      <hr className='rule'/>
      <div className="element">
        <dt className='key'>Turbidity</dt>
        <dd className='value'>SURSURI PT-II PWSS</dd>
      </div>
      <hr className='rule'/>
      <div className="element">
        <dt className='key'>Florid</dt>
        <dd className='value'>SURSURI PT-II PWSS</dd>
      </div>
      <hr className='rule'/>
      <div className="element">
        <dt className='key'>Residual Chlorine</dt>
        <dd className='value'>SURSURI PT-II PWSS</dd>
      </div>
      <hr className='rule'/>
      <div className="element">
        <dt className='key'>Chloride</dt>
        <dd className='value'>SURSURI PT-II PWSS</dd>
      </div>
      <hr className='rule'/>
      <div className="element">
        <dt className='key'>Nitrate</dt>
        <dd className='value'>SURSURI PT-II PWSS</dd>
      </div>
      <hr className='rule'/>
      <div className="element">
        <dt className='key'>Bacteriological Test</dt>
        <dd className='value'>SURSURI PT-II PWSS</dd>
      </div> */}
   </div>
  )
}

export default Four
