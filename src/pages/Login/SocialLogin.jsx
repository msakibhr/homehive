import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
    // const { googleLogin, twitterLogin, facebookLogin } = useAuth();
    const { googleLogin, githubLogin, facebookLogin } = useAuth();

    // navigation system
    const navigate = useNavigate();
    const location = useLocation();

    const to = location?.state || "/";

    const handleSocialLogin = (socialProvider) => {
        socialProvider().then((result) => {
            if (result.user) {
                navigate(to);
            }
        })
        .catch((error) => {
            console.error("Social login error:", error);
            // The loading state will be reset by the finally block in AuthProvider
        });
    };

    return (
        <div>
            <p className="divider">Or, continue with</p>
            {/* <p className="divider">Or,</p> */}
            <div className="flex justify-evenly">
                {/* <button
                    onClick={() => handleSocialLogin(googleLogin)}
                    className="btn btn-secondary btn-sm btn-outline"
                >
                    Google
                </button> */}

                {/* Google */}
                <button onClick={() => handleSocialLogin(googleLogin)} className="btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    {/* Login with Google */}
                    Google
                </button>

                {/* GitHub */}
                <button onClick={() => handleSocialLogin(githubLogin)} className="btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="GitHub logo" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    {/* Login with GitHub */}
                    GitHub
                </button>

                {/* <button
                    onClick={() => handleSocialLogin(twitterLogin)}
                    className="btn btn-accent btn-sm btn-outline"
                >
                    Twitter
                </button> */}

                {/* X */}
                {/* <button onClick={() => handleSocialLogin(twitterLogin)} className="btn bg-black text-white border-black">
                    <svg aria-label="X logo" width="16" height="12" viewBox="0 0 300 271" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" /></svg>
                    {/* Login with X */}
                    {/* X */}
                {/* </button> */}

                {/* Facebook */}
                <button onClick={() => handleSocialLogin(facebookLogin)} className="btn bg-[#1877f3]# bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Facebook logo" width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="25" fill="#1877F3"/>
                        <path d="M32.5 26.25H27.5V40H22.5V26.25H20V21.25H22.5V18.75C22.5 16.2647 24.5147 14.25 27 14.25H32.5V19.25H29C28.7239 19.25 28.5 19.4739 28.5 19.75V21.25H32.5V26.25Z" fill="white"/>
                    </svg>
                    {/* Login with Facebook */}
                    Facebook
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;