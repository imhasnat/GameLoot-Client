import React from 'react';
import Advertise from './Advertise/Advertise';
import Categories from './Categories/Categories';

const Home = () => {
    return (
        <div className='w-10/12 mx-auto'>
            <h1>Banner</h1>
            <Advertise></Advertise>
            <Categories></Categories>
        </div>
    );
};

export default Home;