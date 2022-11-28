import React, { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading';
import Category from './Category';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_Server_URL}/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
    }, [])

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='mt-24'>
            <h1 className='text-4xl font-bold text-center mb-5'>All <span className='text-primary font-bold'>Categories</span></h1>
            <div className='w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center items-center'>
                {
                    categories?.map(category =>
                        <Category
                            key={category._id}
                            category={category}
                        ></Category>)
                }
            </div>
        </div>
    );
};

export default Categories;