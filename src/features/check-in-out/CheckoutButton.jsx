import Button from '../../ui/Button';
import { useCheckOut } from './useCheckOut';

const CheckoutButton = ({ bookingId }) => {
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Button
      variation='tertiary'
      size='sm'
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
