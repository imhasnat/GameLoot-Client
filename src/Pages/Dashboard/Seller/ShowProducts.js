import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const ShowProducts = () => {
    const { user } = useContext(AuthContext);
    const [item, setItem] = useState(null);

    const { data: products = [], refetch } = useQuery({
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

    const handleDelete = () => {
        const id = item._id;
        fetch(`${process.env.REACT_APP_Server_URL}/products/delete/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success('Product Delete Confirmed');
                    refetch();
                    setItem(null);
                }
                else {
                    toast.error(data.message);
                }
            })
            .catch(err => {
                toast.error(err.message);
                setItem(null);
            });
    }

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
                            <th>Status</th>
                            <th className='text-center w-44'>Action</th>
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
                                        product && !product.status ?
                                            <p>Sold</p>
                                            :
                                            <p>Available</p>
                                    }
                                </td>
                                <td>
                                    {
                                        product && product.status && !product?.advertise &&
                                        <button
                                            className='btn btn-xs btn-primary'>Advertise
                                        </button>
                                    }
                                    <label
                                        htmlFor="deleting-modal"
                                        onClick={() => setItem(product)}
                                        className="btn btn-xs btn-primary text-white"
                                    >Delete
                                    </label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                item &&
                <>
                    <input type="checkbox" id="deleting-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="deleting-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h1>Confirm Delete this product</h1>
                            <br />
                            <div className='flex justify-between w-96 mx-auto'>
                                <input onClick={handleDelete} type="submit" value="Confirm" className="btn btn-accent w-40 input-bordered" />
                                <input onClick={() => { setItem(null) }} type="submit" value="Cancel" className="btn btn-accent w-40 input-bordered" />
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ShowProducts;