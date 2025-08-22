import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, TwitterAuthProvider, updateProfile } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";
import { useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import AuthContext from "./AuthContext";

// export const AuthContext = createContext(null);

// social auth providers
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const facebookProvider = new FacebookAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // function to create user w/ email & password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // update user profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // user sign-in
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // twitter login
    const twitterLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, twitterProvider);
    };

    // facebook login
    const facebookLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    }

    // logout
    const logout = () => {
        // setUser(null);
        // signOut(auth);

        setLoading(true); // Set loading to true during logout
        return signOut(auth)
            .then(() => {
                // setUser(null);
                // setLoading(false); // Reset loading after logout
                setUser(null); // Set user to null after successful logout
            })
            // .catch(() => setLoading(false)); // Ensure loading is reset even if logout fails
            .catch((error) => {
                console.error("Logout error:", error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after logout process
            });
    };

    // observer for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // if (user) {
            //     setUser(user);
            //     setLoading(false);
            // }

            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false); // Reset loading after checking auth state
        });
        return () => unsubscribe();
    }, []);

    const allValues = {
        createUser,
        signInUser,
        googleLogin,
        logout,
        user,
        setUser,
        twitterLogin,
        facebookLogin,
        updateUserProfile,
        loading
    };

    return (
        <AuthContext.Provider value={allValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;