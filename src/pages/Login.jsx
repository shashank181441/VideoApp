import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/api";

function Login() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const loggedInUser = await loginUser(data);
      console.log(loggedInUser);
      if (loggedInUser) {
        localStorage.setItem("accessToken", loggedInUser.data.data.accessToken);
        localStorage.setItem(
          "refreshToken",
          loggedInUser.data.data.refreshToken
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <div className="justify-center text-center mt-2">
          <span className="opacity-50">If you don't have an account, </span> 
          <span className="text-blue-900">Register</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
