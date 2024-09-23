import { Box, Container, Divider } from "@mui/material";
import React from "react";

function JobStats() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box className="flex justify-evenly">
        <Box className="text-center">
          <h1 className="text-2xl font-semibold">12,034</h1>
          <p>New Jobs Added</p>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem/>
        <Box className="text-center">
          <h1 className="text-2xl font-semibold">1,234</h1>
          <p>Active Recruiters</p>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem/>
        <Box className="text-center">
          <h1 className="text-2xl font-semibold">30,000+</h1>
          <p>Companies</p>
        </Box>
      </Box>
      <Container maxWidth="md">
        <Divider sx={{ mt: 3, px: 3 }} />
      </Container>
    </Container>
  );
}

export default JobStats;
