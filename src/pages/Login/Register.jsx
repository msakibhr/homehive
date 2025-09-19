import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import useTitle from "../../hooks/useTitle";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    useTitle('Register - HomeHive');

    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    // navigation system
    const navigate = useNavigate();
    const to = "/";

    const onSubmit = (data) => {
        console.log("Registration Form submitted:", data);
        const { email, password, image, fullName } = data;

        //create user and update profile
        createUser(email, password)
            .then(() => {
                updateUserProfile(fullName, image)
                    .then(() => {
                        toast.success("Registration successful!"); // Showing success toast
                        setTimeout(() => {
                            navigate(to);
                        }, 500); // Delaying navigation so toast is visible
                    });
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Toaster /> {/* Added this line to render toasts */}
            <div className="pt-10 bg-base-200 min-h-[calc(100vh-64px)]">
                <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" className="input" placeholder="Name" {...register("name")} />
                                <label className="label">Email</label>
                                <input type="email" className="input" placeholder="Email" {...register("email", { required: true })} />
                                {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
                                <label className="label">Photo URL</label>
                                <input type="text" className="input" placeholder="Photo URL" {...register("photo")} />
                                <label className="label">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="input"
                                        placeholder="Password"
                                        {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be of at least 6 characters",
                                        },
                                        validate: {
                                            hasUpperCase: (value) =>
                                                /[A-Z]/.test(value) || "Must include at least one uppercase letter",
                                            hasLowerCase: (value) =>
                                                /[a-z]/.test(value) || "Must include at least one lowercase letter",
                                        },
                                    })} />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <FaEye />
                                        ) : (
                                            <FaEyeSlash />
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                        </form>
                        <p className="text-center">Already have an account? <Link className="text-blue-600 font-bold" to="/login">Please Login</Link></p>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;