import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../Contexts/myContext';

function Two() {

    const context = useContext(myContext);
    const [data, setData] = useState({});

    useEffect(()=>{
      setData(context.scheme.Scheme_Details);
    },[context.scheme]);

  return (
    <div className={`${context.clicked=="two"?'show':''} container`}>
      <p>Implementing Agency details of the scheme are enlisted here</p>
      <h3>About Scheme</h3>
      {data &&
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
    
    </div>
  )
}

export default Two
