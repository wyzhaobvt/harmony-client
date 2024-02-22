import { useState } from "react";

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
    firstNameValue: null,
    lastNameValue: null,
    emailValue: null,
    passwordValue: null,
    confirmPasswordValue: null
  });

  const [errors, setErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleOnChange = (event, key) => {
    setInputData(prev => ({ ...prev, [key]: event.target.value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const fieldsToValidate = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];

    fieldsToValidate.forEach(field => {
      const value = inputData[`${field}Value`];
      setErrors(prev => ({ ...prev, [`${field}Error`]: !value ? true : false }));
    });

    inputData.passwordValue !== inputData.confirmPasswordValue
      ? setIsPasswordMatch(false)
      : setIsPasswordMatch(true);

    console.log("Form submitted");
  };

  return (
    <Card className="w-[350px] md:w-[423px]">
      <CardHeader>
        <CardTitle className="mb-3">Create an Account</CardTitle>
        <CardDescription>
          Welcome to Harmony, where teamwork thrives and collaboration blossoms.
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
                placeholder="First Name"
                onChange={(event) => handleOnChange(event, "firstNameValue")}
                className={errors.firstNameError && "border-red-900"}
              />
              {errors.firstNameError && (
                <CardDescription className="text-red-900">
                  First Name field is required
                </CardDescription>
              )}
            </div>
            {/* Last name */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                onChange={(event) => handleOnChange(event, "lastNameValue")}
                className={errors.lastNameError && "border-red-900"}
              />
              {errors.lastNameError && (
                <CardDescription className="text-red-900">
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
                placeholder="Email"
                onChange={(event) => handleOnChange(event, "emailValue")}
                className={errors.emailError && "border-red-900"}
              />
              {errors.emailError && (
                <CardDescription className="text-red-900">
                  Email field is required
                </CardDescription>
              )}
            </div>
            {/* Password */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(event) => handleOnChange(event, "passwordValue")}
                className={errors.passwordError && "border-red-900"}
              />
              {errors.passwordError && (
                <CardDescription className="text-red-900">
                  Password field is required
                </CardDescription>
              )}
            </div>
            {/* Confirm Password */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={(event) =>
                  handleOnChange(event, "confirmPasswordValue")
                }
                className={errors.confirmPasswordError && "border-red-900"}
              />
              {errors.confirmPasswordError && (
                <CardDescription className="text-red-900">
                  Confirm Password field is required
                </CardDescription>
              )}
              {!isPasswordMatch && !errors.confirmPasswordError && !errors.passwordError && (
                <CardDescription className="text-red-900">
                  Passwords do not match
                </CardDescription>
              )}
            </div>
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
  );
};

export default Register;
