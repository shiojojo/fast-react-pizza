// Test ID: IIDSAT

import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useLoaderData } from 'react-router-dom';
import OrderItem from './OrderItem';
import UpdateOrderPriority from './UpdateOrderPriority';

function Order() {
  const order = useLoaderData();
  const menuFetcher = useFetcher();

  useEffect(() => {
    if (menuFetcher.state === 'idle' && !menuFetcher.data) {
      menuFetcher.load('/menu');
    }
  }, [menuFetcher]);

  const menu = menuFetcher.data ?? [];
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 rounded-xl border border-stone-200 bg-white p-6 shadow-md">
        <h2 className="mb-2 flex items-center gap-2 text-xl font-bold text-stone-800">
          Order <span className="text-yellow-600">{id}</span> Status
        </h2>
        <div className="flex min-h-[32px] items-center gap-3">
          {priority ? (
            <span className="inline-block rounded-full border border-red-200 bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
              PRIORITY
            </span>
          ) : (
            <UpdateOrderPriority orderId={id} />
          )}
          <span className="inline-block rounded-full border border-yellow-200 bg-yellow-100 px-2 py-1 text-xs font-semibold capitalize text-yellow-800">
            {status} order
          </span>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-stone-200 bg-white p-6 shadow-md">
        <p className="mb-1 text-lg font-medium text-stone-700">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-sm text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-stone-200 bg-white p-6 shadow-md">
        <h3 className="mb-2 font-semibold text-stone-700">Order details</h3>
        <ul className="divide-y divide-stone-200">
          {cart.map((item) => {
            const pizza = menu.find((p) => p.id === item.pizzaId);
            return (
              <OrderItem
                key={item.pizzaId}
                item={item}
                pizza={pizza}
                isMenuLoading={menuFetcher.state === 'loading'}
              />
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-2 rounded-xl border border-stone-200 bg-white p-6 shadow-md">
        <p className="text-base text-stone-700">
          Price pizza:{' '}
          <span className="font-semibold">{formatCurrency(orderPrice)}</span>
        </p>
        {priority && (
          <p className="text-base text-stone-700">
            Price priority:{' '}
            <span className="font-semibold">
              {formatCurrency(priorityPrice)}
            </span>
          </p>
        )}
        <p className="text-lg font-bold">
          To pay on delivery:{' '}
          <span className="text-yellow-600">
            {formatCurrency(orderPrice + priorityPrice)}
          </span>
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
