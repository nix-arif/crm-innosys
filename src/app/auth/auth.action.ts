"use server";

import { z } from "zod";
import { signInSchema } from "./SignInForm";
import { signUpSchema } from "./SignUpForm";
import prisma from "@/lib/prisma";
import { compare, genSalt, hash } from "bcrypt-ts";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";

export const signIn = async (values: z.infer<typeof signInSchema>) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: values.email },
    });

    if (!user)
      return { success: false, error: "Invalid Credentials!", message: "" };

    const isPasswordMatch = await compare(values.password, user.hashPassword);

    if (!isPasswordMatch)
      return { success: false, error: "Invalid Credentials!", message: "" };

    // Successfully login
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, error: "", message: "" };
  } catch (error) {
    console.log(error);
    return { success: false, error, message: "" };
  }
};

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (existingUser)
      return { success: false, error: "User already exists", message: "" };

    const salt = await genSalt(10);
    const hashPassword = await hash(values.password, salt);

    const user = await prisma.user.create({
      data: {
        email: values.email,
        username: values.username,
        hashPassword,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: true, error: "", message: "User has been created" };
  } catch (error) {
    return { success: false, error: "Something went wrong", message: "" };
  }
};
