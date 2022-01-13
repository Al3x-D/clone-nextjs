import React from 'react';
import Header from '../components/Header'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/basketSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import Currency from 'react-currency-formatter';
import { useSession } from "next-auth/react"
//////
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { groupBy } from "lodash";
//////
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios';
import stripe from 'stripe';
const stripePromise = loadStripe(process.env.stripe_public_key)

//page for Basket
const Checkout = () => {
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const { data: session } = useSession();

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        // call the backend to create a checkout session
        const checkoutSession = await axios.post('/api/create-checkout-session',
            {
                items: items,  // should write   items
                email: session.user.email
            }
        );

        //redirect user/customer to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })
        // cos one line we can scip curly brackets.
        if (result.error) alert(result.error.message);

    }
    
    const groupedItems = Object.values(groupBy(items, "id"));
    
    return (
        <div className='bg-gray-100'>
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto'>
                {/* left */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit='contain'
                    />

                    <div className='flex flex-col p-5 space-y-50 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0 ? 'Your Amazon Basket is empty.' : "Shopping Basket"}
                        </h1>

                        {/* {items.map((item, i) => ( //old version(change item to group )        */}
                        {/* //// */}
                        <TransitionGroup>
                            {groupedItems.map((group, i) => (
                                <CSSTransition
                                    key={group[0].image}
                                    timeout={500}
                                    classNames="item">
                                    {/* //// */}
                                    <CheckoutProduct
                                        key={i}
                                        id={group[0].id}
                                        title={group[0].title}
                                        rating={group[0].rating}
                                        price={group[0].price}
                                        description={group[0].description}
                                        category={group.category}
                                        image={group[0].image}
                                        hasPrime={group[0].hasPrime}
                                        quantity={group.length}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </div>
                </div>

                {/* right */}

                <CSSTransition
                    in={items.length > 0}
                    timeout={300}
                    classNames="disappear"
                    unmountOnExit
                >


                    <div className='flex flex-col bg-white p-10 shadow-md'>
                        {/* {items.length > 0 && (
                        <> */}
                        <h2 className='whitespace-nowrap'>
                            Subtotal ({items.length} items):{" "}
                            <span className='font-bold'>
                                <Currency
                                    quantity={total}
                                    currency="EUR"
                                />
                            </span>
                        </h2>
                        <button
                            role="link"
                            onClick={createCheckoutSession}
                            disabled={!session}
                            className={`button mt-2 my-6 ${!session &&
                                'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                                } `}>
                            {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                        </button>
                        {/* </>
                    )} */}

                    </div>
                </CSSTransition>

            </main>
        </div>
    );
};

export default Checkout;