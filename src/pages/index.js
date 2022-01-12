import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Home({ products }) {
  const [filteredProducts, setProducts] = useState(products);

  function filterProducts(searchText) {
    const matchedProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setProducts([...matchedProducts]);
  }

  return (
    <div className='bg-gray-100'>

      <Head>
        <title>Clone-nextjs</title>
      </Head>
      <Header onSearchValue={filterProducts} />
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner  */}
        <Banner />
        {/* Product Feed */}
        {/* <ProductFeed products={products} />  old version */}
        {filteredProducts.length > 0 ? (
          <ProductFeed products={filteredProducts} />
        ) : (
          <h1 className="text-center text-2xl pb-40">
           Product not found
          </h1>
        )}
        <Footer />
      </main>
    </div>
  );
}
// for server side rendering
export async function getServerSideProps(context) {

  //session for authentification
  const session = await getSession(context)

  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: {
      products,      //shorthand from  products:products
      session
    }
  }
  //  console.log('fake store:', products) not working
}


// GET https://fakestoreapi.com/products