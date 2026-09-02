import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setAuthUser] = useAuth();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4001/user/signup",
        userInfo,
      );
      const user = res.data?.user;

      if (user) {
        setAuthUser(user);
        localStorage.setItem("Users", JSON.stringify(user));
        toast.success("Signup Successfully");
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };
  return (
    <>
      <div className="min-h-screen bg-[#021a2e] px-4 py-10 flex items-center justify-center">
        <div className="w-full max-w-[700px] relative">
          <div className="relative z-10 rounded-[18px] bg-[#6a6f8a] p-4 shadow-[0_12px_22px_rgba(0,0,0,0.15)] overflow-hidden border border-[#5b617a]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="flex items-center justify-center gap-3 pt-2 pb-3 text-[14px] font-bold uppercase tracking-wide text-white/90">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="pb-1 text-white/80"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  className="relative pb-1 text-white after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-[#4b8af7]"
                >
                  Sign up
                </button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-white/90">
                    Full name
                  </label>
                  <div className="rounded-[22px] bg-[#c8ced6] px-4 py-3 shadow-inner">
                    <input
                      type="text"
                      placeholder=""
                      className="w-full bg-transparent text-[18px] text-[#111827] outline-none placeholder:text-[#111827]"
                      {...register("fullname", { required: true })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-white/90">
                    Email
                  </label>
                  <div className="rounded-[22px] bg-[#c8ced6] px-4 py-3 shadow-inner">
                    <input
                      type="email"
                      placeholder=""
                      className="w-full bg-transparent text-[18px] text-[#111827] outline-none placeholder:text-[#111827]"
                      {...register("email", { required: true })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-white/90">
                    Password
                  </label>
                  <div className="rounded-[22px] bg-[#c8ced6] px-4 py-3 shadow-inner">
                    <input
                      type="password"
                      placeholder=""
                      className="w-full bg-transparent text-[18px] text-[#111827] outline-none placeholder:text-[#111827]"
                      {...register("password", { required: true })}
                    />
                  </div>
                </div>

                <button className="mt-1 w-full rounded-[10px] bg-[#ef8ac3] text-[20px] font-bold text-white py-3 shadow-md hover:bg-[#e76db4] duration-200">
                  Sign up
                </button>
              </div>

              {errors.fullname && (
                <span className="text-sm text-red-200">
                  This field is required
                </span>
              )}
              {errors.email && (
                <span className="text-sm text-red-200">
                  This field is required
                </span>
              )}
              {errors.password && (
                <span className="text-sm text-red-200">
                  This field is required
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
