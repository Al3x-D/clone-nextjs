import React from 'react';
import { MinusSmIcon, PlusIcon, StarIcon } from "@heroicons/react/solid";
import Image from "next/image"
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import {
    addToBasket,
    removeFromBasket,
    removeGroupedFromBasket,
} from '../slices/basketSlice';

const CheckoutProduct = ({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
    quantity
}) => {
    const dispatch = useDispatch();
    const total = price * quantity;

    const addItemToBasket = () => {
        const product = {
            id, title, price, rating, description, category, image, hasPrime
        }
        //push item into redux
        // Sending the product via an action to the redux store (= basket "slice")
        dispatch(addToBasket(product))
    }
    const removeItemFromBasket = () => {
        // dispatch submit action removeFromBasket
        //Remove item from redux
        dispatch(removeFromBasket({ id }));   
    };
       
    const removeGroupFromBasket = ()=> {
        dispatch(removeGroupedFromBasket({ id }));
    }
   
    return (
        <div className='block py-4 sm:grid sm:grid-cols-5 my-16 sm:my-3'>
            <Image
                src={image}
                height={200}
                width={200}
                objectFit="contain"
            />
            {/* middle */}
            <div className='col-span-3 mx-5'>
                <p className='my-3'>{title}</p>
                <div className='flex'>
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon
                            key={i}
                            className='h-5 text-yellow-500' 
                        />
                    ))}
                </div>
                <p className='text-xs mt-2 my-2 line-clamp-3'>{description}</p>
                
                {quantity} × <Currency
                    quantity={price}
                    currency="EUR"
                /> ={" "}
                <span className="font-bold">
                    <Currency quantity={total} currency="EUR" />
                </span>
                      
                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        <img
                            loading='lazy'
                            className='w-12'
                            src="https://links.papareact.com/fdw"
                            alt=""
                        />
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}

            </div>
            {/* Right add/remove buttons */}

            {/*  old version

            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button className='button' onClick={addItemToBasket}>Add to Basket</button>
                <button className='button' onClick={removeItemFromBasket}>Remove from Basket</button>
            </div> */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <div className="flex justify-between xs:justify-start">
                    <button
                        className="button sm:p-1"
                        onClick={removeItemFromBasket}>
                        <MinusSmIcon className="h-5 text-black" />
                    </button>
                    <div className="p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap">
                        Quantity: <span className="font-bold">{quantity}</span>
                    </div>
                    <button className="button sm:p-1" onClick={addItemToBasket}>
                        <PlusIcon className="h-5 text-black" />
                    </button>
                </div>
                <button className="button" onClick={removeGroupFromBasket}>
                    Remove from Basket
                </button>
            </div>
        </div >
    );
};

export default CheckoutProduct;