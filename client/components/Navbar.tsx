"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { RiMenuFill as Menu, RiMenuFoldFill as Close } from "react-icons/ri";
import { createBrowserClient } from "@supabase/ssr";

export const Navbar = () => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(true);
  const [stick, setStick] = useState("");
  const [userData, setUserData] = useState({});
  const menuClick = () => {
    setToggle(!toggle);
  };
  const handleSignout = async () => {
    console.log("signout");
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signOut();
    console.log("error", error);
    if (error) {
      console.log(error);
      return;
    }
    setUserData({});
    window.location.href = "/";
  };
  useEffect(() => {
    window.onscroll = () => {
      window.scrollY > 10 ? setStick(" py-3 , top-0 ") : setStick("py-2");
      setToggle(true);
    };
    const fetchUserData = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await supabase.auth.getUser();
      setUserData(data.user || {});
    };
    fetchUserData();
    //console.log(userData?.user);
  }, [userData]);
  return (
    <header
      className={`bg-black  w-[100vw] duration-200 ${stick}`}
      suppressHydrationWarning
    >
      <div className="wrap">
        <nav className="flex justify-between items-center">
          <a href="/" className="logo text-white font-bebas text-3xl">
            Type Tester Pro
          </a>

          <div className="sm:flex menu gap-5 flex none ">
            <a className="text-white mx-5 flex items-center" href="/">
              {" "}
              Home{" "}
            </a>
            <a className="text-white mx-5 flex items-center" href="/store">
              {" "}
              Store{" "}
            </a>
            {/* <a className="text-white mx-5 flex items-center" href="#">
              {" "}
              Contact us{" "}
            </a> */}
            {Object.keys(userData).length != 0 ? (
              <div>
                <Button className="bg-white text-black hover:bg-black hover:text-white">
                  <a href="/profile">Profile</a>
                </Button>
                <Button
                  className="bg-white text-black hover:bg-black hover:text-white"
                  onClick={handleSignout}
                >
                  Signout
                </Button>
              </div>
            ) : (
              <div>
                <Button className="bg-white text-black hover:bg-black hover:text-white">
                  <a href="/signup">Sign up</a>
                </Button>
                <Button className="bg-white text-black hover:bg-black hover:text-white">
                  <a href="/login">Login</a>
                </Button>
              </div>
            )}

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
            <a onClick={menuClick} className="mx-5 mt-5 text-white" href="/">
              {" "}
              Home{" "}
            </a>
            <a onClick={menuClick} className="mx-5 text-white" href="/store">
              {" "}
              Store{" "}
            </a>
            {Object.keys(userData).length != 0 ? (
              <div>
                <Button className="bg-white text-black hover:bg-black hover:text-white">
                  <a href="/profile">Profile</a>
                </Button>
                <Button
                  className="bg-white text-black hover:bg-black hover:text-white"
                  onClick={handleSignout}
                >
                  Signout
                </Button>
              </div>
            ) : (
              <div>
                <Button className="bg-white text-black hover:bg-black hover:text-white">
                  <a href="/signup">Sign up</a>
                </Button>
                <Button className="bg-white text-black hover:bg-black hover:text-white">
                  <a href="/login">Login</a>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
