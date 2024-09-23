"use client";
import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Button, Snackbar } from "@mui/material";
import axios from "axios";
import { redirect } from "next/navigation";

function SignIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.status === 201) {
        setAlert(true);
        setAlertMessage("Sign Up successfull, Login to continue..");
        setTimeout(() => {
          redirect("/");
        }, 1000);
      } else {
        setAlert(true);
        setAlertMessage("Unexpected response status: " + res.status);
      }
    } catch (error) {
      // Check if error.response is available (for HTTP errors)
      if (error.response) {
        const status = error.response.status;
        const errorMessage =
          error.response.data.message || "Something went wrong";
        if (status === 400) {
          setAlert(true);
          setAlertMessage(errorMessage);
        } else {
          setAlert(true);
          setAlertMessage("Server error: " + status + " " + errorMessage);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setAlert(true);
        setAlertMessage("No response from server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setAlert(true);
        setAlertMessage("Error: " + error.message);
      }
    } finally {
    }
  };

  return (
    <Box className="min-h-screen flex">
      <Box className="w-full max-w-md p-8 bg-white flex flex-col justify-center">
        <Box className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-sm mt-2">Sign In to your account</p>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="john"
              required
            />
          </Box>
          <Box className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="you@example.com"
              required
            />
          </Box>

          <Box className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </Box>

          <Box className="flex items-center justify-end mb-4">
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </Box>

          <Button
            type="submit"
            className="w-full normal-case py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign in
          </Button>
        </form>

        <Box className="mt-6 flex items-center justify-center">
          <span className="text-sm text-gray-500">Or continue with</span>
        </Box>

        <Box className="mt-4 flex justify-center gap-4">
          <Button
            type="Button"
            className="flex normal-case items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-600 hover:bg-gray-100"
          >
            <GoogleIcon className="w-4 h-4" />
            Google
          </Button>

          <Button
            type="Button"
            className="flex normal-case items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-600 hover:bg-gray-100"
          >
            <GitHubIcon className="w-4 h-4" />
            GitHub
          </Button>
        </Box>
      </Box>

      {/* Right Side - Image */}
      <Box className="hidden lg:block  bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt="Laptop and desk"
          className="object-cover w-full h-full"
        />
      </Box>
      <Snackbar
        autoHideDuration={5000}
        onClose={() => setAlert(false)}
        open={alert}
        message={alertMessage}
        key={"top right"}
      />
    </Box>
  );
}

export default SignIn;
