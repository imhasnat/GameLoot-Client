import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading';
import BookingModal from './BookingModal';
import ProductCard from './ProductCard';
import ReportingModal from './ReportingModal';

const ProductOfCategory = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reportProduct, setReportProduct] = useState(null);

    const { data: categoryProducts = [], isLoading } = useQuery({
        queryKey: ['categoryProducts'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/products/${id}`);
            const data = await res.json();
            return data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='my-24'>
            <div className='w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center items-center'>
                {
                    categoryProducts.length > 0 ?
                        <>
                            {
                                categoryProducts?.map(product =>
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        setProduct={setProduct}
                                        setReportProduct={setReportProduct}
                                    >
                                    </ProductCard>)
                            }
                        </>
                        :
                        <>
                            <h1>There is no product added yet!</h1>
                        </>
                }
            </div>
            <div>
                {
                    product &&
                    <BookingModal
                        product={product}
                        setProduct={setProduct}
                    ></BookingModal>
                }
            </div>
            <div>
                {
                    reportProduct &&
                    <ReportingModal
                        reportProduct={reportProduct}
                        setReportProduct={setReportProduct}
                    ></ReportingModal>
                }
            </div>
        </div>
    );
};

export default ProductOfCategory;