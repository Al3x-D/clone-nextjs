import React from 'react';
import moment from "moment";
import Currency from 'react-currency-formatter';
import { groupBy, isString } from "lodash";
import path from "path";

const Order = ({ id, amount, amountShipping, items, timestamp, images }) => {

    let groupedImages;

    if (images.every((image) => !image.startsWith("["))) {
        // If it doesn't starts with an "[", then it's not an array, so we should fix this
        /*
            Must be done for retro-compatibility
            as the previous orders in the DB have the "images" formatted in this old way :
                [
                    "https://fakestoreapi.com/img/imageAAA.jpg",
                    "https://fakestoreapi.com/img/imageAAA.jpg",
                    "https://fakestoreapi.com/img/imageBBB.jpg",
                ]
            
            We have to transform them into this structure :
                [
                    "[2, 'imageAAA.jpg']",
                    "[1, 'imageBBB.jpg']",
                ]
        */
        groupedImages = Object.values(
            groupBy(images.map((image) => path.basename(image)))
        ).map((group) => [group.length, group[0]]);
        // console.log(1, groupedImages);
    } else {
        // All clean here, just parse the text value into an array, because it was stringified in the firestore DB ( "[2,'imageA.jpg']"  ->  [2, 'imageA.jpg'] )
        groupedImages = [...images.map((image) => JSON.parse(image))];
        // console.log(2, groupedImages);
    }


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
                  
                    {items.reduce((total, item) => total + item.quantity, 0)}{" "}
                    items
                </p>
                <p className='absolute top-2 right-2 w-40 lf:w-72 truncate text-xs whittespace-nowrap'>
                    ORDER #{id}
                </p>
            </div>
                <div className='p-5 sm:p-10'>
                    <div className='flex space-x-6 overflow-x-auto'>
                      
                        {groupedImages.map((group) => (
                        <div className="relative" key={group[1]}>
                            <img
                                src={`https://fakestoreapi.com/img/${group[1]}`}
                                alt=""
                                className="h-20 object-contain sm:h-32"
                            />
                            {group[0] > 1 && (
                                <div className="absolute bottom-2 right-2 p-1 rounded shadow font-bold bg-yellow-400 text-black text-2xl text-center">
                                    &times; {group[0]}
                                </div>
                            )}
                        </div>
                    ))}
                    </div>
                </div>
        </div>
    );
};

export default Order;