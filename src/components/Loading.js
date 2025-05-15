export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-center items-center">
      <div className="loading loading-spinner w-20 h-20"></div>
    </div>
  );
}
