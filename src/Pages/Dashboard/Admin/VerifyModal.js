import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import Loading from '../../Shared/Loading';

const VerifyModal = ({ item, setItem, refetch }) => {
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    console.log(item._id, item.email);

    const handleSellerVerifyBadge = () => {
        const id = item._id;
        const info = {
            verified: true,
            email: item.email
        }
        setLoading(true);
        fetch(`${process.env.REACT_APP_Server_URL}/seller/verify/${id}?email=${user?.email}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Seller Verified');
                    refetch();
                    setLoading(false);
                    setItem(null);
                }
                else {
                    setLoading(false);
                    toast.error(data.message);
                    setItem(null);
                }
            })
            .catch(err => {
                setLoading(false);
                toast.error(err.message);
                setItem(null);
            });
    }

    if (loading) {
        <Loading></Loading>
    }

    return (
        <div>
            <input type="checkbox" id="verify-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="verify-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='text-center font-semibold text-2xl my-10'>Are you sure</h1>
                    <br />
                    <div className='flex justify-between w-96 mx-auto'>
                        <input onClick={handleSellerVerifyBadge} type="submit" value="Yes" className="btn btn-secondary w-40 input-bordered" />
                        <input onClick={() => { setItem(null) }} type="submit" value="No" className="btn btn-secondary w-40 input-bordered" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyModal;