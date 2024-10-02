import Spinner from "./Spinner";

export default function Button({
  children,
  callback,
  isLoading = false,
  color = "bg-purple-700",
}) {
  return (
    <button
      className={`${color} w-60 h-14 rounded-md text-white hover:bg-purple-600 ${
        isLoading ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={callback}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">{children}</div>
      )}
    </button>
  );
}
