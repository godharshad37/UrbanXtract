import React from 'react'
import './css/UploadFile.css'


export const UploadFile = () => {
    const handleSubmitFile = (e) => {
        e.preventDefault();
        // file upload to backend
    }

  return (
    <form onSubmit={e => handleSubmitFile(e)}>
        <label htmlFor="geoImg">Upload GeoSpatial Image</label>
        <input type="file" id='geoImg' name='geoImg'/>
        <button>submit</button>
    </form>
  )
}
