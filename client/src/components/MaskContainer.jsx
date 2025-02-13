import React,{ useState }  from 'react'

export const MaskContainer = () => {
  const [waterMaskUrl, setwaterMaskurl] = useState("");
  const [roadMaskUrl, setroadMaskUrl] = useState("");
  
  const waterResponse = async() => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/feature/water_extraction');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let waterResult = await response.json();
      return waterResult;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const roadResponse= async()=>{
    try {
      const response = await fetch('http://localhost:3000/api/v1/feature/road_extraction');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let roadResult = await response.json();
      
      return roadResult
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleAnalyze =async () => {
    //let waterResult= await waterResponse();
    //let roadResult=await roadResponse();
    
    console.log(waterResult,roadResult)
    
    setwaterMaskurl(waterResult.link);
    setroadMaskUrl(roadResult.link);
    
  };
  return (
    <div>
        <div>
            <button onClick={handleAnalyze}>Analyze</button>
        </div>
        <div>
            <img src={roadMaskUrl}></img>
        </div>
        <div>
            <img src={waterMaskUrl}></img>
        </div>
    </div>
  )
}
