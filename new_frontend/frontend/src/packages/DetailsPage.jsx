import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../homepage/Search'
import Navbar from '../imc/Header';
import Footer from "../imc/Footer";
import PackageDetails from './packagesDetails';
import Search from '../homepage/Search';

const DetailPages = () => {
    return (
        <div>

            <Navbar />
            <Search />
            <PackageDetails />

            <Footer />

        </div>
    );
};

export default DetailPages;