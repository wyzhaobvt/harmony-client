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
  return (
    <Card className="w-[350px] md:w-[428px]">
      <CardHeader>
        <CardTitle className="mb-3">Log in</CardTitle>
        <CardDescription>
          Welcome to Harmony, where teamwork thrives and collaboration blossoms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            {/* Email */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            {/* Password */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end pb-3">
        <Button variant="outline">Log In</Button>
      </CardFooter>
      <CardFooter className="flex justify-start">
        <CardDescription>
          Don't have an account? <span className="underline cursor-pointer">Sign Up</span>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default Login;
