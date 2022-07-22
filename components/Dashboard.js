import {useEffect, useState} from "react";
import {useMoralisSolanaApi} from "react-moralis";

export default function Dashboard({logout, user}) {

	let walletAddress = user.get("solAddress");
	const SolanaAPI = useMoralisSolanaApi();

	let [solanaBalance, setSolanaBalance] = useState("");
	let [splBalance, setSplBalance] = useState([{}]);
	let [nftsBalance, setNftsBalance] = useState([{}]);
	let [isLoading, setIsLoading] = useState(true);

	let [nftAddress, setNftAddress] = useState();
	let [nftName, setNftName] = useState();
	let [nftImage, setNftImage] = useState();

	solanaBalance = Number(solanaBalance);
	const network = "mainnet";

	useEffect(() => {
		const fetchData = async () => {
			try {
				let result = await SolanaAPI.account.balance({
					network,
					address: walletAddress,
				});
				console.log(result);
				setSolanaBalance(result.solana);
			} catch (err) {
				console.log(err);
			}
			try {
				let result = await SolanaAPI.account.getSPL({
					network,
					address: walletAddress,
				});
				setSplBalance(result);
			} catch (err) {
				console.log(err);
			}
			try {
				let result = await SolanaAPI.account.getNFTs({
					network,
					address: walletAddress,
				});
				setNftsBalance(result);
			} catch (err) {
				console.log(err);
			}
			try {
				for (let nft of nftsBalance) {
					console.log(nft);
					const nftResult = await SolanaAPI.nft.getNFTMetadata({
						network,
						address: nft.mint,
					});
					console.log(nftResult);
				}
			} catch (err) {
				console.log(err);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

    return(
        <div className="w-screen h-screen flex flex-col items-center justify-center py-10 px-4 bg-black overflow-auto">
            <button onClick={logout} className="text-white self-end">logout</button>
            <p className="text-white font-bold text-xl md:text-3xl">wallet address</p>
            <p className="text-white mt-2 mb-8 text-[0.6rem] md:text-lg">{walletAddress}</p>
            <div className="w-full h-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="bg-pink rounded-2xl drop-shadow-md px-2 py-2 md:px-4 md:py-4 md:text-lg">
                    <p className="text-2xl md:text-4xl">solana balance</p>
                    {!isLoading && <p className="mt-4 md:mt-10 text-3xl md:text-6xl">{solanaBalance.toFixed(4)}<span> SOL</span></p>}
                </div>
                <div className="bg-green rounded-2xl drop-shadow-md px-2 py-2 md:px-4 md:py-4 md:text-lg">
                    <p className="text-2xl md:text-4xl">spl tokens {splBalance.length}</p>
                    {!isLoading && <ul className="list-disc ml-8 mt-4 md:mt-10 text-md md:text-lg">
						{splBalance.length > 0 && splBalance.map((spl, i) => {
							<li key={i}>{spl.mint?.slice(0, 12)}… {spl.amount}</li>
						})}
                    </ul>}
                </div>
                <div className="bg-cyan md:col-span-2 rounded-2xl drop-shadow-md px-2 py-2 md:px-4 md:py-4 md:text-lg">
                    <p className="text-2xl md:text-4xl">nfts {!isLoading ? nftsBalance.length : ""}</p>
                    {!isLoading && <ul className="list-disc px-4 mt-4 md:mt-10 text-md md:text-lg">
                    	{nftsBalance.length > 0 && nftsBalance.map((nft, i) => (
							<li className="text-ellipsis overflow-hidden" key={i}>{nft.mint}</li>
						))}
                    </ul>}
                </div>
            </div>
        </div>
    )
}