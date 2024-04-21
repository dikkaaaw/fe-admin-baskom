import { useState, useEffect } from "react";
import { Label, TextInput, Card, FileInput } from "flowbite-react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);

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
          <h1 className="mb-4 text-3xl font-bold font-poppins">
            Account Settings
          </h1>
          <Card className="max-w-6xl px-2 py-6">
            <div className="container flex flex-row justify-between gap-4">
              <div className="w-1/2">
                <p className="font-semibold text-md font-poppins">
                  Edit your profile
                </p>
                <form className="flex flex-col max-w-md gap-4">
                  <div>
                    <div className="mb-2 font-poppins">
                      <Label htmlFor="name" value="Full Name" />
                    </div>
                    <TextInput
                      className="font-poppins"
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 font-poppins">
                      <Label htmlFor="birthday" value="Birthday" />
                    </div>
                    <TextInput
                      className="font-poppins"
                      id="birthday"
                      type="date"
                      value="1999-06-01"
                      disabled
                    />
                  </div>
                  <div>
                    <div className="mb-2 font-poppins">
                      <Label htmlFor="email" value="Your Email" />
                    </div>
                    <TextInput
                      className="font-poppins"
                      id="email"
                      type="email"
                      value="dika@gmail.com"
                      disabled
                    />
                  </div>
                  <div>
                    <div className="mb-2 font-poppins">
                      <Label htmlFor="phone" value="Phone Number" />
                    </div>
                    <TextInput
                      className="font-poppins"
                      id="phone"
                      type="text"
                      addon="+62"
                      placeholder="123 456 789"
                      color="warning"
                      helperText={
                        <>
                          <span className="font-medium">Oops!</span> This field
                          must be filled with numbers only.
                        </>
                      }
                      required
                    />
                  </div>
                  <button
                    className="p-3 text-sm font-medium text-white rounded-lg font-poppins bg-slate-800"
                    type="submit"
                  >
                    Save change
                  </button>
                </form>
              </div>
              <div className="w-1/3">
                <br />
                <img
                  src="/logo-app.png"
                  alt="photo-profile"
                  className="w-20 h-20 lg:w-40 lg:h-40"
                />
                <div className="mt-4">
                  <Label
                    htmlFor="file-upload-helper-text"
                    value="Change avatar"
                  />
                </div>
                <FileInput
                  id="file-upload-helper-text"
                  helperText="PNG or JPG (Max. 2 MB)."
                  sizing="sm"
                />
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default UserProfile;
