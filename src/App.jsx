
import Header from "./components/Header";
import Aboutus from "./components/Aboutus";
import Features from "./components/Features";
import Services from "./components/Services";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";



import Softwareandmis from "./pages/Softwareandmis";
import Development from "./pages/Development";
import Lanwan  from "./pages/Lanwan";
import Inventory from "./pages/Inventory";
import Security from "./pages/Security";
import Equipment from "./pages/Equipment";



function App() {
  return (
     <>
      <Header />
      <div className="pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Aboutus />
                <Features />
                <Services />
                <Footer />
              </>
            }
          />
          {/* ✅ Service Detail Routes */}
          <Route path="/Softwareandmis" element={<Softwareandmis/>} />
          <Route path="/Development" element={<Development />} />
          <Route path="/Lanwan" element={<Lanwan />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/Security" element={<Security />} />
          <Route path="/Equipment" element={<Equipment />} />



          
        </Routes>
      </div>
    </>
  );
}

export default App;
