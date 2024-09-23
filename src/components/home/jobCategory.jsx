"use client";
import { Box, Button, Container, Grid2 } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

function JobCategory() {
  const router = useRouter();
  return (
    <Box mt={4}>
      <Box className="flex flex-col text-center">
        <p className="text-[#0258f8]">Job category</p>
        <h1 className="text-4xl font-semibold my-1">
          Popular Job Category <br /> For our{" "}
          <span className="text-[#0258f8]">Candidates</span>
        </h1>
      </Box>
      <Container maxWidth="md" sx={{ mt: 4, mb: 5 }}>
        <Grid2 container spacing={2} className="flex jutify-center">
          <Grid2 size={{ xs: 6, md: 3, sm: 3 }}>
            <Box className="border-2 border-solid border-slate-100 text-center py-5">
              <p className="font-semibold text-lg">Art & Design</p>
              <p className="text-sm text-slate-400">20 Open Positions</p>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3, sm: 3 }}>
            <Box className="border-2 border-solid border-slate-100 text-center py-5">
              <p className="font-semibold text-lg">Health & Fitness</p>
              <p className="text-sm text-slate-400">20 Open Positions</p>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3, sm: 3 }}>
            <Box className="border-2 border-solid border-slate-100 text-center py-5">
              <p className="font-semibold text-lg">Finance & Business</p>
              <p className="text-sm text-slate-400">20 Open Positions</p>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3, sm: 3 }}>
            <Box className="border-2 border-solid border-slate-100 text-center py-5">
              <p className="font-semibold text-lg">Art & Music</p>
              <p className="text-sm text-slate-400">20 Open Positions</p>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3, sm: 3 }}>
            <Box className="border-2 border-solid border-slate-100 text-center py-5">
              <p className="font-semibold text-lg">Marketing</p>
              <p className="text-sm text-slate-400">20 Open Positions</p>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3, sm: 3 }}>
            <Box className="border-2 border-solid border-slate-100 text-center py-5">
              <p className="font-semibold text-lg">Developer</p>
              <p className="text-sm text-slate-400">20 Open Positions</p>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3, sm: 3 }}>
            <Box className="border-2 border-solid border-slate-100 text-center py-5">
              <p className="font-semibold text-lg">Photography</p>
              <p className="text-sm text-slate-400">20 Open Positions</p>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3, sm: 3 }}>
            <Box className="border-2 border-solid border-slate-100 text-center py-5">
              <p className="font-semibold text-lg">Support</p>
              <p className="text-sm text-slate-400">20 Open Positions</p>
            </Box>
          </Grid2>
        </Grid2>
        <Box className="flex justify-center" mt={3}>
          <button
            className="normal-case border-sky-500 rounded-full bg-[#0258f8] text-white px-7 py-2"
            onClick={() => router.push("/jobs")}
          >
            Apply Now
          </button>
        </Box>
      </Container>
    </Box>
  );
}

export default JobCategory;
