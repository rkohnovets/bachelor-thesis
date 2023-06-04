import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const checkForWalletInBrowser = () => {
        if (!ethereum) 
            alert("У вас не установлен Metamask, без него приложение не заработает");
        return ethereum ? true : false;
    }

    const getAllPosts = async () => {
        if(!checkForWalletInBrowser()) return [];
        
        const transactionsContract = createEthereumContract();

        let posts = await transactionsContract.getAllPosts();
        const structuredPosts = structurePosts(posts);

        return structuredPosts;
    };

    const getUserPosts = async (userIndex) => {
        if(!checkForWalletInBrowser()) return [];
        
        const transactionsContract = createEthereumContract();

        let posts = await transactionsContract.getUserPosts(userIndex);
        const structuredPosts = structurePosts(posts);

        return structuredPosts;
    };

    const structurePosts = (posts) => {
        const structuredPosts = posts.map((item) => ({
            index: item.index.toString(),
            creatorIndex: item.creatorIndex.toString(),
            text: item.text,
            commentsIndxs: item.commentsIndxs.map(i => i.toString())
        }));
        return structuredPosts;
    }

    const getCallerUser = async () => {
        if(!checkForWalletInBrowser()) return null;
        
        const transactionsContract = createEthereumContract();

        let user = await transactionsContract.getCallerUser();
        let structuredUser = structureUser(user);

        return structuredUser;
    };

    const getUserByIndex = async (userIndex) => {
        if(!checkForWalletInBrowser()) return null;
        
        const transactionsContract = createEthereumContract();

        let user = await transactionsContract.getUserByIndex(userIndex);
        let structuredUser = structureUser(user);

        return structuredUser;
    };

    const findUserByAddress = async (userAddress) => {
        if(!checkForWalletInBrowser()) return null;
        
        const transactionsContract = createEthereumContract();

        let user = await transactionsContract.findUserByAddress(userAddress);
        let structuredUser = structureUser(user);

        return structuredUser;
    };

    const findUserByUsername = async (username) => {
        if(!checkForWalletInBrowser()) return null;
        
        const transactionsContract = createEthereumContract();

        let user = await transactionsContract.findUserByUsername(username);
        let structuredUser = structureUser(user);

        return structuredUser;
    };

    const findUser = async (input) => {
        let result = [];
        try {
            let user = await findUserByUsername(input);
            let structuredUser = structureUser(user);
            result.push(structuredUser);
        } catch { }
        try {
            let user = await findUserByAddress(input);
            let structuredUser = structureUser(user);
            result.push(structuredUser);
        } catch { }
        return result;
    }

    const getCommentsOnPost = async (index) => {
        if(!checkForWalletInBrowser()) return [];

        const transactionsContract = createEthereumContract();

        let coments = await transactionsContract.getCommentsOnPost(index);

        const structuredComments = coments.map((item) => ({
            creatorIndex: item.creatorIndex.toString(),
            text: item.text
        }));

        return structuredComments;
    };

    const subscribe = async (userIndex) => {
        if(!checkForWalletInBrowser()) return;

        const transactionsContract = createEthereumContract();

        const transactionHash = await transactionsContract.subscribe(userIndex);

        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
    };

    const unsubscribe = async (userIndex) => {
        if(!checkForWalletInBrowser()) return;

        const transactionsContract = createEthereumContract();

        const transactionHash = await transactionsContract.unsubscribe(userIndex);

        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
    };

    const getUsernameByIndex = async (index) => {
        if(!checkForWalletInBrowser()) return;

        const transactionsContract = createEthereumContract(); 
        let username = await transactionsContract.getUsernameByIndex(index);

        return username;
    };

    const connectWallet = async () => {
        if(!checkForWalletInBrowser()) return;
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x4' }]});

            await ethereum.request({ method: "eth_requestAccounts", });
            
            setIsConnected(true);
        } catch (error) {
            setIsConnected(false);
        }
    };

    const updateCurrentUser = async () => {
        if(!checkForWalletInBrowser()) return;

        try {
            let thisUser = await getCallerUser();
            let structuredUser = structureUser(thisUser);
            setCurrentUser(structuredUser);
        } catch {
            setCurrentUser(null);
        }
    }

    const createPost = async (text) => {
        if(!checkForWalletInBrowser()) return;

        const transactionsContract = createEthereumContract();

        const transactionHash = await transactionsContract.createPost(text);

        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
    };

    const register = async (username) => {
        if(!checkForWalletInBrowser()) return;

        const transactionsContract = createEthereumContract();

        const transactionHash = await transactionsContract.register(username);

        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
    };

    const usernameIsFree = async (username) => {
        if(!checkForWalletInBrowser()) return;

        const transactionsContract = createEthereumContract();
        let result = await transactionsContract.usernameIsFree(username);

        return result;
    }

    const usernameIsCorrect = async (username) => {
        if(!checkForWalletInBrowser()) return;

        const transactionsContract = createEthereumContract();
        let result = await transactionsContract.usernameIsCorrect(username);

        return result;
    }

    const comment = async (postIndex, text) => {
        if(!checkForWalletInBrowser()) return;

        const transactionsContract = createEthereumContract();

        const transactionHash = await transactionsContract.comment(postIndex ,text);

        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
    };

    const structureUser = (user) => {
        let structuredUser = {
            index: user.index.toString(),
            username: user.username,
            userAddress: user.userAddress,
            subscriptionsIndxs: user.subscriptionsIndxs.map(item => item.toString()),
            postsIndxs: user.postsIndxs.map(item => item.toString())
        };
        return structuredUser;
    };

    //срабатывает при запуске страницы
    useEffect(async () => {
        if(!checkForWalletInBrowser()) return;
        
        await connectWallet();
        await updateCurrentUser();

        try {
            ethereum.on("accountsChanged", async () => await updateCurrentUser());
            ethereum.on("chainChanged", async () => await connectWallet());
        } catch { }
    }, []);

    return (
        <TransactionContext.Provider
        value={{
            checkForWalletInBrowser,
            connectWallet,
            updateCurrentUser,
            getAllPosts,
            getUserPosts,
            getUsernameByIndex,
            getCommentsOnPost,
            getCallerUser,
            getUserByIndex,
            subscribe,
            unsubscribe,
            createPost,
            comment,
            findUser,
            register,
            usernameIsFree,
            usernameIsCorrect,
            isConnected,
            currentUser
        }}>
        {children}
        </TransactionContext.Provider>
    );
};