import { useState, useEffect } from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import { FaSearch } from "react-icons/fa";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="mb-8">
        <p className="text-3xl font-bold font-poppins">Welcome, Admin!</p>
        <p className="text-sm font-medium font-poppins text-slate-500">
          Check out latest updates
        </p>
      </div>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Card />
          <div>
            <div className="py-5 mx-auto lg:flex items-center text-center justify-between">
              <h2 className="font-bold text-lg mb-4 font-poppins">
                Status Pembayaran
              </h2>
              <div className="text-dark-blue flex items-center justify-between gap-8">
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    display: "inline-block",
                    marginTop: "8px",
                  }}
                >
                  <IconButton onClick={handleClick} size="medium">
                    <FilterList />
                  </IconButton>
                  <Box
                    sx={{
                      display: "inline-block",
                      paddingRight: "14px",
                      fontFamily: "poppins",
                    }}
                  >
                    Filter
                  </Box>
                </Box>
                <Menu
                  className="justify-center items-center mt-2"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <div className="flex justify-center items-center ps-2">
                    <Checkbox />
                    <MenuItem
                      style={{ fontFamily: "poppins", fontWeight: "500" }}
                      onClick={handleClose}
                    >
                      Sudah Bayar
                    </MenuItem>
                  </div>
                  <div className="flex justify-center items-center ps-2">
                    <Checkbox />
                    <MenuItem
                      style={{ fontFamily: "poppins", fontWeight: "500" }}
                      onClick={handleClose}
                    >
                      Belum Bayar
                    </MenuItem>
                  </div>
                </Menu>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <FaSearch className="mr-4 mb-2" />
                  <TextField
                    id="input-with-sx"
                    className="font-poppins"
                    label="Search by name"
                    variant="standard"
                  />
                </Box>
              </div>
            </div>
            <Table />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
