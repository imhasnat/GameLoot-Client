import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { _id, img, category_name } = category;
    return (
        <div className="card w-72 bg-gray-100 shadow-xl">
            <div className="card-body">
                <img src={img} alt={category_name} title="Sony icons created by Freepik - Flaticon-sony icons"></img>
                <h2 className="card-title justify-center my-5">{category_name}</h2>
                <div className="card-actions justify-center">
                    <Link to={`/category/${_id}`}><button className="btn btn-sm btn-wide btn-primary">Explore</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Category;