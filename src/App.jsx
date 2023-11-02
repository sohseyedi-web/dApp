import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
      <section className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Toaster />
        <Footer />
      </section>
  );
}

export default App;
