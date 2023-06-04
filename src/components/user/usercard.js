import { useState, useContext, useEffect } from 'react';
import { TransactionContext } from '../../context/transactionsContext';
import { Link } from 'react-router-dom';

const UserCard = (props) => {
    const {getUsernameByIndex} = useContext(TransactionContext);

    let [username, setUsername] = useState(null);
    const loadingUsername = async () => {
        setUsername(await getUsernameByIndex(props.userIndex));
    }
    
    useEffect(loadingUsername, []);

    return(
      <div className="inline-block overflow-hidden rounded-lg 
        p-4 text-left shadow-xl transition-all mt-1 bg-lime-200">
        <h3 className="inline text-lg font-medium leading-6 text-gray-900">
          User @
          <Link to={"/profile/" + props.userIndex}>
            <h3 className="hover:underline inline text-lg font-medium leading-6 text-gray-900">
            {username ? username : "loading..."}
            </h3>
          </Link> 
        </h3>
      </div>
    );
};
export default UserCard;


