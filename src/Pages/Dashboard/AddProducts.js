import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const AddProducts = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_Server_URL}/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
    }, [])

    const handleAddProduct = data => {
        console.log(data);

        const category_id = data.category;
        const condition = data.condition;
        const description = data.description;
        const location = data.location;
        const mobile = data.mobile;
        const orgprice = data.orgprice;
        const productImage = data.productImage[0];
        const resprice = data.resprice;
        const title = data.title;
        const useYear = data.useYear;
        const puryear = data.year;
        const advertise = 'no';
        const status = 'available';
        const sellerName = user?.displayName;
        const sellerEmail = user?.email;

        const formData = new FormData();
        formData.append('image', productImage);

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(async imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const imageUrl = imgData.data.url;
                    const productInfo = {
                        sellerName,
                        sellerEmail,
                        category_id,
                        title,
                        condition,
                        description,
                        location,
                        mobile,
                        orgprice,
                        resprice,
                        useYear,
                        puryear,
                        imageUrl,
                        advertise,
                        status
                    }
                    try {
                        const res = await fetch(`${process.env.REACT_APP_Server_URL}/addproduct`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(productInfo)
                        });
                        const data = await res.json();
                        console.log(data);
                        if (data.acknowledged) {
                            toast.success('Product Added Successfully');
                        }
                    }
                    catch (err) {
                        console.log(err.message);
                    }

                }
            })
            .catch(err => console.log(err))

    }

    return (
        <div>
            <div className='my-36'>
                <div className='h-[800px] flex justify-center items-center'>
                    <div className='w-96 p-7 rounded-lg bg-white m-3'>
                        <h2 className='text-xl text-center'>Add your product</h2>
                        <form onSubmit={handleSubmit(handleAddProduct)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Product title</span></label>
                                <input
                                    {...register("title")}
                                    type="text"
                                    className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Product Conditon</span></label>
                                <select
                                    {...register("condition")}
                                    className="select select-bordered">
                                    <option value={'Excellent'}>Excellent</option>
                                    <option value={'Good'}>Good</option>
                                    <option value={'Fair'}>Fair</option>
                                </select>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"><span className="label-text">Product Category</span></label>
                                <select
                                    {...register("category")}
                                    className="select select-bordered">
                                    <option value="">--- Select ---</option>
                                    {
                                        categories.map((category, index) =>
                                            <option
                                                key={index} value={category._id}>{category.category_name}
                                            </option>)
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Location</span></label>
                                <input
                                    {...register("location")}
                                    type="text"
                                    className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div className='flex justify-between'>
                                <div className="form-control w-40 max-w-xs">
                                    <label className="label"> <span className="label-text">Original Price</span></label>
                                    <input
                                        {...register("orgprice")}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />
                                </div>
                                <div className="form-control w-40 max-w-xs">
                                    <label className="label"> <span className="label-text">Resale Price</span></label>
                                    <input
                                        {...register("resprice")}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />
                                </div>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Mobile</span></label>
                                <input
                                    {...register("mobile")}
                                    type="text"
                                    className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div className='flex justify-between'>
                                <div className="form-control w-40 max-w-xs">
                                    <label className="label"> <span className="label-text">Purchase Year</span></label>
                                    <input
                                        {...register("year")}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />
                                </div>
                                <div className="form-control w-40 max-w-xs">
                                    <label className="label"> <span className="label-text">Year of Use</span></label>
                                    <input
                                        {...register("useYear")}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs" />
                                </div>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Product Description</span></label>
                                <textarea
                                    {...register("description")}
                                    type="text"
                                    className="textarea textarea-bordered"
                                ></textarea>
                            </div>
                            <div className="form-control w-full max-w-xs mb-4">
                                <label className="label"><span className="label-text">Product Image</span></label>
                                <input
                                    {...register("productImage", { required: 'image is required' })}
                                    required
                                    type='file'
                                    id='productImage'
                                    name='productImage'
                                    accept='image/*'
                                    className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                                />
                            </div>
                            <input className='btn text-white transform bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 w-full' value="Add product" type="submit" />
                            <div>
                                {/* {signupError && <p className='text-red-600'>{signupError}</p>} */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;