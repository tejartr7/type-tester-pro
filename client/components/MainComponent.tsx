"use client";
import WordWrapperModal from "@/components/WordWrapperModal";
import ModalComponent from "@/components/Modal";
import ModalContent from "@/components/ModelContainer";
import { useSystem } from "@/hooks/use-system";

// interface MainComponentProps {
//   user: any;
// }

const MainComponent = () => {
  const {
    modalIsOpen,
    closeModal,
    time,
    results,
    history,
    theme
  } = useSystem();
  return (
    <div>
      <div className="flex">
        <div className="fixed top-0 left-0 right-0 z-10"></div>
        <main className=" mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 xl:px-0">
          <div className="flex justify-center">
            <WordWrapperModal />
            <ModalComponent
              type="result"
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              theme={theme}
            >
              <ModalContent
                totalTime={time}
                results={results}
                history={history}
              />
            </ModalComponent>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainComponent;
