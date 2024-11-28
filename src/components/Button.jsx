import Spinner from "./Spinner";

export default function Button({
  children,
  callback,
  isLoading = false,
  color = "bg-purple-700",
  type = "button",
  disabled = false,
}) {
  const isButtonDisabled = isLoading || disabled;

  return (
    <button
      className={`${color} w-60 h-14 rounded-md text-white ${
        isButtonDisabled
          ? "cursor-not-allowed opacity-50"
          : "hover:bg-purple-600 cursor-pointer"
      }`}
      onClick={!isButtonDisabled ? callback : undefined} // Prevents callback when disabled
      disabled={isButtonDisabled}
      type={type}
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
