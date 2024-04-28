import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";

type ModalProps = {
  type: string;
  isOpen: boolean;
  onRequestClose: (str: string) => void;
  theme: string;
  children: React.ReactNode;
};

Modal.setAppElement("#root");

const ModalComponent = async({
  type,
  isOpen,
  onRequestClose,
  children,
  theme
}: ModalProps) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => onRequestClose(type)}
        closeTimeoutMS={300}
        style={{
          content: {
            color: theme == "dark" ? "white" : "black",
            backgroundColor: theme == "dark" ? "black" : "white",
          },
        }}
      >
        <div className="relative flex w-full justify-end">
          <button
            onClick={() => onRequestClose(type)}
            className="absolute right-1 top-1"
          >
            <IoIosCloseCircle className="text-4xl" />
          </button>
        </div>
        <div>{children}</div>
      </Modal>
    </div>
  );
};

export default ModalComponent;
