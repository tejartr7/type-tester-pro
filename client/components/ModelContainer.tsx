"use client";
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useClipboard } from "@/hooks/use-clipborad";
import { useScreenShot } from "@/hooks/use-screenshot";
import { Button } from "@/components/ui/button";
import { IoCopy } from "react-icons/io5";
import { FaCameraRetro } from "react-icons/fa";

import Character from "@/components/Character";
import ResultCard from "@/components/ResultCard";

import type { Results, HistoryType } from "@/types/types";
import { createBrowserClient } from "@supabase/ssr";

type ModalContentProps = {
  totalTime: number;
  history: HistoryType;
  results: Results;
};

const StyledCopyButton = styled.button`
  &:hover {
  }
`;

const ModalContent = ({ totalTime, history, results }: ModalContentProps) => {
  const [copied, setCopied] = useState(false);
  const [imageCopied, setImageCopied] = useState(false);
  const [userData, setUserData] = useState({});
  const { copyTextToClipboard } = useClipboard();
  const { ref, image, getImage } = useScreenShot();
  const [updated, setUpdated] = useState(false);
  const [email, setEmail] = useState("");
  const mounted = useRef(false); // Ref to track component mounting

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await supabase.auth.getUser();
      setUserData(data.user || {});
      setEmail(data.user?.email || "");
    };
    const updateUserStats = async (
      speed: number,
      accuracy: number,
      time: number
    ) => {
      console.log("call sent to updated");
      try {
        const response = await fetch("http://localhost:8000/user/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            speed,
            accuracy,
            time,
          }),
        });
        setUpdated(true);
        if (!response.ok) {
          throw new Error("Failed to update user stats");
        }
        setUpdated(true);
      } catch (error) {
        console.error("Error updating user stats:", error);
      }
    };
    // Fetch user data if it's not fetched yet
    if (Object.keys(userData).length === 0) {
      fetchUserData();
    }
    if (Object.keys(userData).length !== 0 && !updated) {
      updateUserStats(results.wpm, results.accuracy, totalTime);
    }
    // Update user stats if userData is fetched and not updated yet
  }, [userData, updated]);

  return (
    <div>
      <div className="mx-auto flex h-full w-[95%] flex-col gap-10 pb-10 pt-8 font-mono">
        <div ref={ref} className="flex-[3] px-5 py-7" style={{}}>
          <div className=" grid grid-flow-col grid-rows-6 justify-center gap-4 sm:grid-rows-4 sm:justify-normal lg:grid-rows-2 lg:justify-normal lg:gap-10 ">
            <ResultCard
              title="wpm/cpm"
              tooltipId="wpm"
              tooltipContent="words per minute / characters per minute"
              tooltipPlace="top"
              results={`${results.wpm} / ${results.cpm}`}
            />
            <ResultCard
              title="acc."
              tooltipId="accuracy"
              tooltipContent="accuracy percentage"
              tooltipPlace="bottom"
              results={`${Math.round(results.accuracy)}%`}
            />
            <ResultCard
              title="character"
              tooltipId="character"
              tooltipContent="correct/incorrect"
              tooltipPlace="top"
              results={`${Math.round(
                history.typedHistory.length * (results.accuracy / 100)
              )} / ${Math.round(
                history.typedHistory.length * (results.error / 100)
              )}`}
            />
            <ResultCard
              title="err."
              tooltipId="error"
              tooltipContent="error percentage"
              tooltipPlace="bottom"
              results={`${Math.round(results.error)}%`}
            />
            <ResultCard
              title="time"
              tooltipId="time"
              tooltipContent="time taken to complete the test"
              tooltipPlace="top"
              results={`${totalTime / 1000}s`}
            />
            <ResultCard
              title="total"
              tooltipId="total"
              tooltipContent="total character typed"
              tooltipPlace="bottom"
              results={`${history.typedHistory.length}`}
            />
          </div>
        </div>

        {/* Profile or Sign In/Sign Up Buttons */}
        <div className="flex text-center justify-center items-center">
          {Object.keys(userData).length!=0 ? (
            <div>
              <Button
                className="font-bold bg-white text-black hover:bg-black hover:text-white"
                size="lg"
              >
                <a href="/profile" className="font-bold text-2xl">
                  Profile
                </a>
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-3xl font-bold">
                Please SignUp/Login to save your progress!!
              </p>
            </div>
          )}
        </div>

        {/* Screenshot Button */}
        <div className="flex flex-[1] flex-col px-5">
          <div
            className="group mt-auto flex cursor-pointer items-center gap-2 "
            onClick={async () => {
              try {
                getImage();
                const res = await fetch(image);
                const data = await res.blob();
                await navigator.clipboard.write([
                  new ClipboardItem({ [data.type]: data }),
                ]);

                setImageCopied(true);
                setTimeout(() => {
                  setImageCopied(false);
                }, 2000);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {/* Camera Icon */}
            <FaCameraRetro size={"25"} className="text-4xl lg:text-xl" />
            <span className="text-lg hover:underline">
              Screenshot your results and share to your friends🔥
            </span>

            {/* Image Copied Confirmation */}
            <div className="rounded-md" style={{}}>
              {imageCopied === true ? (
                <span className="p-5 text-center" style={{}}>
                  Image copied to clipboard 😊
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
