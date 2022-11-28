import React from 'react';
import Advertise from './Advertise/Advertise';
import Banner from './Banner';
import Categories from './Categories/Categories';
import NewsLetter from './NewsLetter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertise></Advertise>
            <Categories></Categories>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;