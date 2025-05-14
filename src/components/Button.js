export default function Button({ name, disabled }) {
  return (
    <button
      className={`btn h-12 w-40 text-xl font-normal rounded-xl border-3 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-gradient-to-r from-white to-white bg-no-repeat transition-all duration-300 bg-[length:0%_100%] hover:bg-[length:100%_100%] "
      }`}
    >
      {name}
    </button>
  );
}
