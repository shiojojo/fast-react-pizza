import MenuItem from './MenuItem';
import { getMenu } from '../../services/apiRestaurant';
import { useLoaderData } from 'react-router-dom';

function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="space-y-2 divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
