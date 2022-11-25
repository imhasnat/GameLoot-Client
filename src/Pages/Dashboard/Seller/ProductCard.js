import React from 'react';

const ProductCard = ({ product }) => {
    const { title, description, imageUrl } = product
    return (
        <div className="card w-64 bg-base-100 shadow-xl">
            <figure><img src={imageUrl} alt={title} /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;