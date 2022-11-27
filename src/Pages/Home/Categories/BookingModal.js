import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const BookingModal = ({ product, setProduct }) => {
    const { _id, title, resprice, status, imageUrl } = product;
    const { user } = useContext(AuthContext);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const userName = form.name.value;
        const email = form.email.value;
        const productName = form.productName.value;
        const price = form.price.value;
        const mobile = form.mobile.value;
        const location = form.location.value;
        const paid = false;
        const productId = _id;
        // console.log(userName, email, productName, price, mobile, location, paid, productId, status);

        const booking = { userName, email, productName, price, mobile, location, paid, imageUrl, productId, status };

        fetch(`${process.env.REACT_APP_Server_URL}/booking?email=${user.email}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Booking confirmed');
                    setProduct(null);
                }
                else {
                    toast.error(data.message);
                    setProduct(null);
                }
            })
            .catch(err => {
                // console.error(err.message);
                toast.error(err.message)
                setProduct(null);
            });
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled className="input w-full input-bordered " />
                        <input name='email' type="email" defaultValue={user?.email} disabled className="input w-full input-bordered " />
                        <input name='productName' type="text" defaultValue={title} disabled className="input w-full input-bordered " />
                        <input name='price' type="text" defaultValue={resprice} disabled className="input w-full input-bordered " />
                        <input name='mobile' type="text" placeholder="Your Mobile Number" className="input w-full input-bordered " />
                        <input name='location' type="text" placeholder="Meeting Location" className="input w-full input-bordered " />
                        <br />
                        <input type="submit" value="Book" className="btn btn-accent w-full input-bordered" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;