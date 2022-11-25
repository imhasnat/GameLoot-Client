import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import ProductCard from './ProductCard';

const ShowProducts = () => {
    const { user } = useContext(AuthContext);
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/products?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            console.log(data);
            return data;
        }
    })

    return (
        <div>
            {
                products?.map(product =>
                    <ProductCard
                        key={product._id}
                        product={product}
                    >
                    </ProductCard>)
            }
        </div>
    );
};

export default ShowProducts;