import React, { useState } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { addToBasket } from '../slices/basketSlice';
//should use redux devtools (like reactdevtools ) for shov proces

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({ id, title, price, description, category, image }) => {
    //useDispatch - hook from redux 
    const dispatch = useDispatch();
    const [rating] = useState(
        //randomise rating
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    //for boolean value (true or false if rand < 0.5 has primeDelivery if > no delivery)
    const [hasPrime] = useState(Math.random() < 0.5);
    
    const addItemToBasket = () => {
        
        const product ={ id, title, price, rating, description, category, image, hasPrime };
        //sending the product as an action to the REDUX store ... the bascet slice
        dispatch(addToBasket(product))
        // console.log(product)
        toast.success(
            <>
                <span className="font-bold">Added to basket!</span>
                <br />
                {product.title.slice(0, 30)}
                {product.title.length > 30 ? "…" : ""}
            </>,
            {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                draggablePercent: 20,
                progress: undefined,
            }
        );
    } 
    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10 growing-hover'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
            <Image
                src={image}
                height={200}
                width={200}
                objectFit="contain"
            />

            <h4 className='my-3'>{title}</h4>

            <div className='flex '>
                {Array(rating).fill().map((_, i) => (
                    <StarIcon className='h-5 text-yellow-500' />
                ))}
            </div>
            <p className='text-xs my-2 line-clamp-2'>{description}</p>
            <div className='mb-5'>
                <Currency
                    quantity={price}
                    currency="EUR"
                />
            </div>
            {hasPrime &&(
                <div className=' flex items-center space-x-2 -mt-5'>
                    <img className='w-12' src="https://links.papareact.com/fdw" alt="" />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>  
            )}

            <button onClick={addItemToBasket} className='mt-auto button'>Add to Bascet</button>

        </div>

    );
};

export default Product;