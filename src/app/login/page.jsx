"use client";
import { authClient, signIn } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Card,
  Checkbox,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

const LoginPage = () => {
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
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      //callbackURL: "/" //? A URL to redirect to after the user verifies their email (optional)
    });
    //check if sign up is successful
    // console.log("Signin successful", data); 
    if (data) {
      redirect("/");
    } else if (error) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <div className="container mx-auto m-6 ">
      <h2 className="flex justify-center text-4xl">Welcome Back</h2>
      <p className="mt-2 mb-5 flex justify-center text-gray-400">
        Resume your adventure with Wanderlust
      </p>

      <Card className="m-10 max-w-lg mx-auto flex justify-center items-center border p-8 rounded-none">
        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
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
            <Input placeholder="Enter your email" className="text-base " />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            // validate={(value) => {
            //   if (value.length < 8) {
            //     return "Password must be at least 8 characters";
            //   }
            //   if (!/[A-Z]/.test(value)) {
            //     return "Password must contain at least one uppercase letter";
            //   }
            //   if (!/[0-9]/.test(value)) {
            //     return "Password must contain at least one number";
            //   }
            //   return null;
            // }}
          >
            <Label className="text-lg">Password</Label>
            <Input placeholder="Enter your password" className="text-base" />
            {/* <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description> */}

            <div className="flex justify-between m-1">
              <div>
                <Checkbox name="basic-terms">
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <p className="text-lg text-gray-400">Remember me</p>
                  </Checkbox.Content>
                </Checkbox>
              </div>

              <p className="text-lg text-blue-400">Forgot Password</p>
            </div>
          </TextField>

          <div className="flex justify-center gap-2">
            <Button
              type="submit"
              className="bg-cyan-600 rounded-none w-full text-base min-h-14"
            >
              Login
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
          <FcGoogle className="w-6! h-6! shrink-0" /> Continue With Google
        </Button>

        <div className="flex text-lg">
          <p>Don't have an account? </p>{" "}
          <Link href="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
