import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import useTitle from "../../hooks/useTitle";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    useTitle('Login - HomeHive');

    const { signInUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    // navigation system
    const navigate = useNavigate();
    const location = useLocation();
    const to = location?.state || "/";
    
    // handle login
    const onSubmit = data => {
        console.log("Login Form submitted:", data);
        const { email, password } = data;
        signInUser(email, password)
            .then((result) => {
                if (result.user) {
                    toast.success("Login successful!"); // Showing success toast
                    setTimeout(() => {
                        navigate(to);
                    }, 500); // Delaying navigation so toast is visible
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Email or password is incorrect!"); // <-- Showing error toast
            });
    };

    return (
        <div>
            <Toaster /> {/* Added this line to render toasts */}
            <div className="pt-10 bg-base-200 min-h-[calc(100vh-64px)]">
                <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" className="input" placeholder="Email" {...register("email", { required: true })} />
                                {errors.email && <p className="text-red-500 text-xs">This field is required</p>}
                                <label className="label">Password</label>
                                <input type="password" className="input" placeholder="Password" {...register("password", { required: true })} />
                                {errors.password && <p className="text-red-500 text-xs">This field is required</p>}
                                {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>
                        <p className="text-center">Don't have an account? <Link className="text-blue-600 font-bold" to="/register">Create One</Link></p>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;