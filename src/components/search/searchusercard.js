import { Link } from 'react-router-dom';

const SearchUserCard = (props) => {
  let user = props.user;

  return(
    <div className="inline-block w-full overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl m-4">
      <div className="relative flex items-center justify-between mt-4">
        <h3 className="inline text-lg font-medium leading-6 text-gray-900">
          User @
          <Link to={"/profile/" + user.index}>
            <h3 className="hover:underline inline text-lg font-medium leading-6 text-gray-900">
              {user.username}
            </h3>
          </Link> 
        </h3>
      </div>

      <div class="mt-3">
        <p className="block">Username: {user.username}</p>
        <p className="block my-2">User address: {user.userAddress}</p>
        <p className="block">User ID: {user.index}</p>
      </div>
    </div>
  );
};

export default SearchUserCard;