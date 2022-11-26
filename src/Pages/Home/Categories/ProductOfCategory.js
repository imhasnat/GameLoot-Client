import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingModal from './BookingModal';
import ProductCard from './ProductCard';
import ReportingModal from './ReportingModal';

const ProductOfCategory = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reportProduct, setReportProduct] = useState(null);

    const { data: categoryProducts = [] } = useQuery({
        queryKey: ['categoryProducts'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/products/${id}`);
            const data = await res.json();
            return data
        }
    })

    return (
        <div>
            <div className='grid grid-cols-3 gap-3'>
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