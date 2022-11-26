import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const ShowProducts = () => {
    const { user } = useContext(AuthContext);
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/products?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <h3 className="text-3xl mb-5">My Products</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td><div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={product?.imageUrl} alt={product?.title} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{product?.title}</div>
                                    </div>
                                </div></td>
                                <td>{product?.resprice}</td>
                                <td>

                                    {
                                        product && product.status && !product?.advertise && <Link
                                            to={`/dashboard/payment/${product._id}`}>
                                            <button
                                                className='btn btn-xs btn-primary'>Advertise</button></Link>
                                    }
                                    {
                                        product && !product.status && <button
                                            className='btn btn-xs btn-primary'>Sold</button>
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

export default ShowProducts;