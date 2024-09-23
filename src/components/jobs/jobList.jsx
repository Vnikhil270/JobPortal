"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import companyLogo from "../../assets/company-logo.png";
import { useRouter } from "next/navigation";
import JobDescription from "./jobDescription";

function JobList({ jobsData, totalPages, currentPage, totalJobs }) {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(currentPage));
  const [age, setAge] = React.useState("");
  const [searchjob, setSearchJob] = useState("");
  const [alertPeriodValue, setAlertPeriodValue] = React.useState("Daily");
  const [jobSelected, setJobSelected] = useState({});
  const [descDrawerOpen, setDescDrawerOpen] = useState(false);
  const [totalJobCount, setTotalJobCount] = useState(totalJobs);

  const itemsPerPage = 5;
  let startIndex = (page - 1) * itemsPerPage + 1;
  let endIndex = Math.min(startIndex + itemsPerPage - 1, totalJobCount);

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
      router.push(`/jobs?page=${page + 1}`);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      router.push(`/jobs?page=${page - 1}`);
    }
  };

  const handleAlertPeriodChange = (event) => {
    setAlertPeriodValue(event.target.value);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleJobSelected = (job) => {
    setJobSelected(job);
    setDescDrawerOpen(true);
  };

  const handleSearchJob = (value) => {
    setSearchJob(value);
    const data = jobsData.filter((job) =>
      job.position.toLowerCase().includes(value.toLocaleLowerCase())
    );
    if(value){
      setTotalJobCount(data.length);
      endIndex = Math.min(startIndex + itemsPerPage - 1, data.length);
    }else{
      console.log("here")
      setTotalJobCount(totalJobs)
    }
  };

  return (
    <>
      <Grid2 container className="bg-sky-50">
        <Grid2 item>
          <div className="text-start px-10">
            <div className="flex flex-col gap-5 my-10">
              <h1 className="text-5xl font-bold">
                Search Your Demanded Job <br /> Permanent & Remote{" "}
              </h1>
              <div className="flex w-[60%] h-8 my-5 shadow-lg border bg-white border-blue-200 pl-3 rounded-full items-center gap-4">
                <input
                  type="text"
                  placeholder="Find jobs"
                  onChange={(e) => handleSearchJob(e.target.value)}
                  className="outline-none border-none w-full"
                />
                <Button
                  // onClick={searchJobHandler}
                  disabled
                  className="rounded-r-full bg-[#4a59ce] hover:bg-[#0223f8]"
                >
                  <SearchIcon className="h-5 w-5 text-[#fff]" />
                </Button>
              </div>
            </div>
          </div>
        </Grid2>
      </Grid2>
      <Container maxWidth="md">
        <p className="text-3xl mt-6 font-semibold text-slate-700">
          Explore New Jobs
        </p>
        <Grid2 container spacing={4}>
          <Grid2 size={{ sm: 8, md: 8, xs: 8 }}>
            <Typography
              className="text-sm text-slate-500"
              variant="h6"
              align="right"
              mt={2}
            >
              Showing {startIndex}-{endIndex} out of {totalJobCount}
            </Typography>
            {jobsData
              .filter((job) =>
                searchjob
                  ? job.position
                      .toLowerCase()
                      .includes(searchjob.toLocaleLowerCase())
                  : job
              )
              ?.map((item, key) => {
                return (
                  <Card
                    sx={{ mt: 2 }}
                    className="p-6 cursor-pointer"
                    key={key}
                    onClick={() => handleJobSelected(item)}
                  >
                    <Box className="flex justify-between">
                      <Box className="flex">
                        <Box>
                          <Image
                            src={companyLogo}
                            width={100}
                            height={100}
                            alt="company-logo"
                          />
                        </Box>
                        <Box>
                          <p className="company-Name text-sm text-[#0258f8]">
                            {item.companyName}
                          </p>
                          <p className="position font-semibold my-1">
                            {item.position}
                          </p>
                          <Box className="flex gap-3">
                            <p className="inline-block text-xs text-slate-500 align-middle">
                              <LocationOnIcon
                                sx={{ width: "15px", height: "15px" }}
                              />
                              {item.location}
                            </p>
                            <p className="inline-block text-xs text-slate-500 align-middle">
                              <CalendarMonthIcon
                                sx={{
                                  width: "15px",
                                  height: "15px",
                                  mr: "2px",
                                }}
                              />
                              2 Days ago
                            </p>
                          </Box>
                          <Box className="flex gap-2 mt-3">
                            <Chip
                              className="job-type bg-sky-100 text-sky-500"
                              size="small"
                              filled
                              label={item.jobType}
                              sx={{ fontSize: "12px" }}
                            />
                            <Chip
                              className="job-type bg-sky-100 text-sky-500"
                              size="small"
                              filled
                              label={item.employmentType}
                              sx={{ fontSize: "12px" }}
                            />
                            <Chip
                              className="job-location bg-amber-100 text-amber-500"
                              size="small"
                              filled
                              label={item.workLocation}
                              sx={{ fontSize: "12px" }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <BookmarkAddOutlinedIcon />
                    </Box>
                    <Divider sx={{ marginTop: "15px" }} />
                    <Box mt={2} className="flex item-center items-center">
                      <p className="text-xs font-semibold">Skills :- &nbsp;</p>
                      {item.skills.slice(0, 4).map((skill, index) => (
                        <>
                          <span key={index} className="text-xs">
                            {skill}
                            {index < 3 && ",  "}
                          </span>
                          <span>&nbsp;</span>
                        </>
                      ))}
                      {item.skills.length > 5 && (
                        <Chip
                          className="job-location bg-amber-100 text-amber-500"
                          size="small"
                          filled
                          label={`+${item.skills.length - 4} more`}
                          sx={{ fontSize: "12px" }}
                        />
                      )}
                    </Box>
                  </Card>
                );
              })}
            {/* Pagination Buttons */}
            <Box display="flex" justifyContent="end" mt={4} mb={4}>
              <Button
                onClick={handlePrevious}
                disabled={page <= 1}
                variant="contained"
                sx={{ mr: 2 }}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={page >= totalPages}
                variant="contained"
              >
                Next
              </Button>
            </Box>
          </Grid2>
          <Grid2 size={{ sm: 4, xs: 4, md: 4 }}>
            <Box className="h-30">
              <Box className="p-3 rounded-t-lg  bg-[#4a59ce] text-center align-middle">
                <p className="text-white align-middle">Email Me New Job</p>
              </Box>
              <Box className="p-8 bg-sky-100 text-center flex justify-center flex-col">
                <FormControl fullWidth size="small" className="bg-white">
                  <InputLabel id="demo-simple-select-label">
                    Job Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>IT & Development</MenuItem>
                    <MenuItem value={20}>Marketing</MenuItem>
                    <MenuItem value={30}>Hr & Operations</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  className="bg-white text-sm text-slate-100"
                  id="outlined-basic"
                  label="Email"
                  size="small"
                  variant="outlined"
                  sx={{ mt: 2 }}
                />
                <FormControl sx={{ mt: 2 }}>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={alertPeriodValue}
                    onChange={handleAlertPeriodChange}
                  >
                    <FormControlLabel
                      value="Daily"
                      control={<Radio size="small" />}
                      label="Daily"
                    />
                    <FormControlLabel
                      value="Weekly"
                      control={<Radio size="small" />}
                      label="Weekly"
                    />
                    <FormControlLabel
                      value="Monthly"
                      control={<Radio size="small" />}
                      label="Monthly"
                    />
                  </RadioGroup>
                </FormControl>

                <Button
                  className="rounded-lg text-[#4a59ce] "
                  sx={{
                    mt: 2,
                    border: "1px solid #4a59ce",
                    textTransform: "none",
                  }}
                >
                  Create Alert
                </Button>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
      <JobDescription
        open={descDrawerOpen}
        handleJobSelected={handleJobSelected}
        setJobSelected={setJobSelected}
        job={jobSelected}
        setDescDrawerOpen={setDescDrawerOpen}
        jobsData={jobsData}
      />
    </>
  );
}

export default JobList;
