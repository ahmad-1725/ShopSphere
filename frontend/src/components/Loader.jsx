function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-slate-700 border-t-sky-400 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-400 text-sm tracking-wide">
          Loading...
        </p>

      </div>

    </div>
  );
}

export default Loader;