import React from "react";
import { Logo } from "./Logo";

const SplashScreen: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-background-paper fixed top-0 left-0 w-full z-1400">
    <div className="inline-flex h-48 w-48">
      <Logo />
    </div>
  </div>
);

export default SplashScreen;
