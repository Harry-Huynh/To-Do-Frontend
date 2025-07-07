export default function Button({ name, disabled }) {
  return (
    <button
      className={`btn h-12 w-full xl:w-40 text-xl rounded-xl border-3 transition-all duration-300 font-semibold ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-gradient-to-r from-black to-black bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] hover:text-white"
      }`}
    >
      {name}
    </button>
  );
}
