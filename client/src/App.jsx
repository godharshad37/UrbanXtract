// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import MapPage from "./components/MapPage";
// import ResultPage from "./components/ResultPage";
// import UploadPage from "./components/UploadPage";
// import AboutPage from "./components/AboutPage";
// import ContactPage from "./components/ContactPage";
// import { LinkProvider } from "./context/context";

// function App() {
//   return (
//     <LinkProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/map" element={<MapPage />} />
//           <Route path="/upload" element={<UploadPage />} />
//           <Route path="/result" element={<ResultPage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/contact" element={<ContactPage />} />
//         </Routes>
//       </Router>
//     </LinkProvider>
//   );
// }

// export default App;
import React from "react";
import Home from "./pages/Home";

function App() {
  return <Home />;
}

export default App;