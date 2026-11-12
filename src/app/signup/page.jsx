"use client";
import { authClient, signIn } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { useState } from "react";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const SignUpPage = () => {
  const [password, setPassword] = useState("")
  const onSubmit = async (e) => {
    
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      user[key] = value.toString();
    });
    // alert(`Form submitted with: ${JSON.stringify(user, null, 2)}`);
    // console.log(data);

    //? sign up korar por duita jinis pai, data and error
    const { data, error } = await authClient.signUp.email({
      email: user.email,
      name: user.name,
      password: user.password,
      //callbackURL: "/" //? A URL to redirect to after the user verifies their email (optional)
    });
    //check if sign up is successful
    // console.log(data, error);
    if (data) {
      redirect("/");
    } else if (error) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <div className="container mx-auto m-6 ">
      <h2 className="flex justify-center text-4xl">Create Account</h2>
      <p className="mt-2 mb-5 flex justify-center text-gray-400">
        Start your adventure with Wanderlust
      </p>
      <Card className="m-10 max-w-lg mx-auto flex justify-center items-center border p-5 rounded-none">
        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          {/* full name */}
          <TextField
            isRequired
            name="name"
            type="text"
            // validate={(value) => {
            //   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            //     return "Please enter a valid email address";
            //   }
            //   return null;
            // }}
          >
            <Label className="text-lg">Full Name</Label>
            <div className="relative w-full">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl z-10" />

              <Input placeholder="Enter your name" className="w-full pl-10 text-base" />
            </div>

            <FieldError />
          </TextField>

          {/* email address */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-lg">Email</Label>
            <Input placeholder="john@example.com"  className="text-base"/>
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            onChange={setPassword}
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-lg">Create Password</Label>
            <Input placeholder="Create your password"  className="text-base"/>
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="confirmpassword"
            type="password"
            validate={(value) => {
              

              if (value !== password) { 
                return "Passwords do not match"
              }
              return null;
            }}
          >
            <Label className="text-lg">Confirm Password</Label>
            <Input placeholder="Confirm your Password"  className="text-base"/>
            <FieldError />
          </TextField>

          <div className="flex justify-center gap-2">
            <Button
              type="submit"
              className="bg-cyan-600 rounded-none w-full text-base min-h-14"
            >
              Create Account
            </Button>
          </div>
        </Form>
        {/* or continue with */}
        <div className="flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-gray-300"></div>

          <span className="shrink-0 text-gray-500">Or Continue With</span>

          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        <Button
        onClick={signIn}
          type="submit"
          className="bg-white border text-black rounded-none w-full text-base min-h-14"
        >
          <FcGoogle className="!w-6 !h-6 shrink-0" /> Sign In With Google
        </Button>

              <div className="flex text-lg">
                <p>Already have an account? </p> <Link href='/login' className="text-blue-500">Sign In</Link>
              </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
