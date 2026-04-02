import React from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";

import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import { addUser } from "../features/usersSlice";
import { auth } from "../firebase";

const schema = object({
  email: string().required("Email is required").email("Invalid email"),
  password: string().required("Password is required"),
});

const googleProvider = new GoogleAuthProvider();

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        console.log(userCredential.user);
        navigate("/");
      } catch (error) {
        setErrors({ general: error.message });
      } finally {
        setSubmitting(false);
      }
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

  return (
    <div className="w-full h-screen flex justify-center items-center bg-stone-100">
      <div className="w-[24rem] md:w-[30rem] bg-white rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-semibold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue
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

          {/* Email */}
          <label className="text-sm mb-1">Email</label>
          <input
            type="email"
            className="bg-gray-100 focus:bg-white border border-transparent focus:border-black outline-none rounded-lg px-3 py-3 mb-2 transition"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mb-2">{formik.errors.email}</p>
          )}

          {/* Password */}
          <label className="text-sm mb-1">Password</label>
          <input
            type="password"
            className="bg-gray-100 focus:bg-white border border-transparent focus:border-black outline-none rounded-lg px-3 py-3 mb-2 transition"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mb-2">{formik.errors.password}</p>
          )}

          {formik.errors.general && (
            <p className="text-red-500 text-sm mb-3">{formik.errors.general}</p>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-black text-white rounded-lg py-3 mt-4 hover:opacity-90 transition"
          >
            Sign In
          </button>

          {/* Link */}
          <p className="text-center text-sm mt-5">
            Don’t have an account?{" "}
            <NavLink className="text-black font-medium underline" to="/signup">
              Sign up
            </NavLink>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Signin;
