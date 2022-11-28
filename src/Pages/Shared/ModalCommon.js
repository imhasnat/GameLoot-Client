import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import Loading from './Loading';

const ModalCommon = ({ item, setItem, refetch, api }) => {
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    const handleDelete = () => {
        const id = item._id;
        setLoading(true);
        fetch(`${process.env.REACT_APP_Server_URL}/${api}/delete/${id}?email=${user?.email}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success('Product Delete Confirmed');
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
            <input type="checkbox" id="deleting-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="deleting-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='text-center font-semibold text-2xl my-10'>Confirm reporting this product</h1>
                    <br />
                    <div className='flex justify-between w-96 mx-auto'>
                        <input onClick={handleDelete} type="submit" value="Yes" className="btn btn-secondary w-40 input-bordered" />
                        <input onClick={() => { setItem(null) }} type="submit" value="No" className="btn btn-secondary w-40 input-bordered" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCommon;