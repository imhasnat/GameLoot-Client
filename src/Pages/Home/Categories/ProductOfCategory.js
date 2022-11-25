import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductOfCategory = () => {
    const { id } = useParams();
    const { data: categoryProducts = [] } = useQuery({
        queryKey: ['categoryProducts'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/category/${id}`);
            const data = await res.json();
            return data
        }
    })

    return (
        <div>
            <div className='grid grid-cols-3 gap-3'>
                {
                    categoryProducts?.map(product =>
                        <ProductCard
                            key={product._id}
                            product={product}
                        >
                        </ProductCard>)
                }
            </div>
        </div>
    );
};

export default ProductOfCategory;