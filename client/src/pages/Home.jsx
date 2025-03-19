// import React from "react";
// import { UploadPage } from "../components/UploadPage"
// import { ResultPage } from "../components/ResultPage"
// import { MyMapContainer } from "../components/MyMapContainer";
// import { Navbar } from "../components/Navbar";
// import "./Home.css"; // Import CSS file
// //import {MaskContainer} from "../components/MaskContainer"
// import { LinkProvider } from "../context/context";


// export const Home = () => {
//   return (
//     <LinkProvider>
//       <div className="home-container">
//         <Navbar />
//         <UploadPage className="upload-file-container" />
//         <ResultPage></ResultPage>
//       </div>
//     </LinkProvider>
//   );  
// };
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import MapPage from "../components/MapPage";
import ResultPage from "../components/ResultPage";
import UploadPage from "../components/UploadPage";
import AboutPage from "../components/AboutPage";
import ContactPage from "../components/ContactPage";
import HomePage from "../components/HomePage";
import FeaturesPage from "../components/FeaturesPage";
import { LinkProvider } from "../context/context";

function Home() {
  return (
    <LinkProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/features" element={<FeaturesPage/>}/>
          <Route path="/map" element={<MapPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

        </Routes>
      </Router>
    </LinkProvider>
  );
}
export default Home;