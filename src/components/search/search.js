import { useParams, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { TransactionContext } from "../../context/transactionsContext";
import SearchUserCard from "./searchusercard";

const Search = () => {
    let { input } = useParams();
    const { findUser } = useContext(TransactionContext);
    let [users, setUsers] = useState([]);

    const onClickReload = async () => {
        try {
            let foundUsers = await findUser(input);
 
            setUsers([]);
            setUsers(foundUsers);
        } catch(error) {
            setUsers([]);
        }
    };
    
    let location = useLocation();
    useEffect(() => {
      onClickReload();
    }, [location]);

    useEffect(onClickReload, []);

    return (
        <div>
            {users.map(user => <SearchUserCard user={user}/>)}
        </div>
    )
}

export default Search;