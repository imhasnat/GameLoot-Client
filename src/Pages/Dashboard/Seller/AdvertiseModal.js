import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const AdvertiseModal = ({ item, setItem, refetch }) => {
    const { user } = useContext(AuthContext);
    const { _id, title, resprice, status, imageUrl, sellerEmail } = item;

    const handleAdvertise = () => {
        const advertise = { productId: _id, title, resprice, status, imageUrl, sellerEmail }
        fetch(`${process.env.REACT_APP_Server_URL}/product/advertise?email=${user?.email}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(advertise)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Advertise confirmed');
                    refetch();
                    setItem(null);
                }
                else {
                    toast.error(data.message);
                    setItem(null);
                }
            })
            .catch(err => {
                // console.error(err.message);
                toast.error(err.message)
                setItem(null);
            });
    }

    return (
        <div>
            <input type="checkbox" id="advertise-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="advertise-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1>Are You Sure?</h1>
                    <br />
                    <div className='flex justify-between w-96 mx-auto'>
                        <input onClick={handleAdvertise} type="submit" value="Yes" className="btn btn-accent w-40 input-bordered" />
                        <input onClick={() => { setItem(null) }} type="submit" value="No" className="btn btn-accent w-40 input-bordered" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertiseModal;