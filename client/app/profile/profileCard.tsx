"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { createBrowserClient } from "@supabase/ssr";
import Tooltip from "@/components/Tooltip";

const ProfileCard = () => {
  const [userData, setUserData] = useState([]);
  const [typingAnalytics, setTypingAnalytics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await supabase.auth.getUser();

      const response = await axios.get("http://localhost:8000/user", {
        params: {
          email: data?.user?.email || "",
          username: data?.user?.user_metadata?.name || "",
        },
      });

      const filteredUserData = Object.fromEntries(
        Object.entries(response.data).filter(
          ([key]) => key !== "_id" && key !== "__v"
        )
      );

      setUserData(filteredUserData);

      const typingResponse = await axios.get(
        "http://localhost:8000/typing-analytics",
        {
          params: {
            email: data?.user?.email || "",
          },
        }
      );
      setTypingAnalytics(typingResponse.data);
    };

    if (Object.keys(userData).length === 0) fetchData();
  }, [userData]);

  // Function to convert seconds to HH:MM:SS format
  const formatTime = (seconds:number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}H:${minutes}M:${remainingSeconds}S`;
  };

  return (
    <div className="flex p-2 items-center justify-center">
      <div
        className="flex-col items-center justify-center w-full max-w-screen-lg mx-auto"
        style={{
          border: "5px solid #555",
          borderRadius: "10px",
        }}
      >
        <motion.div
          whileHover={{
            y: -8,
          }}
          transition={{
            type: "spring",
            bounce: 0.7,
          }}
          className="mt-5 text-left"
        >
          <h1 className="text-center text-4xl">Your Profile Data...</h1>
          <div className="px-5 py-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
              {Object.entries(userData).map(([key, value]) => {
                let displayValue = value;
                // Modify display value for specific keys
                if (key === "averageSpeed" || key === "highestSpeed") {
                  displayValue = `${value} WPM`;
                } else if (key === "accuracy") {
                  displayValue = `${value}%`;
                } else if (key === "totalTime") {
                  displayValue = formatTime(value);
                }
                return (
                  <Tooltip key={key} tooltipId={key}>
                    <div
                      className="flex flex-col items-center justify-center gap-2 rounded-lg p-5"
                      data-tooltip-content={key}
                      data-tooltip-id={key}
                      data-tooltip-place={key}
                    >
                      <h2 className="text-3xl">{key}</h2>
                      <p className="text-center text-2xl">{displayValue}</p>
                    </div>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileCard;
