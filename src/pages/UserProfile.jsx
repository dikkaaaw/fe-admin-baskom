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
          <h1 className="text-3xl font-bold font-poppins mb-4">
            Account Settings
          </h1>
          <Card className="py-10 max-w-6xl">
            <div className="container flex flex-row justify-between gap-4">
              <div className="w-1/2">
                <p className="text-md font-semibold font-poppins">
                  Edit your profile
                </p>
                <form className="flex max-w-md flex-col gap-4">
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
                    className="font-medium text-sm font-poppins text-white rounded-lg bg-slate-800 p-3"
                    type="submit"
                  >
                    Save change
                  </button>
                </form>
              </div>
              <div>
                <div>
                  <Label
                    htmlFor="file-upload-helper-text"
                    value="Change avatar"
                  />
                </div>
                <FileInput
                  id="file-upload-helper-text"
                  helperText="PNG or JPG (Max. 2 MB)."
                />
              </div>
              <div>
                <br />
                <Card
                  className="w-40 h-40"
                  imgAlt="profile-photo"
                  imgSrc="/images/blog/image-1.jpg"
                ></Card>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default UserProfile;
