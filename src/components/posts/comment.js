import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TransactionContext } from '../../context/transactionsContext';

const Comment = (props) => {
    const {getUsernameByIndex} = useContext(TransactionContext);

    let [username, setUsername] = useState(null);
    const loadingUsername = async () => {
        setUsername(await getUsernameByIndex(props.creatorIndex));
    }

    useEffect(async () => await loadingUsername(), []);

    return(
      <div className="block w-full overflow-hidden rounded-lg bg-gray-100
        p-4 text-left shadow-xl transition-all mt-1 hover:bg-gray-200 active:bg-gray-300">
        <h3 className="inline mr-4 text-lg font-medium leading-6 text-gray-900">
          Comment from @
          <Link to={"/profile/" + props.creatorIndex}>
            <h3 className="focus:outline-none hover:underline inline text-lg font-medium leading-6 text-gray-900">
            {username ? username : "loading..."}
            </h3>
          </Link> 
        </h3>
        <div class="mt-3">
            <p>{props.text}</p>
        </div>
      </div>
    );
};

export default Comment;