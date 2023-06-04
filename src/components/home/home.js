import FullPostModal from "../posts/fullpostmodal";
import ButtonWithLoader from "../transactions/buttonwithloader";
import { TransactionContext } from "../../context/transactionsContext";
import React, { useEffect, useState, useContext } from "react";

const Home = () => {
    const {getAllPosts} = useContext(TransactionContext);
    let [posts, setPosts] = useState([]);

    const onClickReload = async () => {
        try {
            let gotPosts = await getAllPosts();
            setPosts(gotPosts);
        } catch(error) {
            alert(error);
        }
    }


    useEffect(async () => await onClickReload(), []); 

    return (
        <div className="flex flex-wrap justify-evenly items-start">
            <div className="inline-block w-full overflow-hidden rounded-lg bg-white
                px-4 pb-4 text-left shadow-xl m-4">
                <div className="relative flex items-center justify-between mt-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Home page
                    </h3>
                    <ButtonWithLoader text="Refresh" loadingtext="Loading" click={onClickReload}/>
                </div>
                
                <div className="mt-3">
                    <p>Децентрализованное приложение, использующее технологии Ethereum (блокчейн со смарт-контрактами),
                        ethers js (взаимодействие со смарт-контрактом), Metamask (криптокошелёк, является прослойкой между пользователем и блокчейном),
                        React (фронтенд), Tailwind (для упрощения написания стилей во фронтенде).</p>
                        <p>Смарт-контракт развёрнут в тестовой сети Ethereum (Rinkeby Testnet), все посты которые вы видите ниже, загружены из блокчейна.</p>
                </div>
            </div>
            {posts.map((item, i) => 
                <FullPostModal key={i} index={item.index} creatorIndex={item.creatorIndex} text={item.text} commentsIndxs={item.commentsIndxs}/>)}
        </div>
    )
}

export default Home;