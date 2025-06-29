import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <LinkButton to="/menu" className="mb-4">
        &larr; Back to menu
      </LinkButton>
      <p className="text-lg font-semibold text-stone-600">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
