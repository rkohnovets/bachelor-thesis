import  { Routes, Route } from "react-router-dom"
import Home from './components/home/home'
import Profile from './components/user/profile'
import Search from './components/search/search'

import Navbar from './components/navbar/navbar'
import { TransactionsProvider } from "./context/transactionsContext"

const App = () => {
    return (
        <div className="bg-cyan-700 min-h-screen">
            <TransactionsProvider>
                <Navbar/>
                <div className="max-w-5xl block mx-auto">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/search/:input" element={<Search/>}/>
                        <Route path="/profile/:index" element={<Profile/>}/>
                    </Routes>
                </div>
            </TransactionsProvider>
        </div>
    )
}

export default App;

//"homepage": "https://rkohnovets.github.io/SocialNetworkRinkebyTestnet",
