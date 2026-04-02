import React from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";

import { addUser } from "../features/usersSlice";

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();

const schema = object({
    username: string().required("Username is required"),
    email: string().required("Email is required").email("Invalid email"),
    password: string().required("Password is required").min(8, "At least 8 characters"),
});

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                );

                await updateProfile(userCredential.user, {
                    displayName: values.username,
                    photoURL: "../../public/user.avif"
                });

                dispatch(addUser({
                    uid: userCredential.user.uid,
                    displayName: values.username,
                    email: values.email,
                    photoURL: "../../public/user.avif"
                }));

                navigate("/");
            } catch (error) {
                console.error("❌ Error signing up:", error.message);
            }

            formik.resetForm();
        },
    });

    const handleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            const user = result.user;

            // Dispatch to Redux
            dispatch(addUser({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }));

            // Navigate to home
            navigate("/");

        } catch (error) {
            console.error("❌ Google Signup Error:", error.message);
        }
    };

    const { errors, values, touched, handleChange, handleBlur } = formik;

    return (
        <div className="w-full h-screen flex justify-center items-center bg-stone-100">
            <div className="w-[24rem] md:w-[32rem] bg-white rounded-2xl shadow-2xl p-8">

                <h1 className="text-3xl font-semibold text-center mb-2">
                    Create Account
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Join and start your journey
                </p>

                {/* Google Button */}
                <button
                    onClick={handleSignup}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition"
                >
                    <FcGoogle size="30" />
                    <span className="font-medium">Continue with Google</span>
                </button>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Form */}
                <form onSubmit={formik.handleSubmit} className="flex flex-col">

                    {/* Username */}
                    <label className="text-sm mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-100 focus:bg-white border border-transparent focus:border-black outline-none rounded-lg px-3 py-3 mb-2 transition"
                    />
                    {touched.username && errors.username && (
                        <p className="text-red-500 text-xs mb-2">{errors.username}</p>
                    )}

                    {/* Email */}
                    <label className="text-sm mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-100 focus:bg-white border border-transparent focus:border-black outline-none rounded-lg px-3 py-3 mb-2 transition"
                    />
                    {touched.email && errors.email && (
                        <p className="text-red-500 text-xs mb-2">{errors.email}</p>
                    )}

                    {/* Password */}
                    <label className="text-sm mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-100 focus:bg-white border border-transparent focus:border-black outline-none rounded-lg px-3 py-3 mb-2 transition"
                    />
                    {touched.password && errors.password && (
                        <p className="text-red-500 text-xs mb-2">{errors.password}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-black text-white rounded-lg py-3 mt-4 hover:opacity-90 transition"
                    >
                        Sign Up
                    </button>

                    {/* Link */}
                    <p className="text-center text-sm mt-5">
                        Already have an account?{" "}
                        <NavLink className="text-black font-medium underline" to="/login">
                            Sign in
                        </NavLink>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Signup;
