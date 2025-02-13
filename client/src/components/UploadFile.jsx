import React,{ useState }  from 'react'
import './css/UploadFile.css'


export const UploadFile = () => {
    const [file, setFile] = useState(null);
     // This function is called when the user selects a file
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);// Update the state with the selected file
    };
    const handleSubmitFile = async (e) => {
      e.preventDefault();
      if(file)
      {
        const formData = new FormData();
        formData.append('sat', file);
        console.log(file);
        try {
          const response = await fetch('http://localhost:3000/upload', {
              method: 'POST',
              body:formData
          });
          console.log(response);
          
          const result = await response.json();
          console.log(result);
          localStorage.setItem('link',result.link);

        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
  };
    // const handleSubmitFile = (e) => {
    //     e.preventDefault();
    //     // file upload to backend
    // }

  return (
    <form onSubmit={e => handleSubmitFile(e)}>
        <label htmlFor="geoImg">Upload GeoSpatial Image</label>
        <input type="file" id='geoImg' name='geoImg' onChange={handleFileChange}/>
        <button>submit</button>
    </form>
  )
}
