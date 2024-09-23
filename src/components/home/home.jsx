import React from "react";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Button, Grid2 } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import person from "../../assets/person.png";

function HomePage() {
  const searchJobHandler = () => {
    redirect("/browse");
  };
  return (
    <Grid2 container className="bg-sky-50">
      <Grid2 item size={{ xs: 6, md: 8, sm: 7 }}>
        <div className="text-center">
          <div className="flex flex-col gap-5 my-10">
            <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#0258f8] font-medium">
              Tune Into Your Future
            </span>
            <h1 className="text-5xl font-bold">
              Find the Perfect Job <br /> in Sync with{" "}
              <span className="text-[#0258f8]">Your Goals</span>
            </h1>
            <p>
              Real-Time Job Alerts, Tailored Opportunities, and Career Growth -
              All in One Place
            </p>
            <div className="flex w-[40%] shadow-lg border bg-white border-blue-200 pl-3 rounded-full items-center gap-4 mx-auto">
              <input
                type="text"
                placeholder="Find jobs"
                onChange={(e) => setQuery(e.target.value)}
                className="outline-none border-none w-full"
              />
              <button
                // onClick={searchJobHandler}
                className="rounded-r-full bg-[#4a59ce] hover:bg-[#0223f8] py-2 px-5"
              >
                <SearchIcon className="h-5 w-5 text-[#fff]" />
              </button>
            </div>
          </div>
        </div>
      </Grid2>
      <Grid2 item size={{ xs: 6, md: 4, sm: 5 }}>
        <Image
          src={person}
          alt="Person image"
          style={{
            margin: "-10px 0px 0px -70px",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Grid2>
    </Grid2>
  );
}

export default HomePage;
