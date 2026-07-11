"use client";

import { useState, useEffect } from "react";
import MatchaLoader from "@/components/loaders/MatchaLoader";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isMinTimePassed, setIsMinTimePassed] = useState(false);
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const [shouldShowLoader, setShouldShowLoader] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("matcha-loader-seen");

    if (hasVisited) {
      setShouldShowLoader(false);
      setIsLoaderFinished(true);
    } else {
      sessionStorage.setItem("matcha-loader-seen", "true");
    }
  }, []);

  useEffect(() => {
    const handleLoad = () => setIsPageLoaded(true);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinTimePassed(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const shouldFinish = isPageLoaded && isMinTimePassed;

  return (
    <>
      {shouldShowLoader && !isLoaderFinished && (
        <MatchaLoader
          isDone={shouldFinish}
          onFinish={() => setIsLoaderFinished(true)}
        />
      )}

      <div className="relative z-10">{children}</div>
    </>
  );
}