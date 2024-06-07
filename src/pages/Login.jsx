import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/api";

function Login() {
    const { register, handleSubmit } = useForm({
        defaultValues:{
            email: "",
            password: ""
        }
    });
    const onSubmit = async (data)=>{
        console.log(data);
        try {
            const loggedInUser = await loginUser(data)
            console.log(loggedInUser)
            if(loggedInUser){
                localStorage.setItem("accessToken", loggedInUser.data.data.accessToken)
                localStorage.setItem("refreshToken", loggedInUser.data.data.refreshToken)
            }
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email")}/>
        <input type="password" {...register("password")} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
