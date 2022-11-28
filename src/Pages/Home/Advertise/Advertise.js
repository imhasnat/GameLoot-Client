import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Advertise = () => {

    const { data: advertises = [] } = useQuery({
        queryKey: ['advertises'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/product/advertise`)
            const data = await res.json();
            // console.log(data);
            return data;
        }
    })

    return (
        <div className={`${advertises.length ? 'block' : 'hidden'}`}>
            <h1>advertise</h1>
            {
                advertises.map(advertise =>
                    <p>{advertise.title}</p>)
            }
        </div>
    );
};

export default Advertise;