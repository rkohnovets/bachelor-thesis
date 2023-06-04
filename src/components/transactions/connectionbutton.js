import { useContext } from "react";
import { TransactionContext } from '../../context/transactionsContext';
import ButtonWithLoader from "./buttonwithloader";

const ConnectionButton = () => {
    const { connectWallet, updateCurrentUser, isConnected, checkForWalletInBrowser } = useContext(TransactionContext);
    
    const handleClick = async () => {
        if(!checkForWalletInBrowser()) return;

        await connectWallet();
        await updateCurrentUser();
    }

    return ( <>
        {isConnected ? 
            <button className ='block text-gray-100 hover:bg-purple-800 hover:text-white active:bg-purple-900
            px-3 py-2 rounded-md text-sm font-medium text-center bg-purple-700'
            onClick={handleClick}>Connected</button>
        : <ButtonWithLoader text="Connect" loadingtext="Connecting" click={handleClick}
        textTailwind="text-white rounded-md" bgTailwind="hover:bg-purple-800 bg-purple-700 active:bg-purple-900"/>}
    </>);
}
export default ConnectionButton;


