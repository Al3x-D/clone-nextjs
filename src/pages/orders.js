import React from 'react';
import Header from '../components/Header';
import { useSession, getSession } from "next-auth/react"
import { db } from "../../firebase";
import moment from "moment";
import Order from '../components/Order';

const Orders = ({ orders }) => {
    const { data: session } = useSession();
    // console.log(orders)
    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>
            </main>
            {session ? (
                <h2> {orders.length} Orders</h2>
            ) : (<h2>Please sign in to see your orders</h2>)}
            <div className='mt-5 space-y-4'>
                {/* order? means if it undefine (whathever reason) */}
                {orders?.map(({ id, amount, amountShipping, items, timestamp, images }) => (
                    <Order
                        key={id}
                        id={id}
                        amount={amount}
                        amountShipping={amountShipping}
                        items={items}
                        timestamp={timestamp}
                        images={images}
                    />
                ))}
            </div>
        </div>
    );
};


export default Orders;

//  server side rendering

// Tells nextJS that's no longer a static page
// eg "Please calculate smthg and send it to the user next"
// Here, it's executed by Node.js

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    //  get the users logged in credentials
    const session = await getSession(context);
    if (!session) {
        return {
            props: {

            }
        }
    }

    //  firebase db

    const stripeOrders = await db.collection('users').doc(session.user.email).collection('orders').orderBy('timestamp', 'desc').get();

    //Stripe orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async(order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    );
    return {
        props: {
            orders
        }
    }
}