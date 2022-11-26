import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllReportsProducts = () => {

    const { data: reports = [], refetch } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/report`);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <h3 className="text-3xl mb-5">All reports</h3>
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
                            reports?.map((report, i) => <tr key={report._id}>
                                <th>{i + 1}</th>
                                <td><div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={report?.imageUrl} alt={report?.title} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{report?.title}</div>
                                    </div>
                                </div></td>
                                <td>
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

export default AllReportsProducts;