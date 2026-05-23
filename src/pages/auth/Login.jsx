import { useState } from "react";
// import loginImage from "../../assets/images/loginimage2.png";
// import loginIcon from "../../assets/images/onething2.png";
import { Eye, EyeOff } from "lucide-react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidation } from "../../validations/loginValidation";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const initialLoginValue = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const handleLogin = (values) => {
    console.log(values);
    navigate("/app/dashboard");
  };

  return (
    <div className="flex flex-col bg-black overflow-x-hidden justify-center items-center h-screen w-screen ">
      <svg
        className=" hidden sm:flex absolute left-0 top-5"
        width="80"
        height="250"
        viewBox="0 0 114 353"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-4 352.354L113 235.854L-3.5 120.354M-4 325.354L113 209.354L-3.5 94.3535M-4 259.854L113 143.854L-3.5 27.3535M-3.5 233.354L113 116.854L-3.5 0.353546"
          stroke="white"
        />
      </svg>

      <svg
        className="hidden sm:flex absolute bottom-0 left-7"
        width="280"
        height="80"
        viewBox="0 0 353 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.354248 117.711L116.854 0.710938L232.354 117.211M27.3542 117.711L143.354 0.710938L258.354 117.211M92.8542 117.711L208.854 0.710938L325.354 117.211M119.354 117.211L235.854 0.710938L352.354 117.211"
          stroke="white"
        />
      </svg>

      <svg
        className="hidden sm:flex absolute right-0 bottom-5"
        width="80"
        height="250"
        viewBox="0 0 96 353"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M117.711 352.354L0.710938 235.854L117.211 120.354M117.711 325.354L0.710938 209.354L117.211 94.3535M117.711 259.854L0.710938 143.854L117.211 27.3535M117.211 233.354L0.710938 116.854L117.211 0.353546"
          stroke="white"
        />
      </svg>

      <svg
        className="hidden sm:flex absolute top-0 right-7"
        width="280"
        height="80"
        viewBox="0 0 353 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M352.354 -17L235.854 100L120.354 -16.5M325.354 -17L209.354 100L94.3535 -16.5M259.854 -17L143.854 100L27.3535 -16.5M233.354 -16.5L116.854 100L0.353516 -16.5"
          stroke="white"
        />
      </svg>

      <div className="flex items-center gap-2 mb-8">
        {/* <img className="w-5 h-5" src={loginIcon} alt="Login Icon" /> */}
        <svg
          width="20"
          height="30"
          viewBox="0 0 42 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.0536779 42.4815C9.43849 42.4694 18.0983 39.3113 25.0678 33.9884V50.8427H41.6723V33.9851H25.0721C35.2176 26.2346 41.7799 13.8965 41.7799 4.28707e-06L25.0678 0C25.0678 14.0771 13.8446 25.4888 0 25.4888L1.26682e-05 42.4815H0.0536779Z"
            fill="white"
          />
        </svg>

        <p className="font-extrabold text-2xl mt-1 text-white">onething.</p>
      </div>

      {/* Right Side */}
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-none lg:w-4/12 bg-white shadow-lg rounded-2xl p-6 sm:p-8 m-2">
        {/* Logo */}

        <div className="w-full flex flex-col gap-y-6">
          <div className=" flex flex-col gap-y-1 mb-4">
            <p className="font-medium text-lg">Admin Log In</p>
            <p className="text-xs font-normal">Please Enter Your Details</p>
          </div>

          <Formik
            initialValues={initialLoginValue}
            validationSchema={loginValidation}
            onSubmit={handleLogin}
          >
            <Form className="w-full flex flex-col gap-y-5">
              {/* Email */}
              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-500">
                  Email
                </label>

                <Field
                  type="email"
                  name="email"
                  placeholder="yourname@gmail.com"
                  className="w-full  px-4 py-3 border text-[12px] text-black font-normal border-[#DCE4E8] rounded-xl outline-none placeholder:text-gray-400"
                />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-500">
                  Password
                </label>

                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  className="w-full px-4 py-3 border font-normal text-[12px] text-black border-[#DCE4E8] rounded-xl outline-none pr-12 placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-[#1A1917] text-white font-semibold rounded-xl px-4 py-3 w-full mt-2 hover:bg-black transition-colors cursor-pointer"
              >
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
