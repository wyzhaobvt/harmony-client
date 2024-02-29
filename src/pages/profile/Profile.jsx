import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AvatarIcon } from "@radix-ui/react-icons";
import { EditProfilePicture } from "./EditProfilePicture";

const Profile = () => {
  const handleOnChange = () => {
    console.log("Handle change");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Profile updated");
  };

  return (
    <div className="h-[calc(100vh-6rem)] w-[250px] sm:w-[420px] flex flex-col justify-center">
      <h1 className="text-2xl font-semibold flex justify-center mb-[34px]">
        Profile
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          {/* Profile Picture */}
          <div className="flex justify-center mb-[34px]">
            <div className="bg-white border border-neutral-200 h-[250px] w-[250px] rounded-full flex items-center justify-center relative">
              <AvatarIcon className="text-black w-28 h-28" />
              {/* Change Profile Picture Button */}
              <EditProfilePicture />
            </div>
          </div>
          {/* First Name */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              onChange={handleOnChange}
            />
          </div>
          {/* Last Name */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              onChange={handleOnChange}
            />
          </div>
          {/* Email */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleOnChange}
            />
          </div>
          {/* Update Profile Button */}
          <div className="flex mt-3">
            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
