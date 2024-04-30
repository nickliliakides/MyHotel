import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={[
          {
            value: 'all',
            label: 'All',
          },
          {
            value: 'no',
            label: 'No Discount',
          },
          {
            value: 'with',
            label: 'With Discount',
          },
        ]}
      />
      <SortBy
        options={[
          {
            value: 'name-asc',
            label: 'Sort by name (A-Z)',
          },
          {
            value: 'name-desc',
            label: 'Sort by name (Z-A)',
          },
          {
            value: 'price-asc',
            label: 'Sort by price (low-high)',
          },
          {
            value: 'price-desc',
            label: 'Sort by price (high-low)',
          },
          {
            value: 'maxCapacity-asc',
            label: 'Sort by capacity (low-high)',
          },
          {
            value: 'maxCapacity-desc',
            label: 'Sort by capacity (high-low)',
          },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
