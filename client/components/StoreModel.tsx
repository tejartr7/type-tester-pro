"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/StoreBackground";
import { Navbar } from "@/components/Navbar";

export function StoreModel() {
  return (
    <div>
      <Navbar />
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center"
        >
          <div className="text-2xl md:text-4xl font-bold dark:text-white text-center">
            Find the latest tools, plugins, and resources for your projects here at Type Tester Pro Store along with the best deals and discounts. 💯💯
          </div>
          <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
            coming soon....
          </div>
        </motion.div>
      </AuroraBackground>
    </div>
  );
}
