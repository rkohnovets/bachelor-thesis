import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useContext } from 'react'
import ButtonWithLoader from '../transactions/buttonwithloader';
import { TransactionContext } from '../../context/transactionsContext';

const RegisterModal = () => {
    const { usernameIsFree, usernameIsCorrect, register, updateCurrentUser } = useContext(TransactionContext);

    let [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    let [isFree, setIsFree] = useState(false);
    let [isCorrect, setIsCorrect] = useState(false);

    let username = "";
    const checkUsername = async (e) => {
        username = e.value;

        let free = await usernameIsFree(username);
        setIsFree(free);

        let correct = await usernameIsCorrect(username);
        setIsCorrect(correct);
    }

    let handleSubmitClick = async () => {
        try {
            if(!isFree || !isCorrect)
                throw new Error("");
            await register(username);

            await updateCurrentUser();

            closeModal();
        } catch {
            alert("Ошибка! Попробуйте ввести другой Username, он должен быть свободным и корректным!");
        }
    }

    return (
        <> 
        <div onClick={openModal} className ='block text-gray-100 hover:text-white px-3 py-2 rounded-md
            text-sm font-medium text-center hover:bg-purple-800 bg-purple-700 active:bg-purple-900 disabled:bg-gray-500'>
            Register
        </div> 

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => 1}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
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
                                Register
                            </Dialog.Title>

                            <div className="flex justify-center mt-3">
                                <input className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 
                                bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-md transition 
                                ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                maxLength="500" placeholder="Username" onChange={(e) => checkUsername(e.target)}
                                onBlur={(e) => checkUsername(e.target)}/>
                                    {isFree ? <Yes text="Free"/> : <No text="Free"/>}
                                    {isCorrect ? <Yes text="Correct" addstyle=" rounded-r-md "/> : <No text="Correct" addstyle=" rounded-r-md "/>}
                            </div>

                            <div className="mt-4">
                                <ButtonWithLoader text="Register" loadingtext="Wait" click={handleSubmitClick}
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

export default RegisterModal;

const Yes = (props) => {
    //props - text, addstyle (Tailwind)
    let style = "flex justify-center bg-lime-500 items-center px-2 " + (props.addstyle ? props.addstyle : ""); 
    return(
        <div className={style}>
            <svg focusable="false" className="w-8 h-8 p-1 inline focus:outline-none" role="img" viewBox="0 0 512 512">
                <path fill='white' d="M438.2,0H51.6C23.1,0,0,23.2,0,51.6v386.6c0,28.5,23.2,51.6,51.6,51.6h386.6c28.5,0,51.6-23.2,51.6-51.6V51.6
                    C489.8,23.2,466.6,0,438.2,0z M465.3,438.2c0,14.9-12.2,27.1-27.1,27.1H51.6c-14.9,0-27.1-12.2-27.1-27.1V51.6
                    c0-14.9,12.2-27.1,27.1-27.1h386.6c14.9,0,27.1,12.2,27.1,27.1V438.2z"/>
                <path fill='white' d="M319.5,177.9l-108.7,108l-40.5-40.7c-4.8-4.8-12.5-4.8-17.3,0c-4.8,4.8-4.8,12.5,0,17.3l49.1,49.4
                    c2.3,2.3,5.4,3.6,8.7,3.6l0,0c3.2,0,6.3-1.3,8.6-3.6l117.4-116.7c4.8-4.8,4.8-12.5,0-17.3C332,173.1,324.3,173.1,319.5,177.9z"/>
            </svg>
            <p className='block text-white'>{props.text}</p>
        </div>
    );
};

const No = (props) => {
    //props - text, addstyle (Tailwind)
    let style = "flex justify-center bg-red-500 items-center px-2 " + (props.addstyle ? props.addstyle : ""); 
    return(
        <div className={style}>
            <svg focusable="false" className="w-8 h-8 p-1 inline focus:outline-none" role="img" viewBox="0 0 512 512">
                <path fill='white' d="M438.2,0H51.6C23.1,0,0,23.2,0,51.6v386.6c0,28.5,23.2,51.6,51.6,51.6h386.6c28.5,0,51.6-23.2,51.6-51.6V51.6
                    C489.8,23.2,466.6,0,438.2,0z M465.3,438.2c0,14.9-12.2,27.1-27.1,27.1H51.6c-14.9,0-27.1-12.2-27.1-27.1V51.6
                    c0-14.9,12.2-27.1,27.1-27.1h386.6c14.9,0,27.1,12.2,27.1,27.1V438.2z"/>
            </svg>
            <p className='block text-white'>{props.text}</p>
        </div>
    );
};