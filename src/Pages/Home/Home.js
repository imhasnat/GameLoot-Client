import React from 'react';
import Advertise from './Advertise/Advertise';
import Banner from './Banner';
import Categories from './Categories/Categories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertise></Advertise>
            <Categories></Categories>
        </div>
    );
};

export default Home;