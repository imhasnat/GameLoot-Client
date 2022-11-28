import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import Loading from '../../Shared/Loading';
import ModalCommon from '../../Shared/ModalCommon';

const AllBuyers = () => {
    const { user } = useContext(AuthContext);
    const [item, setItem] = useState(null);

    const { data: buyers = [], refetch, isLoading } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/role/buyers?email=${user?.email}`, {
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
            <h3 className="text-3xl mb-5 text-center">All <span className='text-primary font-bold'>Buyers</span></h3>
            <div className="overflow-x-auto">
                {
                    buyers?.length > 0 ?
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
                                        buyers?.map((buyer, i) => <tr key={buyer._id}>
                                            <th>{i + 1}</th>
                                            <td><div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={buyer?.img} alt={buyer?.name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{buyer?.name}</div>
                                                </div>
                                            </div></td>
                                            <td>
                                                <label
                                                    htmlFor="deleting-modal"
                                                    onClick={() => setItem(buyer)}
                                                    className="btn btn-xs btn-primary text-white"
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
                            <h1>There is no buyers</h1>
                        </>
                }
            </div>
            {
                item &&
                <>
                    <ModalCommon
                        item={item}
                        setItem={setItem}
                        refetch={refetch}
                        api={'buyer'}
                    ></ModalCommon>
                </>
            }
        </div>
    );
};

export default AllBuyers;