import React from 'react';
import './styles/Home.css';

const technicianImageUrl = 'https://cdn-icons-png.flaticon.com/512/10086/10086652.png';

const Home = () => {
  return (
    <>
      <section className="Home-hero">
        <div className="Home-image-container">
          <img className="Home-technician-image" src={technicianImageUrl} alt="ช่าง" />
        </div>
        <div className="Home-text-container">
          <h1 className="Home-title">เรียกช่างออนไลน์</h1>
          <p className="Home-subtitle">ช่วยลดเวลาในการทำงานช่างให้คุณ!</p>
        </div>
      </section>
    </>
  );
};

export default Home;
