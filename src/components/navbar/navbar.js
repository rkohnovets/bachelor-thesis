/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, CubeTransparentIcon } from '@heroicons/react/outline'
import { NavLink, Link } from 'react-router-dom'

import CreatePostModal from "../posts/createPostModal";
import RegisterModal from './registerModal';
import ConnectionButton from '../transactions/connectionbutton';

import { TransactionContext } from '../../context/transactionsContext';

const navigation = [
  { name: 'Home', href: '/'}
]

const Navbar = () => {

  const { currentUser } = useContext(TransactionContext);

  const [searchInput, setSearchInput] = useState(" ");
  const setInput = (element) => setSearchInput(element.value);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-5xl mx-auto px-2">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button /* Mobile menu button*/ className="inline-flex items-center justify-center p-2 
                rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none 
                focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (<XIcon className="block h-6 w-6"/>) 
                  : (<MenuIcon className="block h-6 w-6"/>)}
                </Disclosure.Button>
              </div>
              
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block ml-2">
                  <div className="flex space-x-1">
                    {navigation.map((item) => (
                      <NavLink key={item.name} to={item.href}
                        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 
                          rounded-md text-sm font-medium'>
                        {item.name}
                      </NavLink>))}
                    {currentUser ? <CreatePostModal/> : <RegisterModal/>}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <div className="flex justify-center">
                  <input type="search" onChange={(e) => setInput(e.target)} className="relative block w-32 px-3 py-1.5 text-base bg-white border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="username"/>
                  <Link to={"/search/" + searchInput} className="flex items-center px-3 bg-blue-600 text-white rounded-r shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    <svg focusable="false" data-prefix="fas" className="w-4" viewBox="0 0 512 512">
                      <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                    </svg>
                  </Link>
                </div>
                <Menu /* Profile dropdown */ as="div" className="mx-1 relative z-10">
                  <Menu.Button className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 active:bg-gray-600 focus:outline-none">
                    <CubeTransparentIcon className="h-6 w-6"/>
                  </Menu.Button>
                  <Transition as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">

                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <p className='m-1 block px-4 py-2 text-sm'>{currentUser ? ("Registered as: " + currentUser.username) : "Not registered" }</p>
                      </Menu.Item>
                      {currentUser ? 
                      <Menu.Item>
                        <NavLink className='m-1 menu hover:bg-gray-200 active:bg-gray-400 rounded-md block px-4 py-2 text-sm text-gray-700' 
                        to={"/profile/" + currentUser.index}>
                          My profile
                        </NavLink>
                      </Menu.Item> 
                      : <></>}
                    </Menu.Items>
                  </Transition>
                </Menu>
                
                <ConnectionButton/>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink key={item.name} to={item.href}
                className='block text-gray-300 hover:bg-gray-700 hover:text-white 
                px-3 py-2 rounded-md text-sm font-medium text-center'>
                  {item.name}
              </NavLink>))}
              <CreatePostModal/>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar;