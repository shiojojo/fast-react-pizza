import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';

function UpdateOrderPriority({ orderId }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="patch">
      <Button
        type="submit"
        style={{
          minWidth: 100,
          background: '#facc15',
          color: '#78350f',
          fontWeight: 'bold',
          border: '1px solid #fcd34d',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}
      >
        Set priority
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrderPriority;

export async function action({ params, request }) {
  const { updateOrder } = await import('../../services/apiRestaurant');
  if (request.method === 'PATCH') {
    await updateOrder(params.orderId, { priority: true });
  }
  return null;
}
