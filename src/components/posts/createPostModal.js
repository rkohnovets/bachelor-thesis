import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useContext } from 'react'
import ButtonWithLoader from '../transactions/buttonwithloader';
import { TransactionContext } from '../../context/transactionsContext';

const CreatePostModal = () => {
  const { createPost, currentUser } = useContext(TransactionContext);

  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  //name это то что введено в поле ввода для текста поста)))
  let name = null;
  const setName = (e) => name = e.value;

  let handleSubmitClick = async () => {
    try {
      if(!name || name.length === 0)
        throw new Error("");
      await createPost(name);
      closeModal();
    } catch {
      alert("Ошибка! Скорее всего, вы отменили транзакцию или текст поста пустой");
    }
  }

  return (
    <> 
      <button onClick={openModal} className ='block text-gray-100 hover:text-white px-3 py-2 rounded-md
        text-sm font-medium text-center hover:bg-purple-800 bg-purple-700 active:bg-purple-900 disabled:bg-gray-500'
        disabled={currentUser ? false : true}>
        Post
      </button> 

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => /*closeModal*/ 1}>
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
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Text:
                  </Dialog.Title>

                  <div class="flex justify-center mt-3">
                    <textarea class="resize-none form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
                      bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                      ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      rows="10" maxLength="500" placeholder="Your message" onChange={(e) => setName(e.target)}/>
                  </div>

                  <div className="mt-4">
                    <ButtonWithLoader text="Create post" loadingtext="Wait" click={handleSubmitClick}
                      textTailwind="text-white rounded-md" bgTailwind="hover:bg-purple-800 bg-purple-700 active:bg-purple-900"/>
                    <button type="button"
                      className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 
                        px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none 
                        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                        active:bg-blue-400  disabled:active:bg-gray-300 disabled:bg-gray-300"
                        onClick={() => closeModal()}>
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CreatePostModal;