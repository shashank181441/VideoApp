import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/api";

function Register() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      username: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }
    if (data.coverImage && data.coverImage.length > 0) {
      for (let i = 0; i < data.coverImage.length; i++) {
        formData.append("coverImage", data.coverImage[i]);
      }
    }

    console.log(Array.from(formData));
    try {
      const registerData = await registerUser(formData);
      console.log(registerData);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Full Name"
          {...register("fullName")}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
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
        <input
          type="file"
          placeholder="Avatar"
          {...register("avatar")}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="file"
          multiple
          placeholder="Cover Image"
          {...register("coverImage")}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
        <div className="justify-center text-center mt-2">
          <p className="opacity-50">
            If you already have an account,{" "}
            <span className="text-blue-900">Log in</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
