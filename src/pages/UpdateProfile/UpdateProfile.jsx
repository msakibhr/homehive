import React, { useContext, useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import AuthContext from '../../providers/AuthContext';
import useTitle from '../../hooks/useTitle';

const UpdateProfile = () => {
    const auth = getAuth();
    // Getting user, loading state, and a setter from context
    const { user, loading, setUser } = useContext(AuthContext);

    // State for editable fields
    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    useTitle("Update Profile - HomeHive");

    // When the user object from context is available or changes,
    // this populates the form fields with the latest data.
    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!auth.currentUser) {
            alert("No user is signed in to update.");
            return;
        }

        // Using Firebase's updateProfile method
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        }).then(() => {
            // After a successful update, the 'user' object in the AuthContext
            // should be updated automatically if the provider is listening to `onAuthStateChanged`.
            // If not, the context's state can be manually updated.
            if (setUser) {
                setUser({ ...auth.currentUser });
                console.log("Profile updated!:", auth.currentUser);
            }
            alert('Profile updated successfully!');
        }).catch((error) => {
            console.error("A Profile Update Error occurred:", error);
            alert(`Failed to update profile: ${error.message}`);
        });
    };

    if (loading) {
        return <div className="text-center my-10">Loading profile...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 bg-gray-50">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-gray-800">Update Your Profile</h1>
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            // src={user.photoURL || "https://i.ibb.co/68v9m70/user.png"} // A default avatar
                            src={user.photoURL || "/src/assets/defaultUser.png"} // A default avatar
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover shadow-md"
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm space-y-2">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Your Full Name" />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input id="email-address" name="email" type="email" value={user.email || 'No email available'} readOnly
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="photo-url" className="block text-sm font-medium text-gray-700">Photo URL</label>
                                <input id="photo-url" name="photoURL" type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="https://example.com/photo.jpg" />
                            </div>
                        </div>

                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;