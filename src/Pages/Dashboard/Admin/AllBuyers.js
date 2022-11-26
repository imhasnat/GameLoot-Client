import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllBuyers = () => {

    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/role/buyers`);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <h3 className="text-3xl mb-5">All buyers</h3>
            <div className="overflow-x-auto">
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
                                    {
                                        !buyer?.advertise &&
                                        <button
                                            className='btn btn-xs btn-primary'>Verify
                                        </button>
                                    }
                                    <button className='btn btn-xs btn-primary'>Delete</button>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;