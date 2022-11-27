import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, setProduct, setReportProduct }) => {
    const { title, description, imageUrl, resprice, orgprice, sellerName, location, date, verified } = product;

    return (
        <div className="card w-80 bg-base-100 shadow-xl ">
            <figure><img src={imageUrl} alt={title} /></figure>
            <div className="card-body mb-2">
                <h2 className="card-title">{title}</h2>
                <p>
                    {
                        description.length > 100 ?
                            <>{description.slice(0, 100) + '....'}<Link to={``} className="font-semibold text-primary">See more</Link></>
                            :
                            description
                    }
                </p>
                <p><span className='font-semibold'>Posted Date:</span> {date?.slice(0, 10)}</p>
                <p><span className='font-semibold'>Location:</span> {location}</p>
                <div className='flex'>
                    <p><span className='font-semibold'>Orginal Price:</span> {orgprice}</p>
                    <p><span className='font-semibold'>Resale Price:</span> {resprice}</p>
                </div>
                <p><span className='font-semibold'>Seller Name:</span> {sellerName} {verified ? 'true' : 'false'}</p>
                <div className="card-actions ">
                    <div className='grid grid-cols-2 gap-2 w-full'>
                        <button className="btn btn-primary">
                            <label
                                htmlFor="booking-modal"
                                onClick={() => setProduct(product)}
                                className="btn btn-primary text-white"
                            >Book</label>
                        </button>
                        <button className="btn btn-primary">
                            <label
                                htmlFor="reporting-modal"
                                onClick={() => setReportProduct(product)}
                                className="btn btn-primary text-white"
                            >Report</label>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;