import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

// const AddCabin = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsModalOpen((show) => !show)}>Add room</Button>
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default AddCabin;

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddCabin;
