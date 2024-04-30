import styled from 'styled-components';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';
import Heading from '../../ui/Heading';
import DashboardBox from './DashboardBox';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const SalesChart = ({ bookings, numDays }) => {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extraSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#1e1d22', fill: '#c7d2fe' },
        extraSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((b) => isSameDay(date, new Date(b.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extraSales: bookings
        .filter((b) => isSameDay(date, new Date(b.created_at)))
        .reduce((acc, cur) => acc + cur.extrasCharge, 0),
    };
  });

  return (
    <StyledSalesChart>
      <Heading as='h2'>
        Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;{' '}
        {format(allDates.at(-1), 'MMM dd yyyy')}
      </Heading>
      <ResponsiveContainer height={300} width='100%'>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='colorTS' x1='0' y1='0.35' x2='0' y2='1'>
              <stop
                offset='15%'
                stopColor={colors.totalSales.stroke}
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor={colors.totalSales.stroke}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id='colorES' x1='0' y1='0.35' x2='0' y2='1'>
              <stop
                offset='15%'
                stopColor={colors.extraSales.stroke}
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor={colors.extraSales.stroke}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit='£'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray={8} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey='totalSales'
            type='monotone'
            stroke={colors.totalSales.stroke}
            fill='url(#colorTS)'
            strokeWidth={2}
            name='Total sales'
            unit='£'
          />
          <Area
            dataKey='extraSales'
            type='monotone'
            stroke={colors.extraSales.stroke}
            fill='url(#colorES)'
            strokeWidth={2}
            name='Extra sales'
            unit='£'
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
