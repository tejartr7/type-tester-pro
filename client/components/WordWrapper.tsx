import { MdCenterFocusStrong } from "react-icons/md";
import { useState, useEffect } from "react";

type WordWrapperProps = {
  children: React.ReactNode;
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

const WordWrapper = ({ children, focused, setFocused }: WordWrapperProps) => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isSmallDevice ? (
        <div className="text-center mt-5">
          <p>
            Type Tester Pro is not supported on small devices as their keyboards
            have auto-suggest options.
          </p>
        </div>
      ) : (
        <>
          <div
            className={`${
              focused ? "opacity-0" : "opacity-100"
            } flex items-center justify-center gap-3 transition-all duration-500 `}
          >
            <MdCenterFocusStrong className="text-center text-2xl" />
            <span className={`text-center text-lg `}>
              Focus to start typing
            </span>
          </div>
          <div
            className={`relative mt-5 flex justify-center focus:border-0 focus:border-none focus:outline-none ${
              focused ? "blur-none" : "cursor-pointer blur-md"
            } `}
            tabIndex={0}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default WordWrapper;
