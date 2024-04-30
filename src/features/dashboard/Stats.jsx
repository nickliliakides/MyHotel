import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

const Stats = ({ bookings, confirmedStays, daysCount, roomsCount }) => {
  const numOfBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  const ocupancy = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0);

  const occupancyRate = ocupancy / (daysCount * roomsCount);

  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numOfBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancyRate * 100)}%`}
      />
    </>
  );
};

export default Stats;
