import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading';
import ModalCommon from '../../Shared/ModalCommon';
import VerifyModal from './VerifyModal';

const AllSellers = () => {
    const [item, setItem] = useState(null);

    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/role/sellers`);
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='my-16 px-2 md:px-14'>
            <h3 className="text-3xl mb-5 text-center">All <span className='text-primary font-bold'>Sellers</span></h3>
            <div className="overflow-x-auto">
                {
                    sellers?.length > 0 ?
                        <>
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sellers?.map((seller, i) => <tr key={seller._id}>
                                            <th>{i + 1}</th>
                                            <td><div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={seller?.img} alt={seller?.title} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{seller?.name}</div>
                                                </div>
                                            </div></td>
                                            <td>
                                                {
                                                    !seller?.verified &&
                                                    // <button
                                                    //     className='btn btn-xs btn-primary'>Verify
                                                    // </button>
                                                    <label
                                                        htmlFor="verify-modal"
                                                        onClick={() => setItem(seller)}
                                                        className="btn btn-xs btn-primary text-white"
                                                    >Verify
                                                    </label>
                                                }
                                                {
                                                    seller?.verified &&
                                                    <button
                                                        className='btn btn-xs btn-primary'>Verified
                                                    </button>
                                                }
                                                <label
                                                    htmlFor="deleting-modal"
                                                    onClick={() => setItem(seller)}
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
                        <>
                            <h1>There is no seller</h1>
                        </>
                }
            </div>
            {
                item &&
                <ModalCommon
                    item={item}
                    setItem={setItem}
                    refetch={refetch}
                    api={'seller'}
                ></ModalCommon>
            }
            {
                item &&
                <VerifyModal
                    item={item}
                    setItem={setItem}
                    refetch={refetch}
                ></VerifyModal>
            }
        </div>
    );
};

export default AllSellers;