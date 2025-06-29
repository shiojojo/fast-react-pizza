import CreateUser from '../features/user/CreateUser.jsx';
import { useSelector } from 'react-redux';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-4 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          Continue order
        </Button>
      )}
    </div>
  );
}

export default Home;
