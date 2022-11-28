import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    console.log(user.email);
    const { data: bookings = [] } = useQuery({
        queryKey: ['booking'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/booking?email=${user.email}`);
            const data = await res.json();
            console.log(data);
            return data;
        }
    })

    return (
        <div>
            <h3 className="text-3xl mb-5">My Orders</h3>
            <div className="overflow-x-auto">
                {
                    bookings.length > 0 ?
                        <>
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bookings?.map((booking, i) => <tr key={booking._id}>
                                            <th>{i + 1}</th>
                                            <td><div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={booking?.imageUrl} alt={booking?.productName} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{booking?.productName}</div>
                                                </div>
                                            </div></td>
                                            <td>{booking?.price}</td>
                                            <td>{booking?.status ? 'Available' : 'Sold'}</td>
                                            <td>

                                                {
                                                    booking?.status && !booking?.paid && <Link
                                                        to={`/dashboard/payment/${booking._id}`}>
                                                        <button
                                                            className='btn btn-xs btn-primary'>Pay</button></Link>
                                                }
                                                {
                                                    !booking?.status && booking?.paid && <button
                                                        className='btn btn-xs btn-primary'>Paid</button>
                                                }
                                                {
                                                    !booking?.status && !booking?.paid && <p
                                                        className='bg-primary text-white'>Item is bought by another buyer</p>
                                                }

                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </>
                        :
                        <> <h1>You haven't order any product yet!</h1></>
                }
            </div>
        </div>
    );
};

export default MyOrders;