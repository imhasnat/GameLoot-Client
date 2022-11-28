import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import Loading from '../../Shared/Loading';
import ModalCommon from '../../Shared/ModalCommon';
import AdvertiseModal from './AdvertiseModal';

const ShowProducts = () => {
    const { user } = useContext(AuthContext);
    const [item, setItem] = useState(null);

    const { data: products = [], refetch, isLoading } = useQuery({
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

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='my-16 px-2 md:px-14'>
            <h3 className="text-center text-3xl mb-5">My <span className='text-primary font-bold'>Product</span> </h3>
            <div className="overflow-x-auto">
                {
                    products.length > 0 ?
                        <>
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
                                                    <label
                                                        htmlFor="advertise-modal"
                                                        onClick={() => setItem(product)}
                                                        className="btn btn-xs btn-primary text-white"
                                                    >Advertise
                                                    </label>
                                                }
                                                {
                                                    product && product.status && product?.advertise &&
                                                    <button
                                                        className='btn btn-xs btn-primary'>Advertised
                                                    </button>
                                                }
                                                <label
                                                    htmlFor="deleting-modal"
                                                    onClick={() => setItem(product)}
                                                    className="btn btn-xs btn-primary ml-1 text-white"
                                                >Delete
                                                </label>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </>
                        :
                        <>There is no product to show</>
                }
            </div>
            {
                item &&
                <ModalCommon
                    item={item}
                    setItem={setItem}
                    refetch={refetch}
                    api={'product'}
                ></ModalCommon>
            }
            {
                item &&
                <AdvertiseModal
                    item={item}
                    setItem={setItem}
                    refetch={refetch}
                ></AdvertiseModal>
            }
        </div>
    );
};

export default ShowProducts;