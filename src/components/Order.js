import React from 'react';
import moment from "moment";
import Currency from 'react-currency-formatter';

const Order = ({ id, amount, amountShipping, items, timestamp, images }) => {
    return (
        <div className='relative dorder rounded-md'>
            <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
                <div>
                    <p className='font-bold text-xs'>ORDER PLACE</p>
                    <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
                </div>
                <div>
                    <p className='text-xs font-bold'>TOTAL</p>
                    <p>
                        <Currency
                            quantity={amount}
                            currency="EUR"
                        /> -Next Day DElivery{" "}
                        <Currency
                            quantity={amountShipping}
                            currency="EUR"
                        />
                    </p>

                </div>
                <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>
                    {items.length} items
                </p>
                <p className='absolute top-2 right-2 w-40 lf:w-72 truncate text-xs whittespace-nowrap'>
                    ORDER # {id}
                </p>
            </div>
                <div className='p-5 sm:p-10'>
                    <div className='flex space-x-6 overflow-x-auto'>
                        {images.map((image)=>(
                            <img src={image} alt="" className="h-20 object-contain sm:h-32 " />
                        ))}
                    </div>
                </div>
        </div>
    );
};

export default Order;