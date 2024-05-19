import { useState } from "react";
export const isMobile = () => {
  const userAgent = navigator.userAgent;

  const mobileUserAgents = [
    "Android",
    "iPhone",
    "iPad",
    "iPod",
    "BlackBerry",
    "Windows Phone",
  ];

  for (let i = 0; i < mobileUserAgents.length; i++) {
    if (userAgent.indexOf(mobileUserAgents[i]) !== -1) {
      return true;
    }
  }
  return false;
};

export const useDetectDevice = () => {
    const [isMobileDevice] = useState(() => isMobile());
  
    return isMobileDevice;
  };
  