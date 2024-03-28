import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import { Providers } from "@/app/Provider";

type ModalProps = {
  type: string;
  isOpen: boolean;
  onRequestClose: (str: string) => void;
  children: React.ReactNode;
};

Modal.setAppElement("#root");

const ModalComponent = ({
  type,
  isOpen,
  onRequestClose,
  children,
}: ModalProps) => {
  return (
    <div>
      <Providers>
        <Modal
          isOpen={isOpen}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => onRequestClose(type)}
          closeTimeoutMS={300}
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
      </Providers>
    </div>
  );
};

export default ModalComponent;
