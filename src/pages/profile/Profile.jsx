import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AvatarIcon } from "@radix-ui/react-icons";
import { EditProfilePictureDialog } from "./EditProfilePictureDialog";
import StatusMessage from "../../components/ui/status-message";

// Dummy data. Will be replaced by data of current user from database.
const user = {
  firstName: "John",
  lastName: "Doe",
  email: "jdoe@email.com"
}

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });

  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    email: null
  });

  const handleOnChange = (event) => {
    setUserData(prev => ({ ...prev, [event.target.name]: event.target.value }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // For each 'userData' field, set the corresponding error to false if the inputData value is a truthy.
    // Else, set the error to be true.
    Object.keys(userData).forEach((field) => {
      const value = userData[field];
      setErrors((prev) => ({ ...prev, [field]: value ? false : true }));
    });
  };

  const finishSubmit = () => {
    console.log("Profile updated");
  }

  useEffect(() => {
    // Set 'isErrors' to true if 'errors' has at least one truthy value or one null value
    const isErrors = Object.values(errors).some(
      (error) => error === true || error === null
    );

    if (!isErrors) {
      finishSubmit();
    }
  }, [errors]);

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
              <EditProfilePictureDialog />
            </div>
          </div>
          {/* First Name */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              defaultValue={userData.firstName}
              onChange={handleOnChange}
            />
            {/* Error for First Name field */}
            <StatusMessage
              error={errors.firstName}
              message="First Name field is required"
            />
          </div>
          {/* Last Name */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              defaultValue={userData.lastName}
              onChange={handleOnChange}
            />
            {/* Error for Last Name field */}
            <StatusMessage
              error={errors.lastName}
              message="Last Name field is required"
            />
          </div>
          {/* Email */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              defaultValue={userData.email}
              onChange={handleOnChange}
            />
            {/* Error for Email field */}
            <StatusMessage
              error={errors.email}
              message="Email field is required"
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
