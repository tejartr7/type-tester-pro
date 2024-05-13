"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { createBrowserClient } from "@supabase/ssr";
import Tooltip from "@/components/Tooltip";
import { ReactNode } from "react";
import { HiOutlineClock, HiOutlineDocumentText } from "react-icons/hi";
import {
  IoMdSpeedometer,
  IoMdMail,
  IoMdPerson,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";

const ProfileCard = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        setErrorMessage("Please sign up or log in to view your profile data.");
        setLoading(false);
      } else {
        const response = await axios.get(
          "https://type-tester-pro.onrender.com/user",
          {
            params: {
              email: data?.user?.email || "",
              username: data?.user?.user_metadata?.name || "",
            },
          }
        );
        const filteredUserData = Object.fromEntries(
          Object.entries(response.data).filter(
            ([key]) => key !== "_id" && key !== "__v"
          )
        );
        setUserData(filteredUserData);
        setLoading(false);
      }
    };

    if (Object.keys(userData).length === 0) fetchData();
  }, [userData]);

  // Function to convert seconds to HH:MM:SS format
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}H:${minutes}M:${remainingSeconds}S`;
  };

  return (
    <div className="flex p-2 items-center justify-center">
      <div className="max-w-screen-lg w-full">
        {errorMessage ? (
          <div className="flex items-center justify-center text-3xl">
            {errorMessage}
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center text-3xl">
            Fetching data, please wait...
          </div>
        ) : (
          <div className="flex-col items-center justify-center">
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", bounce: 0.7 }}
              className="mt-5 text-left"
            >
              <h1 className="text-center text-4xl">Your Profile Data...</h1>
              <div className="px-5 py-7">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                  {Object.entries(userData).map(([key, value]) => {
                    let displayValue = value;
                    if (key === "averageSpeed" || key === "highestSpeed") {
                      displayValue = `${value} WPM`;
                    } else if (key === "accuracy") {
                      displayValue = `${value}%`;
                    } else if (key === "totalTime") {
                      displayValue = formatTime(Number(value));
                    }

                    let icon;
                    if (key === "averageSpeed" || key === "highestSpeed") {
                      icon = <IoMdSpeedometer className="text-4xl" />;
                    } else if (key === "totalTime") {
                      icon = <HiOutlineClock className="text-4xl" />;
                    } else if (key === "email") {
                      icon = <IoMdMail className="text-4xl" />;
                    } else if (key === "username") {
                      icon = <IoMdPerson className="text-4xl" />;
                    } else if (key === "accuracy") {
                      icon = (
                        <IoMdCheckmarkCircleOutline className="text-4xl" />
                      );
                    } else {
                      icon = <HiOutlineDocumentText className="text-4xl" />;
                    }

                    return (
                      <Tooltip key={key} tooltipId={key}>
                        <div
                          className="flex flex-col items-center justify-center gap-2 rounded-lg p-5 border border-gray-300"
                          data-tooltip-content={key}
                          data-tooltip-id={key}
                          data-tooltip-place="bottom-end"
                        >
                          <h2 className="text-3xl font-bold">{key}</h2>
                          <div className="flex items-center justify-center flex-col">
                            {icon}
                            <p className="text-center text-lg text-black dark:text-gray-300">
                              {displayValue as ReactNode}
                            </p>
                          </div>
                        </div>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
