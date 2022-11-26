import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const { data: bookings = [] } = useQuery({
        queryKey: ['booking'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/booking?email=${user.email}`);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <h3 className="text-3xl mb-5">My Orders</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
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
                                <td>
                                    {
                                        booking && !booking?.paid && <Link
                                            to={`/dashboard/payment/${booking._id}`}>
                                            <button
                                                className='btn btn-xs btn-primary'>Pay</button></Link>
                                    }
                                    {
                                        booking && booking?.paid && <button
                                            className='btn btn-xs btn-primary'>Paid</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;