import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../homepage/Search'
import Navbar from '../imc/Header';
import Footer from "../imc/Footer";
import Package from './packages'
import Search from '../homepage/Search';


const PackPage = () => {
    return (
        <div>

            <Navbar />
            <Search/>
            <Package />
            <Footer />

        </div>
    );
};

export default PackPage;