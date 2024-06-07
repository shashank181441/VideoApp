import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/api";

function Register() {
    const { register, handleSubmit } = useForm({
        defaultValues:{
            email: "",
            password: "",
            fullName: "",
            username: ""
        }
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Username" {...register("username")} />
                <input type="text" placeholder="Full Name" {...register("fullName")} />
                <input type="email" placeholder="Email" {...register("email")} />
                <input type="password" placeholder="Password" {...register("password")} />
                <input type="file" placeholder="Avatar" {...register("avatar")} />
                <input type="file" multiple placeholder="Cover Image" {...register("coverImage")} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
