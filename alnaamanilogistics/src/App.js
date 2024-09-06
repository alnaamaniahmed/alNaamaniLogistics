import React, {useState, useEffect} from 'react';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Preloader from './components/Preloader'; 
function App(){
  const [isArabic, setIsArabic] = useState(() => {
    const savedLanguage = localStorage.getItem('isArabic');
    return savedLanguage === 'true'; 
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this timeout to match your content loading time

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleSwitchChange = () => {
    const newLanguage = !isArabic;
    setIsArabic(newLanguage);
    localStorage.setItem('isArabic', newLanguage);
    window.location.reload(); 
  };
  

  return(
    <>
    {loading && <Preloader />}
    {!loading && (
      <>
        <Navbar isArabic={isArabic} onSwitchChange={handleSwitchChange} />
        <Hero isArabic={isArabic} />
        <Footer isArabic={isArabic} />
      </>
    )}
  </>
  );
}

export default App;