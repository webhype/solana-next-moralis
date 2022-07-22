import '../styles/globals.css'
import {MoralisProvider} from "react-moralis";

function MyApp({ Component, pageProps }) {
	return (
		/*
			appId={process.env.NEXT_PUBLIC_APP_ID}
			serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
		*/
		<MoralisProvider
			appId="vBlcpOPfGZSL0JZnKjTxGjbbDJFzugdObEnbHZ6k"
			serverUrl="https://eq0dfzroki0h.usemoralis.com:2053/server"
		>
			<Component {...pageProps} />
		</MoralisProvider>
	);
}

export default MyApp
