import Image from "next/image";
import React from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Drawer,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import companyLogo from "../../assets/company-logo.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function JobDescription({
  open,
  handleJobSelected,
  setJobSelected,
  job,
  setDescDrawerOpen,
  jobsData,
}) {
  return (
    <div>
      <Drawer
        className="job-drawer"
        anchor="bottom"
        open={open}
        onClose={() => setDescDrawerOpen(false)}
      >
        <Container
          maxWidth="lg"
          sx={{
            p: 5,
            paddingLeft: "54px !important",
            paddingRight: "54px !important",
          }}
        >
          <Grid2 container spacing={3}>
            <Grid2 item size={{ sm: 8, xs: 8, md: 8 }} className="px-4">
              <Box className="flex justify-between items-center">
                <Box>
                  <p className="font-semibold text-2xl">{job.position}</p>
                </Box>
                <Box className="flex gap-2">
                  <Button className="normal-case bg-[#4a59ce] text-white">
                    Apply Now
                  </Button>
                  <Button className="border-2 border-solid border-slate-100 ">
                    <BookmarkAddOutlinedIcon />
                  </Button>
                </Box>
              </Box>
              <Box className="flex gap-2" mt={3}>
                <Image
                  src={companyLogo}
                  width={100}
                  height={100}
                  alt="company-logo"
                />
                <Box>
                  <p className="text-sm text-[#0258f8] align-center">
                    {job.companyName}
                    <span className="px-3 text-slate-400">&#x2022;</span>
                    <span className="text-slate-500 text-sm">
                      <LocationOnIcon sx={{ width: "15px", height: "15px" }} />
                      {job.location}
                    </span>
                  </p>
                  <Box mt={2} className="flex gap-2">
                    <Chip
                      className="bg-sky-100 text-sky-500"
                      label={job.jobType}
                      size="small"
                    />
                    <Chip
                      className="bg-sky-100 text-sky-500"
                      label={job.employmentType}
                      size="small"
                    />
                    <Chip
                      className="bg-amber-100 text-amber-500"
                      label={job.workLocation}
                      size="small"
                    />
                    <Chip
                      className="text-slate-500"
                      label="2-4 years"
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>
              <Box mt={5}>
                <Box>
                  <p className="font-semibold">About the Role</p>
                  <p className="mt-3 text-sm text-slate-500">{job.aboutRole}</p>
                </Box>
                <Box mt={3}>
                  <p className="font-semibold">Qualification</p>
                  <ul className="mt-3 text-sm list-disc ml-5 text-slate-500">
                    {job?.jobQualification?.map((item, key) => {
                      return <li key={key}>{item}</li>;
                    })}
                  </ul>
                </Box>
                <Box mt={3}>
                  <p className="font-semibold">Responsibility</p>
                  <ul className="mt-3 text-sm list-disc ml-5 text-slate-500">
                  {job?.jobResponsibility?.map((item, key) => {
                      return <li key={key}>{item}</li>;
                    })}
                  </ul>
                </Box>
              </Box>
              <Box
                className="border-slate-200 p-4 rounded-lg"
                mt={5}
                sx={{ border: "1px solid" }}
              >
                <p className="text-sm font-semibold text-slate-700">
                  About Company :-
                </p>
                <p className="text-sm mt-3 text-slate-600">{job.aboutCompany}</p>
              </Box>
            </Grid2>
            <Grid2 item size={{ sm: 4, xs: 4, md: 4 }}>
              <p className="font-semibold text-md text-slate-600">
                More Similar jobs
              </p>
              {jobsData?.map((item, key) => {
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
                              sx={{ width: "15px", height: "15px", mr: "2px" }}
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
                    {item.skills.slice(0, 3).map((skill, index) => (
                      <>
                        <span key={index} className="text-xs">
                          {skill}
                          {index < 2 && ",  "}
                        </span>
                        <span>&nbsp;</span>
                      </>
                    ))}
                    {item.skills.length > 3 && (
                      <Chip
                        className="job-location bg-amber-100 text-amber-500"
                        size="small"
                        filled
                        label={`+${item.skills.length - 3} more`}
                        sx={{ fontSize: "12px" }}
                      />
                    )}
                  </Box>
                </Card>
              );
            })}
            </Grid2>
          </Grid2>
        </Container>
      </Drawer>
    </div>
  );
}

export default JobDescription;
