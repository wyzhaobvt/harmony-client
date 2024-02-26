import { useState, useEffect } from "react";

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

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null
  });

  const handleOnChange = (event) => {
    setInputData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // For each 'inputData' field, set the corresponding error to false if the inputData value is a truthy. 
    // Else, set the error to be true.
    Object.keys(inputData).forEach((field) => {
      const value = inputData[field];
      setErrors((prev) => ({ ...prev, [field]: value ? false : true }));
    });
  };

  const finishSubmit = () => {
    console.log("Logged in");
  }

  useEffect(() => {
    // Set 'isErrors' to true if 'errors' has at least one truthy value or one null value
    const isErrors = Object.values(errors).some((error) => error === true || error === null);

    // If the condition is satisfied, submit the form
    if (!isErrors) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <div className="h-[calc(100vh-6rem)] flex items-center">
      <Card className="w-[350px] md:w-[428px] dark:border-neutral-800">
        <CardHeader>
          <CardTitle className="mb-3">Log in</CardTitle>
          <CardDescription>
            Welcome to Harmony, where teamwork thrives and collaboration
            blossoms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
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
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleOnChange}
                  className={
                    errors.password && "border-red-500 dark:border-red-400"
                  }
                />
                {errors.password && (
                  <CardDescription className="text-red-500 dark:text-red-400">
                    Password field is required
                  </CardDescription>
                )}
              </div>
              {/* Log in Button */}
              <div className="flex justify-end mt-3">
                <Button type="submit" variant="outline">
                  Log In
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-start">
          <CardDescription>
            Don't have an account?{" "}
            <span className="underline cursor-pointer">Sign Up</span>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
