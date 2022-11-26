import React from 'react';
import toast from 'react-hot-toast';

const ReportingModal = ({ reportProduct, setReportProduct }) => {
    const { _id, title, orgprice, status, imageUrl } = reportProduct;

    const handleReport = () => {
        const reportInfo = {
            productId: _id,
            imageUrl,
            title,
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
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Report Confirmed');
                    setReportProduct(null);
                }
                else {
                    toast.error(data.message);
                }
            })
            .catch(err => console.error(err.message));
    }

    return (
        <>
            <input type="checkbox" id="reporting-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="reporting-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1>Confirm reporting this product</h1>
                    <br />
                    <div className='flex justify-between w-96 mx-auto'>
                        <input onClick={handleReport} type="submit" value="Report" className="btn btn-accent w-40 input-bordered" />
                        <input onClick={() => { setReportProduct(null) }} type="submit" value="Cancel" className="btn btn-accent w-40 input-bordered" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportingModal;