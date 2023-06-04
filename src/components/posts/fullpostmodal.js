import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TransactionContext } from '../../context/transactionsContext';
import ButtonWithLoader from '../transactions/buttonwithloader';
import Comment from './comment';

const FullPostModal = (props) => {
  const {getUsernameByIndex, getCommentsOnPost, comment, subscribe, unsubscribe, currentUser, updateCurrentUser} = useContext(TransactionContext);

  let [isOpen, setIsOpen] = useState(false);
  let [comments, setComments] = useState([]);
  const closeModal = () => {
    setIsOpen(false);
    setComments([]);
  };
  
  const openModal = async () => {
    setComments(await getCommentsOnPost(props.index));
    setIsOpen(true);
  }

  let [username, setUsername] = useState(null);
  const loadingUsername = async () => {
    setUsername(await getUsernameByIndex(props.creatorIndex));
  }

  //name это то что введено в поле ввода комментария)))
  let name = null;
  const setName = (e) => name = e.value;

  const handleSubmitClick = async () => {
    try {
      if(!name || name.length == 0)
        throw new Error("");
      await comment(props.index, name);
      setComments(await getCommentsOnPost(props.index));
    }
    catch {
      alert("Ошибка! Скорее всего, вы отменили транзакцию или ничего не ввели в комментарий");
    }
  }

  const handleSubscribeClick = async () => {
    try {
      let creatorIndex = props.creatorIndex;

      await subscribe(creatorIndex);
      await updateCurrentUser();
    }
    catch {
      alert("Ошибка! Скорее всего, вы отменили транзакцию.");
    }
  }

  const handleUnsubscribeClick = async () => {
    try {
      let creatorIndex = props.creatorIndex;

      await unsubscribe(creatorIndex);
      await updateCurrentUser();
    }
    catch {
      alert("Ошибка! Скорее всего, вы отменили транзакцию.");
    }
  }

  useEffect(async () => await loadingUsername(), []);

  return (
    <>
        <div className="inline-block lg:w-5/12 overflow-hidden rounded-lg bg-white
            p-4 text-left shadow-xl transition-all m-4 hover:bg-gray-200 active:bg-gray-300" onClick={openModal}>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
            Post from @{username ?  username : "loading..."}
            </h3>
            <div className="mt-3">
                <p>{props.text}</p>
            </div>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95">
                    <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-xl bg-white 
                    p-4 text-left align-middle shadow-xl transition-all">
                    <div className="relative flex items-center justify-between">
                      <div>
                        <h3 className="inline mr-4 text-lg font-medium leading-6 text-gray-900">
                          Post from @
                          <Link className="focus:outline-none" to={"/profile/" + props.creatorIndex}>
                            <h3 className="focus:outline-none hover:underline inline text-lg font-medium leading-6 text-gray-900">
                            {username ? username : "loading..."}
                            </h3>
                          </Link> 
                        </h3>
                        {currentUser ? (currentUser.index == props.creatorIndex ? 
                          <h3 className="inline mr-4 text-lg font-medium leading-6 text-gray-900">(you)</h3> 
                          : (currentUser.subscriptionsIndxs.includes(props.creatorIndex) ? 
                          <ButtonWithLoader text="Unsubscribe" loadingtext="Wait" click={handleUnsubscribeClick}/> 
                          : <ButtonWithLoader text="Subscribe" loadingtext="Wait" click={handleSubscribeClick}/>)) : <Fragment/>}
                      </div>
                      <Cross click={closeModal}/>
                    </div>

                    <div class="mt-3">
                      <p>{props.text}</p>
                    </div>
                    
                    { currentUser ?
                    <div class="flex justify-center mt-3">
                      <textarea class="resize-none form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
                        bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-md transition 
                        ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        rows="2" maxLength="500" placeholder="Your comment" onChange={(e) => setName(e.target)}/>
                      <ButtonWithLoader text="Comment" loadingtext="Wait" click={handleSubmitClick}
                      textTailwind="text-white rounded-r-md" bgTailwind="hover:bg-red-600 bg-red-500 active:bg-red-700"/>
                    </div>
                    : <Fragment/> }
                    {comments.map(item => <Comment creatorIndex={item.creatorIndex} text={item.text}/>)}
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default FullPostModal;

const Cross = (props) => {
  return(
    <svg focusable="false" data-prefix="fas" onClick={props.click} className="w-8 h-8 p-1.5 inline rounded-full text-black hover:bg-gray-100 active:bg-gray-200 focus:outline-none" role="img" viewBox="0 0 512 512">
      <polygon points="11.387,490 245,255.832 478.613,490 489.439,479.174 255.809,244.996 489.439,10.811 478.613,0 245,234.161 
	    11.387,0 0.561,10.811 234.191,244.996 0.561,479.174 "/>
    </svg>
  );
};