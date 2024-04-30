import CabinTable from '../features/cabins/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperations from '../features/cabins/CabinTableOperations';

function Rooms() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All Rooms</Heading>
        <CabinTableOperations />
        {/* <p>Filter/Sort</p> */}
      </Row>
      <Row>
        <CabinTable />

        <AddCabin />
      </Row>
    </>
  );
}

export default Rooms;
