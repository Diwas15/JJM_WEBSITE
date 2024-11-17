import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../Contexts/myContext';

const serverURL = 'https://dummy-jjm-back.onrender.com'

function Five() {

    const context = useContext(myContext);
    const [data,setData] = useState([]);

    useEffect(()=>{
      setData(context.scheme.Scheme_Component);
    },[context.scheme]);
  
  return (
    <div className={`${context.clicked=="five"?'show':''} container`}>
      <p>Component details of the scheme are enlisted here.</p>
      <h3>About Scheme Components</h3>
      {
        data && 
        data.map((obj,key)=>{
          return <>
            <div className="element">
              <dt className='key'>Component Name</dt>
              <dd className='value'>{obj.Component}</dd>
            </div>
            <hr className='rule'/>
            <div className="element">
              <dt className='key'>Specification</dt>
              <dd className='value'>{obj.Specification}</dd>
            </div>
            <br />
          </>
        })
      }
    </div>
  )
}

export default Five
