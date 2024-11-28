export default function InputLabel({
  label,
  value,
  setValue,
  disabled = false,
  textarea = false,
  placeholder = "",
}) {
  return (
    <div className="flex items-center justify-center w-full gap-5">
      <span className="w-1/6">
        <label>{label}</label>
      </span>
      {textarea ? (
        <textarea
          className="border w-5/6 text-start p-4 h-64"
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          className={`border w-5/6 text-start p-4 ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
