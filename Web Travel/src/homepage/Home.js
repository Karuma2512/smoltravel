import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router } from 'react-router-dom'

import '../../src/index.css';
import Navbar from '../imc/Header';

import AboutUs from './AboutUs';
import Services from './Services';
import Destination from './Destination';
import Packages from './Packages';
import Booking from './Booking';
import FadeInSection from './FadeInSection';
import Search from './Search';
import Process from "./Process";
import OurGuide from "./OurGuilde";
import MyTeam from "./MyTeam";
import Footer from "../imc/Footer";
const Home = () => {
  return (
    <div>
   
      <Navbar />

      <Search />
      <FadeInSection>
        <AboutUs />
      </FadeInSection>
      <FadeInSection>
        <Services />
      </FadeInSection>
      <FadeInSection>
        <Destination />
      </FadeInSection>
      <FadeInSection>
        <Packages />
      </FadeInSection>
      <FadeInSection>
        <Booking />
      </FadeInSection>
      <FadeInSection>
        <Process />
      </FadeInSection>
      <FadeInSection>
        <OurGuide />
      </FadeInSection>
      <FadeInSection>
        <MyTeam />
      </FadeInSection>
      <Footer/>

    </div>
  );
};

export default Home;
