
import Button from "../../ui/Button";
import CreateCabinForm from "../cabins/CreateCabinForm";
import Modal from "../../ui/Modal";


function AddBooking() {

    return(
        <div> 
        <Modal>
            <Modal.Open opens='cabin-form'>
            <Button>
                Add new cabin
            </Button>
            </Modal.Open>
            <Modal.Window name='cabin-form'>
                <CreateCabinForm/>
            </Modal.Window>
        </Modal>
        </div>
    )

}

export default AddBooking;
