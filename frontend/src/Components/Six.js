import React, { useContext, useState } from 'react'
import { myContext } from '../Contexts/myContext';


const serverURL = 'https://dummy-jjm-back.onrender.com'


function Six() {

    const context = useContext(myContext);
    const [file, setFile] = useState(''); 

    const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
    
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
    
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
    
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
        
      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }

    const handleShow = ()=>{
      const blob = b64toBlob(context.scheme.Scheme_Layout.PDF.replace('data:application/pdf;base64,', ''), 'application/pdf');
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    }

  return (
    <div className={`${context.clicked=="six"?'show':''} container`}>
      <p>Select the format you want to view</p>
      <div className="buttons">
        <button className='btn' style={{backgroundColor:'green'}} onClick={()=>handleShow()}  >PDF</button>
        <button className='btn' style={{backgroundColor:'red'}}>Map</button>
      </div>
    </div>
  )
}

export default Six
