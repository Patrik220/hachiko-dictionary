"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/auth/register`,
          values
        )
        .then((res) => {
          console.log("Response", res);
          const { accessToken, refreshToken } = res.data.data;
          const bearer = `Bearer ${accessToken}`;
          axios.defaults.headers.Authorization = bearer;
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("accessToken", accessToken);

          localStorage
            .setItem(
              "userData",
              JSON.stringify({
                accountId: res.data.data.accountId,
                email: res.data.data.email,
                username: res.data.data.username,
                role: res.data.data.role,
              })
            )
            .catch((err) => {
              console.log("Register error.", err);
            });

          localStorage.setItem("difficultyData", "medium");

          if (res.status === 200) {
            window.location.href = "/main";
          }
          return res.data;
        });
      setLoading(false);
      console.log("Values: " + values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="my-10">
      <div className="flex flex-col w-full">
        <label className="py-1 text-sm text-white" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="px-4 py-2 text-black bg-white rounded-md outline-none focus:ring-2 focus:ring-white"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="py-1 text-sm text-white" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="px-4 py-2 text-black bg-white rounded-md outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      <div className="flex flex-col w-full">
        <label className="py-1 text-sm text-white" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="px-4 py-2 text-black bg-white rounded-md outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      <div className="flex flex-col w-full">
        <label className="py-1 text-sm text-white" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          className="px-4 py-2 text-black bg-white rounded-md outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      <button
        className="my-2 bg-white text-primary px-4 py-2 rounded-md transition hover:translate-x-2 text-sm"
        type="submit"
      >
        {!loading && "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
