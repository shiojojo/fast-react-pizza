import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, pizza, isMenuLoading }) {
  const { quantity, name, totalPrice } = item;
  const ingredients = pizza?.ingredients ?? [];

  return (
    <li className="flex flex-col gap-1 py-3">
      <div className="flex items-center justify-between">
        <p className="font-medium">
          <span className="text-stone-500">{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold text-stone-700">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <p className="pl-6 text-xs italic text-stone-500">
        {isMenuLoading
          ? 'Loading...'
          : ingredients.length > 0
            ? ingredients.join(', ')
            : null}
      </p>
    </li>
  );
}

export default OrderItem;
