import { Outlet, useNavigate } from 'react-router-dom';
import Headers from './Header';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';
function AppLayout() {
  const navigation = useNavigate();
  const isLoading = navigation.state === 'loading';
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Headers />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
