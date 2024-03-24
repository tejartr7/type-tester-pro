"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { RiMenuFill as Menu, RiMenuFoldFill as Close } from "react-icons/ri";

export const Navbar = () => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(true);
  const [stick, setStick] = useState("");

  const menuClick = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    window.onscroll = () => {
      window.scrollY > 10 ? setStick(" py-3 , top-0 ") : setStick("py-2");
      setToggle(true);
    };
  }, []);
  return (
    <header
      className={`bg-black  w-[100vw] duration-200 ${stick}`}
      suppressHydrationWarning
    >
      <div className="wrap">
        <nav className="flex justify-between items-center">
          <a href="#" className="logo text-white font-bebas text-3xl">
            Type Tester Pro
          </a>

          <div className="sm:flex menu gap-5 flex none ">
            <a className="text-white mx-5 flex items-center" href="#">
              {" "}
              Home{" "}
            </a>
            <a className="text-white mx-5 flex items-center" href="#">
              {" "}
              Developers{" "}
            </a>
            <a className="text-white mx-5 flex items-center" href="#">
              {" "}
              Store{" "}
            </a>
            <a className="text-white mx-5 flex items-center" href="#">
              {" "}
              Contact us{" "}
            </a>
            <Button className="bg-white text-black hover:bg-black hover:text-white">
              <a href="/auth/register">Sign up</a>
            </Button>
            <Button className="bg-white text-black hover:bg-black hover:text-white">
              <a href="/auth/login">Login</a>
            </Button>

            <ThemeSwitch />
          </div>
          <span className="block sm:hidden menu w-[30px] h-[30px]">
            <ThemeSwitch />
          </span>
          <button
            className="block sm:hidden menu w-[30px] h-[30px] bg-white dark:border-white dark:border-2 dark:bg-black dark:text-white"
            onClick={menuClick}
          >
            {toggle ? (
              <Menu className=" text-white w-[100%] text-[2em]" />
            ) : (
              <Close className=" text-white w-[100%] text-[2em]" />
            )}
          </button>

          {/* Mobile Menu bar */}
          <div
            className={` sm:hidden overflow-hidden ${
              toggle ? "max-h-0" : "max-h-full "
            } menu gap-5 flex fixed w-[100%] flex-col top-[60px] left-0 bg-black duration-300`}
          >
            <a onClick={menuClick} className="mx-5 mt-5 text-white" href="#">
              {" "}
              Home{" "}
            </a>
            <a onClick={menuClick} className="mx-5 text-white" href="#">
              {" "}
              Developers{" "}
            </a>
            <a onClick={menuClick} className="mx-5 text-white" href="#">
              {" "}
              Store{" "}
            </a>
            <a onClick={menuClick} className="mx-5 text-white" href="#">
              {" "}
              Contact us{" "}
            </a>
            <Button className="bg-white text-black hover:bg-black hover:text-white">
              <a href="/auth/register">Sign up</a>
            </Button>
            <Button className="bg-white text-black hover:bg-black hover:text-white">
              <a href="/auth/login">Login</a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
