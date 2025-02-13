import React,{ useState }  from 'react'
import "./css/MaskContainer.css"
//let desc = {'NW': 7.61617900172117, 'N': 15.275387263339072, 'NE': 9.609868043602983, 'W': 9.10786001147447, 'C': 7.013769363166953, 'E': 59.86804360298337, 'SW': 18.76075731497418, 'S': 5.048766494549628, 'SE': 35.08318990246701};
//let path="https://res.cloudinary.com/df4cmvul0/image/upload/v1739355921/a7xzas0cwzaokscn7qaz.jpg";


export const MaskContainer = () => {
  const [waterMaskUrl, setwaterMaskurl] = useState("");
  const [waterDesc, setWaterDesc] = useState(null);
  const [roadMaskUrl, setroadMaskUrl] = useState("");
  const [roadDesc, setRoadDesc] = useState(null);
  
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
    console.log("submit")
    let waterResult= await waterResponse();
    let roadResult=await roadResponse();
    let waterInfo = waterResult.desc;
    let waterArray = [];
    for (let key in waterInfo) {
      waterArray.push([key, waterInfo[key]]);
    } 
    let roadInfo = roadResult.desc;
    let roadArray = [];
    for (let key in roadInfo) {
      roadArray.push([key, roadInfo[key]]);
    } 
    
    setwaterMaskurl(waterResult.link);
    setroadMaskUrl(roadResult.link);
    setWaterDesc(waterArray);
    setRoadDesc(roadArray);
  };
  
  const densityDesc = (coverage) => {
    if (coverage < 10)
        return "Sparse coverage of the extracted feature."
    else if (coverage < 50)
        return "Moderate coverage of the extracted feature."
    else
        return "High coverage of the extracted feature."
  }

  return (
    <div className="mask-container">
      <div className='analyzeBtn'>
        <button onClick={handleAnalyze}>Analyze</button>
      </div>
      {/* {waterMaskUrl && roadMaskUrl &&( */}
        <div className="images-container">
          <div className="image-wrapper">
            <h2>Original Image</h2>
            <img src={localStorage.getItem('link')} alt="Original" />
          </div>
          <div className="image-wrapper">
            <h2>Road Extracted</h2>
            <div className='image-description'>
              <img src={roadMaskUrl} alt="Original" />
              <div className='info'> 
                {roadDesc && roadDesc.map((item, index) => (
                  <div key={index}>{`${item[0]} (${item[1]}) : ${densityDesc(item[1])}`}</div>
                ))}
              </div>
            </div> 
          </div>
          <div className="image-wrapper">
            <h2>Water Extracted</h2>
            <div className='image-description'>
              <img src={waterMaskUrl} alt="Original" />
              <div className='info'>
                {waterDesc && waterDesc.map((item, index) => (
                  <div key={index}>{`${item[0]} (${item[1]}) : ${densityDesc(item[1])}`}</div>
                ))}
              </div>
            </div> 
          </div>
        </div>
      
    </div>
  );
}
