import type { AppProps } from 'next/app';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
	const clientID = process.env.NEXT_PUBLIC_CLIENT_ID;
  return (
  	<PayPalScriptProvider options= {{"client-id": clientID}}>
			<Component {...pageProps} />;
  	</PayPalScriptProvider>
  )
}

export default MyApp;
