import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { _id, category_name } = category;
    return (
        <div className="card w-72 bg-gray-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{category_name}</h2>
                <div className="card-actions justify-end">
                    <Link to={'/'}><button className="btn btn-primary">Explore</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Category;