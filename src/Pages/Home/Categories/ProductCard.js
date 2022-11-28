import moment from 'moment/moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { MdVerified } from "react-icons/md";
import { HiXCircle } from "react-icons/hi";
import { RiCheckboxCircleFill } from "react-icons/ri";

const ProductCard = ({ product, setProduct, setReportProduct }) => {
    const { title, description, imageUrl, resprice, orgprice, sellerName, location, date, verified } = product;
    const off = parseInt((resprice * 100) / orgprice);
    return (
        <div className="card w-64 bg-base-100 shadow-lg p-3">
            <figure></figure>
            <div className="">
                <div className='flex justify-between'>
                    {verified ?
                        <div className='flex items-center'>
                            <div><p className='font-semibold ' title='Seller'>{sellerName}</p></div>
                            <div className=' text-blue-500 ml-1'>{<MdVerified />}</div>
                        </div>
                        :
                        <div className='flex items-center'>
                            <div><p className='font-semibold ' title='Seller'>{sellerName}</p></div>
                            <div className=' text-red-500 ml-1'>{<HiXCircle />}</div>
                        </div>
                    }
                    <span className='text-gray-500 font-semibold'>{moment.utc(date).local().startOf('second').fromNow()}</span>
                </div>
                <img className='' src={imageUrl} alt={title} />
                <h2 className="font-semibold text-lg">{title}</h2>
                <div>
                    <p><span className='font-bold text-3xl'>${resprice}</span></p>
                    <p className='text-gray-400'><strike>${orgprice}</strike> <span className='text-white bg-red-600 font-semibold rounded-sm text-xs p-1 ml-1' >- {off ? off : 0}%</span> </p>
                </div>
                <p><span className='font-semibold'>Location:</span> {location} </p>
                <p className='text-gray-500'>
                    {
                        description.length > 100 ?
                            <>{description.slice(0, 100) + '....'}<Link to={``} className="font-semibold text-primary">See more</Link></>
                            :
                            description
                    }
                </p>
                <div className="card-actions mt-2">
                    <div className='grid grid-cols-2 gap-2 w-full'>
                        <label
                            htmlFor="booking-modal"
                            onClick={() => setProduct(product)}
                            className="btn btn-sm btn-primary text-white"
                        >Book</label>
                        <label
                            htmlFor="reporting-modal"
                            onClick={() => setReportProduct(product)}
                            className="btn btn-sm btn-primary text-white"
                        >Report</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;