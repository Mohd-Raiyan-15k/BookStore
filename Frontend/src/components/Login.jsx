import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const [, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4001/user/login",
        userInfo,
      );
      const user = res.data?.user;

      if (user) {
        setAuthUser(user);
        localStorage.setItem("Users", JSON.stringify(user));
        toast.success("Logged in successfully");
        document.getElementById("my_modal_3")?.close();
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-[760px] w-[88vw] rounded-[18px] bg-[#6a6f8a] p-0 shadow-[0_12px_22px_rgba(0,0,0,0.15)] overflow-hidden border border-[#5b617a]">
          <div className="relative px-4 pt-4 pb-3 md:px-6 md:pt-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="dialog"
              className="relative z-10 overflow-hidden"
            >
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white/80 hover:text-white"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </Link>

              <div className="flex items-center justify-center gap-3 pt-2 pb-3 text-[14px] font-bold uppercase tracking-wide text-white/90">
                <button
                  type="button"
                  className="relative pb-1 text-white after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-[#4b8af7]"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("my_modal_3")?.close();
                    navigate("/signup");
                  }}
                  className="pb-1 text-white/80"
                >
                  Sign up
                </button>
              </div>

              <div className="space-y-3 pt-1">
                <div className="space-y-1">
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-white/90">
                    Username
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

                <div className="flex items-center gap-2 pt-1 text-white/90">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/60 accent-blue-600"
                  />
                  <span className="text-[14px] font-medium">No</span>
                  <span className="text-[14px] font-medium">
                    Keep me signed in
                  </span>
                </div>

                <button className="mt-1 w-full rounded-[10px] bg-pink-500 text-[20px] font-bold text-white py-3 shadow-md hover:bg-[#1f69d1] duration-200">
                  Login
                </button>

                <div className="pt-1 text-center">
                  <button
                    type="button"
                    className="text-[13px] font-medium text-white/80 underline underline-offset-2"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

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
      </dialog>
    </div>
  );
}

export default Login;
