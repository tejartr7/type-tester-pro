"use client";
import { Navbar } from "@/components/Navbar";
import WordWrapperModal from "@/components/WordWrapperModal";
import Timer from "@/components/Timer";
import { useSystem } from "@/hooks/use-system";
const MainComponent = () => {
  const { time, setTime, setLocalStorageValue, restartTest } = useSystem();
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="fixed top-0 left-0 right-0 z-10"></div>
        <main
          className=" mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 xl:px-0"
        >
          <div className="flex justify-center">
            <WordWrapperModal />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainComponent;
