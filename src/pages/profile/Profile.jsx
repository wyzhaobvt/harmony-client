import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EditProfilePictureDialog } from "./EditProfilePictureDialog";
import StatusMessage from "../../components/ui/status-message";
import { ProfilePicture } from "../../components/ProfilePicture";
import { getUser, updateUser } from "../../utils/db";

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState("");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    email: null
  });

  // Get user data when page loads
  useEffect(() => {
    initializeData();
  }, []);
  
  const initializeData = async () => {
    const data = await getUser();

    if (!data.success) {
      console.log(data.message);
      return;
    }

    const user = data.data[0];
    
    setProfilePicture(user.profileURL);
    setUserData({
      firstName: user.username.split(" ")[0],
      lastName: user.username.split(" ").slice(1).join(" "),
      email: user.email
    })
  }

  const handleSetProfilePicture = (value) => {
    setProfilePicture(value);
  }

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

  const finishSubmit = async () => {
    const username = `${userData.firstName} ${userData.lastName}`
    const data = await updateUser(username, userData.email);

    if (!data.success) {
      console.log(data.message);
      return;
    }

    initializeData();
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
          <div className="flex justify-center mb-[34px]">
            <div className="relative">
              {/* Profile Picture */}
              <ProfilePicture
                image={profilePicture}
                className="size-[250px]"
              />
              {/* Change Profile Picture Button */}
              <EditProfilePictureDialog
                profilePicture={profilePicture}
                handleSetProfilePicture={handleSetProfilePicture}
                avatarLink={profilePicture}
                className="absolute bottom-0 right-5"
              />
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
              onInput={handleOnChange}
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
              onInput={handleOnChange}
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
              onInput={handleOnChange}
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
