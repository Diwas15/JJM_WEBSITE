import React, { useContext, useEffect, useState } from 'react'
import '../Styles/One.css'
import { myContext } from '../Contexts/myContext';

const serverURL = 'https://dummy-jjm-back.onrender.com'

function One() {

    const context = useContext(myContext);
    const [data, setData] = useState({});
    
    useEffect(()=>{
      setData(context.scheme.Basic_Details);
    },[context.scheme])

 
  return (
    
    <div className={`${context.clicked=="one"?'show':''} container`}>
      <p>Basic details of the scheme are enlisted here, for further information please contact concerned officer of division / sub division</p>
      <h3>About This Scheme</h3>
      {data &&
        Object.keys(data).map((key)=>{
          return <><div className="element">
            <dt className='key'>{key}</dt>
            <dd className='value'>{data[key]==''?'N/A':data[key]} </dd>
          </div>
          <hr className='rule'/>
          </>
          
        })
      }
    </div>
  )
}


export default One
