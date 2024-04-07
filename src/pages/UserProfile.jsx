import { Label, TextInput, Card, FileInput } from "flowbite-react";

const UserProfile = () => {
  return (
    <>
      <h1 className="text-3xl font-bold font-poppins mb-4">Account Settings</h1>
      <Card className="py-10 max-w-6xl">
        <div className="container flex flex-row justify-between gap-4">
          <div className="w-1/2">
            <p>Edit your profile</p>
            <form className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Full Name" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="birthday" value="Birthday" />
                </div>
                <TextInput
                  id="birthday"
                  type="date"
                  value="1999-06-01"
                  disabled
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  value="johndoe@gmail.com"
                  disabled
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phone" value="Phone Number" />
                </div>
                <TextInput
                  id="phone"
                  type="text"
                  addon="+62"
                  value="123 456 789"
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
              <Label htmlFor="file-upload-helper-text" value="Change avatar" />
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
  );
};

export default UserProfile;
