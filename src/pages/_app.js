import { Provider } from 'react-redux'
import { store } from '../app/store'

import "react-toastify/dist/ReactToastify.css";
import '../styles/globals.css'
import '../styles/styles.css'
//give entire application accsess to NextAuth
import { SessionProvider } from "next-auth/react"
import StorageService from "../services/StorageService";
import { ToastContainer, Zoom } from "react-toastify";
import { hydrate } from "../slices/basketSlice";

store.subscribe(() => {
  StorageService.set("basket", JSON.stringify(store.getState().basket));
});

let basket = StorageService.get("basket");
basket = basket ? JSON.parse(basket) : { items: [] };
store.dispatch(hydrate(basket));

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer transition={Zoom} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
