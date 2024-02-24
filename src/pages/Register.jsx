import { useState, useEffect } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

import checkValidPassword from "../utils/checkValidPassword";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Register = () => {
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [checkedPassword, setCheckedPassword] = useState({
    error: null,
    message: "",
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(null);
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [isHiddenConfirmPassword, setIsHiddenConfirmPassword] = useState(true);

  const handlePasswordVisibility = () => {
    setIsHiddenPassword(prev => !prev);
  }

  const handleConfirmPasswordVisibility = () => {
    setIsHiddenConfirmPassword(prev => !prev);
  }

  const handleOnChange = (event) => {
    setInputData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handlePasswordOnChange = (event) => {
    setCheckedPassword(checkValidPassword(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // For each 'inputData' field, set the corresponding error to false if the inputData value is a truthy. 
    // Else, set the error to be true.
    Object.keys(inputData).forEach((field) => {
      const value = inputData[field];
      setErrors((prev) => ({ ...prev, [field]: value ? false : true }));
    });

    inputData.password !== inputData.confirmPassword
      ? setIsPasswordMatch(false)
      : setIsPasswordMatch(true);
  };

  const finishSubmit = () => {
    console.log("Form submitted");
  };

  useEffect(() => {
    // Set 'isErrors' to true if 'errors' has at least one truthy value
    const isErrors = Object.values(errors).some((error) => error === true);

    // If the conditions are satisfied, submit the form
    if (!isErrors && !checkedPassword.error && isPasswordMatch) {
      finishSubmit();
    }
  }, [errors, checkedPassword.error, isPasswordMatch]);

  return (
    <div className="h-[calc(100vh-6rem)] flex items-center">
      <Card className="w-[350px] md:w-[423px] dark:border-neutral-800">
        <CardHeader>
          <CardTitle className="mb-3">Create an Account</CardTitle>
          <CardDescription>
            Welcome to Harmony, where teamwork thrives and collaboration
            blossoms.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="grid w-full items-center gap-4">
              {/* First name */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleOnChange}
                  className={
                    errors.firstName && "border-red-500 dark:border-red-400"
                  }
                />
                {/* Error for First Name field */}
                {errors.firstName && (
                  <CardDescription className="text-red-500 dark:text-red-400">
                    First Name field is required
                  </CardDescription>
                )}
              </div>
              {/* Last name */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleOnChange}
                  className={
                    errors.lastName && "border-red-500 dark:border-red-400"
                  }
                />
                {/* Error for Last Name field */}
                {errors.lastName && (
                  <CardDescription className="text-red-500 dark:text-red-400">
                    Last Name field is required
                  </CardDescription>
                )}
              </div>
              {/* Email */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleOnChange}
                  className={
                    errors.email && "border-red-500 dark:border-red-400"
                  }
                />
                {/* Error for Email field */}
                {errors.email && (
                  <CardDescription className="text-red-500 dark:text-red-400">
                    Email field is required
                  </CardDescription>
                )}
              </div>
              {/* Password */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={isHiddenPassword ? "password" : "text"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={(event) => {
                      handleOnChange(event);
                      handlePasswordOnChange(event);
                    }}
                    className={
                      errors.password
                        ? "border-red-500 dark:border-red-400 pr-10"
                        : "pr-10"
                    }
                  />
                  {isHiddenPassword ? (
                    <EyeOpenIcon
                      className="ml-2 h-4 w-4 absolute inset-y-3 right-3 cursor-pointer select-none"
                      onClick={handlePasswordVisibility}
                    />
                  ) : (
                    <EyeClosedIcon
                      className="ml-2 h-4 w-4 absolute inset-y-3 right-3 cursor-pointer select-none"
                      onClick={handlePasswordVisibility}
                    />
                  )}
                </div>
                {/* Error for Password field */}
                {errors.password && (
                  <CardDescription className="text-red-500 dark:text-red-400">
                    Password field is required
                  </CardDescription>
                )}
              </div>
              {/* Confirm Password */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    type={isHiddenConfirmPassword ? "password" : "text"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleOnChange}
                    className={
                      errors.confirmPassword
                        ? "border-red-500 dark:border-red-400 pr-10"
                        : "pr-10"
                    }
                  />
                  {isHiddenConfirmPassword ? (
                    <EyeOpenIcon
                      className="ml-2 h-4 w-4 absolute inset-y-3 right-3 cursor-pointer select-none"
                      onClick={handleConfirmPasswordVisibility}
                    />
                  ) : (
                    <EyeClosedIcon
                      className="ml-2 h-4 w-4 absolute inset-y-3 right-3 cursor-pointer select-none"
                      onClick={handleConfirmPasswordVisibility}
                    />
                  )}
                </div>
                {/* Error for Confirm Password field */}
                {errors.confirmPassword && (
                  <CardDescription className="text-red-500 dark:text-red-400">
                    Confirm Password field is required
                  </CardDescription>
                )}
                {/* Error for when passwords do not match */}
                {isPasswordMatch === false &&
                  !errors.confirmPassword &&
                  !errors.password && (
                    <CardDescription className="text-red-500 dark:text-red-400">
                      Passwords do not match
                    </CardDescription>
                  )}
              </div>
              {/* Error for when the password does not meet the requirements */}
              {checkedPassword.error && (
                <CardDescription className="text-red-500 dark:text-red-400">
                  {checkedPassword.message}
                </CardDescription>
              )}
              {/* Create Account Button */}
              <div className="flex justify-end mt-3">
                <Button type="submit" variant="outline">
                  Create
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-start">
          <CardDescription>
            Already have an account?{" "}
            <span className="underline cursor-pointer">Log In</span>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
