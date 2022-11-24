import React, { useEffect, useState } from 'react';
import Category from './Category';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_Server_URL}/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
    }, [])

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
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