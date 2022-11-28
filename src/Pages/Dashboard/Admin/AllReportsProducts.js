import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import Loading from '../../Shared/Loading';
import ModalCommon from '../../Shared/ModalCommon';

const AllReportsProducts = () => {
    const { user } = useContext(AuthContext);
    const [item, setItem] = useState(null);

    const { data: reports = [], refetch, isLoading } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/report`, {
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
            <h3 className="text-3xl mb-5 text-center">All <span className='text-primary font-bold'>Reports</span></h3>
            <div className="overflow-x-auto">
                {
                    reports?.length > 0 ?
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
                                                <label
                                                    htmlFor="deleting-modal"
                                                    onClick={() => setItem(report)}
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
                        <><h1>There is no report to show</h1></>
                }
            </div>
            {
                item &&
                <>
                    <ModalCommon
                        item={item}
                        setItem={setItem}
                        refetch={refetch}
                        api={'report'}
                    ></ModalCommon>
                </>
            }
        </div>
    );
};

export default AllReportsProducts;