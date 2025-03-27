import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../homepage/Search'
import Navbar from '../imc/Header';
import Footer from "../imc/Footer";
import DestinationList from './DestinationsList';
import Search from '../homepage/Search';


const DestiPage = () => {
    return (
        <div>

            <Navbar />
            <Search/>
            <DestinationList />
            <Footer />

        </div>
    );
};

export default DestiPage;
