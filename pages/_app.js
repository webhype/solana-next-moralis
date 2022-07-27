import '../styles/globals.css'
import {MoralisProvider} from "react-moralis";

function MyApp({ Component, pageProps }) {
	return (
		/*
			appId={process.env.NEXT_PUBLIC_APP_ID}
			serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
		*/
		<MoralisProvider
			appId="LG1i6ubtfvtOS1Or0WImq4yhNuRO5CSgKlWXp7XK"
			serverUrl="https://nfyh8gtvf07i.usemoralis.com:2053/server"
		>
			<Component {...pageProps} />
		</MoralisProvider>
	);
}

export default MyApp
