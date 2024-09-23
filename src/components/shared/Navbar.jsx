"use client";
import { Avatar, Button, Fade, Paper, Popper, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import useStorage from "@/customHook/useStorage";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Navbar() {
  const pathname = usePathname(); // Get current pathname
  const { getItem } = useStorage(); // using custom hook
  const router = useRouter();

  const [token, setToken] = useState(null); // Local state for token
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  useEffect(() => {
    // Set token from storage on client side
    const storedToken = getItem("token", "session");
    setToken(storedToken);
  }, [getItem]);

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    Cookies.remove("authToken");
    router.push("/login");
  };

  return (
    <div className="Navbar">
      <div className="bg-white">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
          <div>
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#0258f8]">Pulse</span>
            </h1>
          </div>
          <div className="flex items-center gap-12">
            {pathname === "/login" || pathname === "/signup" || !token ? (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <button variant="outlined" className="normal-case px-3 py-2 rounded-md" style={{border:"1px solid rgb(219 219 219)"}}>
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="bg-[#0258f8] rounded-md hover:bg-[#0259e9] text-white normal-case px-3 py-2">
                    Signup
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex font-medium items-center gap-5">
                  <li>
                    <Link
                      href="/"
                      className={`${pathname === "/" ? "text-[#0258f8]" : ""}`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/jobs"
                      className={`${
                        pathname.includes("/jobs") ? "text-[#0258f8]" : ""
                      }`}
                    >
                      Jobs
                    </Link>
                  </li>
                </ul>
                <div>
                  <Avatar
                    className="cursor-pointer"
                    alt="Remy Sharp"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1060&t=st=1727077800~exp=1727078400~hmac=ecb904dab54de3af1ec2cd23cf436d900016376d88ebac496a2fe361bab91a9b"
                    onClick={handleClick("bottom-end")}
                  />

                  <Popper
                    // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                    sx={{ zIndex: 1200 }}
                    open={open}
                    anchorEl={anchorEl}
                    placement={placement}
                    transition
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <Typography
                            className="cursor-pointer"
                            sx={{ p: 2 }}
                            onClick={handleLogout}
                          >
                            <LogoutIcon /> Logout
                          </Typography>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
