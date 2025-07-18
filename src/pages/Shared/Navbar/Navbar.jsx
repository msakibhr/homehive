import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
    const { logout, user, loading } = useAuth();
    console.log(user);

    return (
        <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {/* <li><Link to="/">Home</Link></li>
                        <li><Link to="/update-profile">Update Profile</Link></li> */}
                        <li><a href="/">Home</a></li>
                        <li><a href="/update-profile">Update Profile</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl" href="/">HomeHive</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {/* <li><Link to="/">Home</Link></li>
                    <li><Link to="/update-profile">Update Profile</Link></li> */}
                    <li><a href="/">Home</a></li>
                    <li><a href="/update-profile">Update Profile</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    loading ? (
                        <div className="flex items-center">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : user ?
                        <div className="flex items-center gap-2">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" data-tip={user?.displayName || "No Name"}>
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoURL || "/src/assets/defaultUser.png"} />
                                </div>
                            </div>
                            <button onClick={logout} className="btn">Logout</button>
                        </div>
                        :
                        <Link className="btn" to="/login">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;