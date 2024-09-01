import React, {useState} from 'react';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
function App(){
  const [isArabic, setIsArabic] = useState(false);
  const handleSwitchChange = () => {
    setIsArabic(!isArabic);
  };

  return(
    <>
    <Navbar isArabic={isArabic} onSwitchChange={handleSwitchChange}/>
    <Hero isArabic={isArabic} />
    <Footer isArabic={isArabic} />
    </>
  );
}

export default App;