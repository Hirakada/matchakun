"use client";

import { useState, useEffect } from "react";
import MatchaLoader from "./MatchaLoader";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isMinTimePassed, setIsMinTimePassed] = useState(false);
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const [shouldShowLoader, setShouldShowLoader] = useState(true);

  // ===== CHECK CACHE =====
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("matcha-loader-seen");

    if (hasVisited) {
      setShouldShowLoader(false);
      setIsLoaderFinished(true);
    } else {
      sessionStorage.setItem("matcha-loader-seen", "true");
    }
  }, []);

  // ===== PAGE LOAD =====
  useEffect(() => {
    const handleLoad = () => setIsPageLoaded(true);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // ===== MIN TIME =====
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

      {/* CONTENT langsung tampil */}
      <div className="relative z-10">{children}</div>
    </>
  );
}