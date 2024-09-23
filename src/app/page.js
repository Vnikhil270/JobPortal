"use client";

import JobStats from "@/components/home/jobStats";
// import ReduxProvider from "./ReduxProvider";
import HomePage from "@/components/home/home";
import JobCategory from "@/components/home/jobCategory";

export default function Home() {
  return (
    <>
      <HomePage />
      <JobStats/>
      <JobCategory/>
    </>
  );
}
