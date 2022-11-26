import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation, useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
    const booking = useLoaderData();
    const { productName, price } = booking
    const navigation = useNavigation();

    if (navigation.state === "loading") {
        return <Loading></Loading>
    }

    return (
        <div>
            <h3 className="text-3xl">Payment for {productName}</h3>
            <p className="text-xl">Please pay <strong>${price}</strong> for your product</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;