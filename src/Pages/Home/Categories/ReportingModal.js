import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const ReportingModal = ({ reportProduct, setReportProduct }) => {
    const { user } = useContext(AuthContext)
    const { _id, title, imageUrl } = reportProduct;

    const handleReport = () => {
        const reportInfo = {
            productId: _id,
            imageUrl,
            title,
            email: user?.email
        }
        fetch(`${process.env.REACT_APP_Server_URL}/report`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reportInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Report Confirmed');
                    setReportProduct(null);
                }
                else {
                    toast.error(data.message);
                    setReportProduct(null);
                }
            })
            .catch(err => {
                console.error(err.message)
                setReportProduct(null);
            });
    }

    return (
        <>
            <input type="checkbox" id="reporting-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="reporting-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='text-center font-semibold text-2xl my-10'>Confirm reporting this product</h1>
                    <br />
                    <div className='flex justify-between w-96 mx-auto'>
                        <input onClick={handleReport} type="submit" value="Confirm" className="btn btn-secondary w-40 input-bordered text-white" />
                        <input onClick={() => { setReportProduct(null) }} type="submit" value="Cancel" className="btn btn-secondary w-40 input-bordered text-white" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportingModal;