import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const BookingModal = ({ product, setProduct }) => {
    const { title, orgprice } = product
    const { user } = useContext(AuthContext)
    const handleBooking = event => {
        event.preventDefault();
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
                        <input name='price' type="text" defaultValue={orgprice} disabled className="input w-full input-bordered " />
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