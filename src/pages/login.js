import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "@/components/Loading";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { taskAtom } from "@/store";
import { useAtom } from "jotai";
import { getTasks } from "@/lib/userData";

export default function Register() {
  const router = useRouter();
  const [warningMessage, setWarningMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tasks, setTasks] = useAtom(taskAtom);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  async function loadData() {
    setTasks(await getTasks());
  }

  async function handleLogin(data) {
    setLoading(true);
    try {
      await authenticateUser(data.userName, data.password);
      await loadData();
      reset({
        userName: "",
        password: "",
      });
      router.push("/");
    } catch (error) {
      setWarningMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto xl:max-w-[1200px] max-w-[600px] bg-[#DADDD8] text-3xl my-10 rounded-2xl flex justify-center transition-all duration-300">
      <div className="w-full max-w-xl p-10">
        <h1 className="text-center font-bold mb-10 text-4xl">Sign In</h1>

        {loading && <Loading />}

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full shadow-md rounded-2xl p-8 border-3"
        >
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-1">
              User Name:
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border-3 border-[#50524f] opacity-70 rounded-xl text-lg focus:outline-none focus:border-black focus:opacity-100"
              {...register("userName", { required: true })}
            />

            {errors.userName?.type == "required" && (
              <ErrorMessage message="User name is required" />
            )}
          </div>

          <div className="relative mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border-3 border-[#50524f] opacity-70 rounded-xl text-lg focus:outline-none focus:border-black focus:opacity-100"
              {...register("password", { required: true })}
            />

            <span className="absolute right-3 top-10 transform cursor-pointer">
              {showPassword ? (
                <FaEye onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
              )}
            </span>

            {errors.password?.type == "required" && (
              <ErrorMessage message="Password is required" />
            )}
          </div>

          <div className="text-base mb-5">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Please register here
            </Link>
          </div>

          {warningMessage && (
            <p className="bg-red-500 text-white p-auto text-lg my-5 rounded-xl px-2 py-3">
              {warningMessage}
            </p>
          )}

          <button
            type="submit"
            className={`w-full bg-[#a9b2ac] border-3 border-[#a9b2ac] opacity-70 text-black text-lg font-semibold py-3 rounded-xl transition-all duration-300 ${
              Object.keys(errors).length > 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#DADDD8] hover:opacity-100 hover:scale-102 cursor-pointer"
            }`}
          >
            {loading ? "Sign in, please waiting..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
