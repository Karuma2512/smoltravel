import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import '../../src/index';
import Navbar from '../imc/Header';

import AboutUs from '../homepage/AboutUs';

import FadeInSection from './FadeInSection';

import Footer from "../imc/Footer";

const AboutPage = () => {
    return (
        <div>
           
            <Navbar />
            <FadeInSection>
                <AboutUs />
            </FadeInSection>
            <FadeInSection>
                <Footer />
            </FadeInSection>    


        </div>
    );
};

export default AboutPage;
