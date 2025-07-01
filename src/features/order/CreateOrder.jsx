import { useState, useEffect } from 'react';
import { useActionData, useNavigation } from 'react-router-dom';
import { Form, redirect } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddress } from '../user/userSlice';
import { getCart, clearCart, totalCartPrice } from '../cart/cartSlice';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const [addressInput, setAddressInput] = useState('');
  const [didFetchAddress, setDidFetchAddress] = useState(false);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const isSubmitted = navigation.state === 'submitting';

  const formErrors = useActionData();

  const {
    username,
    address,
    status: addressStatus,
    error,
  } = useSelector((state) => state.user);
  const totalPrice = useSelector(totalCartPrice);

  const isLoadingAddress = addressStatus === 'loading';

  // Addressの値がReduxで更新されたらinputにも反映
  useEffect(() => {
    if (didFetchAddress && address) setAddressInput(address);
  }, [address, didFetchAddress]);

  return (
    <div className="container mx-auto px-4 py-3">
      <h2 className="mb-8 text-xl font-bold">Ready to order? Let's go!</h2>

      <Form method="post">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="customer"
              required
              defaultValue={username}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="input"
              type="tel"
              name="phone"
              required
              defaultValue="000-0000-0000"
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-500">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="address"
              required
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              disabled={isLoadingAddress}
            />
          </div>
          <span className="absolute right-[3px] z-50">
            <Button
              type="small"
              onClick={(e) => {
                e.preventDefault();
                setDidFetchAddress(true);
                dispatch(fetchAddress());
              }}
              disabled={isLoadingAddress}
            >
              Get Position
            </Button>
          </span>
        </div>
        {addressStatus === 'error' && error && (
          <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-500">
            {error}
          </p>
        )}

        <div className="mb-4 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-semibold" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitted} type="primary">
            {isSubmitted
              ? 'Ordering...'
              : totalPrice > 0
                ? withPriority
                  ? `Order now from ${formatCurrency(Math.round(totalPrice * 1.2))}`
                  : `Order now from ${formatCurrency(totalPrice)}`
                : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  // Validate phone number
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
