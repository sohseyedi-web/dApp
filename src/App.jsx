import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function App() {
 
  return (
    <BrowserRouter>
      <section className="flex flex-col min-h-screen">
        <Navbar
          
        />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Toaster />
        <Footer />
      </section>
    </BrowserRouter>
  );
}

export default App;
