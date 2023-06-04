import { useParams, useLocation } from "react-router-dom";
import { Fragment, useContext, useState, useEffect } from 'react';
import { TransactionContext } from "../../context/transactionsContext";
import FullPostModal from "../posts/fullpostmodal";
import ButtonWithLoader from "../transactions/buttonwithloader";
import UserCard from "./usercard";

const Profile = () => {
    let { index } = useParams();

    const { getUserPosts, getUserByIndex, subscribe, unsubscribe, updateCurrentUser, currentUser } = useContext(TransactionContext);
    let [posts, setPosts] = useState([]);
    let [user, setUser] = useState(null);

    const onClickReload = async () => {
        try {
            await loadingUser(index);
 
            setPosts([]);
            let gotUserPosts = await getUserPosts(index);
            setPosts(gotUserPosts);
        } catch(error) {
            setPosts([]);
        }
    };

    
    let location = useLocation();
    useEffect(() => {
      onClickReload();
    }, [location]);
    

    const loadingUser = async () => {
        try {
            setUser(null);
            let thisUser = await getUserByIndex(index);
            let structuredUser = {
                index: thisUser.index.toString(),
                username: thisUser.username,
                userAddress: thisUser.userAddress,
                subscriptionsIndxs: thisUser.subscriptionsIndxs.map(item => item.toString())};
            setUser(structuredUser);
        } catch (error) {
            setUser(null);
        }
    }

    const handleSubscribeClick = async () => {
        try {
            await subscribe(index);
            await updateCurrentUser();
        }
        catch {
            alert("Ошибка! Скорее всего, вы отменили транзакцию. Беспокоиться не о чем!");
        }
      }
    
    const handleUnsubscribeClick = async () => {
        try {
            await unsubscribe(index);
            await updateCurrentUser();
        }
        catch {
            alert("Ошибка! Скорее всего, вы отменили транзакцию. Беспокоиться не о чем!");
        }
    }

    useEffect(onClickReload, []);

    return (
        <div className="flex flex-wrap justify-evenly items-start">
            <div className="inline-block w-full overflow-hidden rounded-lg bg-white
                px-4 pb-4 text-left shadow-xl m-4">
                <div className="relative flex items-center justify-between mt-4">
                    <div>
                        <h3 className="inline mr-4 text-lg font-medium leading-6 text-gray-900">
                            { user ? <>Profile of @{user.username}</> : "User not found"}
                        </h3>
                        {(currentUser) ? (currentUser.index === index ? 
                          <h3 className="inline text-lg font-medium leading-6 text-gray-900">(your profile)</h3> 
                          : (currentUser.subscriptionsIndxs.includes(index) ? 
                          <ButtonWithLoader text="Unsubscribe" loadingtext="Wait" click={handleUnsubscribeClick}/> 
                          : <ButtonWithLoader text="Subscribe" loadingtext="Wait" click={handleSubscribeClick}/>)) : <Fragment/>}
                    </div>
                    <ButtonWithLoader text="Refresh" loadingtext="Loading" click={onClickReload}/>
                </div>
                
                {user ? 
                <>
                    <div class="mt-3">
                        <p className="block">Username: {user.username}</p>
                        <p className="block my-2">User address: {user.userAddress}</p>
                        <p className="block">User ID: {user.index}</p>
                    </div>
                </>
                : <Fragment/>}
            </div>
            
            {user && user.subscriptionsIndxs.length ?
            <div className="w-full flex flex-wrap justify-evenly items-start">
                <div className="block w-full overflow-hidden rounded-lg bg-white
                px-4 pb-4 text-left shadow-xl m-4">
                        <h3 className="mt-4 block text-lg font-medium leading-6 text-gray-900">
                            This user subscribed on:
                        </h3>
                        {user.subscriptionsIndxs.map(userIndex => <UserCard userIndex={userIndex}/>)}
                </div>
            </div> : <Fragment/>}

            {posts.map((item, i) => 
                <FullPostModal key={i} index={item.index} creatorIndex={item.creatorIndex} 
                text={item.text} commentsIndxs={item.commentsIndxs}/>)}
        </div>
    )
}

export default Profile;