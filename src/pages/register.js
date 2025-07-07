import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { registerUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "@/components/Loading";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const router = useRouter();
  const [warningMessage, setWarningMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
      password2: "",
    },
  });

  async function handleRegister(data) {
    setLoading(true);
    try {
      await registerUser(data.userName, data.password, data.password2);

      reset({
        userName: "",
        password: "",
        password2: "",
      });
      router.push("/login");
    } catch (error) {
      setWarningMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto xl:max-w-[1200px] max-w-[600px] text-3xl my-10 rounded-2xl flex justify-center transition-all duration-300">
      <div className="w-full max-w-xl p-10">
        <h1 className="text-center font-bold mb-10 text-4xl">
          Create an Account
        </h1>

        {loading && <Loading />}

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="w-full rounded-2xl p-8 shadow-400 border-2 border-white bg-white"
        >
          <div className="mb-4">
            <label className="block text-lg font-bold text-gray-700 mb-1">
              User Name:
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border-3 border-[#d1d5db] opacity-70 rounded-xl text-lg focus:outline-none focus:border-black focus:opacity-100"
              {...register("userName", { required: true })}
            />

            {errors.userName?.type == "required" && (
              <ErrorMessage message="User name is required" />
            )}
          </div>

          <div className="relative mb-4">
            <label className="block text-lg font-bold text-gray-700 mb-1">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border-3 border-[#d1d5db] opacity-70 rounded-xl text-lg focus:outline-none focus:border-black focus:opacity-100"
              {...register("password", { required: true })}
            />

            <span className="absolute right-3 top-10 transform cursor-pointer">
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} />
              )}
            </span>

            {errors.password?.type == "required" && (
              <ErrorMessage message="Password is required" />
            )}
          </div>

          <div className="relative mb-4">
            <label className="block text-lg font-bold text-gray-700 mb-1">
              Confirm Password:
            </label>
            <input
              type={showConfirmedPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              className="w-full px-3 py-2 border-3 border-[#d1d5db] opacity-70 rounded-xl text-lg focus:outline-none focus:border-black focus:opacity-100"
              {...register("password2", { required: true })}
            />

            <span className="absolute right-3 top-10 transform cursor-pointer">
              {showConfirmedPassword ? (
                <FaEyeSlash
                  onClick={() =>
                    setShowConfirmedPassword(!showConfirmedPassword)
                  }
                />
              ) : (
                <FaEye
                  onClick={() =>
                    setShowConfirmedPassword(!showConfirmedPassword)
                  }
                />
              )}
            </span>

            {errors.password2?.type == "required" && (
              <ErrorMessage message="Confirmed password is required" />
            )}
          </div>

          <div className="text-base text-gray-900 mb-5">
            Already have an account?{" "}
            <Link href="/login" className="underline text-[#2563eb]">
              Please sign in here
            </Link>
          </div>

          {warningMessage && (
            <p className="bg-red-500 text-white p-auto text-lg my-5 rounded-xl px-2 py-3">
              {warningMessage}
            </p>
          )}

          <button
            type="submit"
            className={`w-full bg-[#3843a7] opacity-90 text-white text-lg font-semibold py-3 rounded-xl transition-all duration-300 ${
              Object.keys(errors).length > 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#3843a7] hover:opacity-100 hover:scale-102 cursor-pointer"
            }`}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
