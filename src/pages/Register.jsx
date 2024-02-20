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
  return (
    <Card className="w-[350px] md:w-[423px]">
      <CardHeader>
        <CardTitle className="mb-3">Create an Account</CardTitle>
        <CardDescription>
          Welcome to Harmony, where teamwork thrives and collaboration blossoms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            {/* First name */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="First Name" />
            </div>
            {/* Last name */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Last Name" />
            </div>
            {/* Email */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" validate />
            </div>
            {/* Password */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Password" />
            </div>
            {/* Confirm Password */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" placeholder="Confirm Password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end pb-3">
        <Button variant="outline">Create</Button>
      </CardFooter>
      <CardFooter className="flex justify-start">
        <CardDescription>
          Already have an account? <span className="underline cursor-pointer">Log In</span>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default Register;