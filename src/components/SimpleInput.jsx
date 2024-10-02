import { forwardRef } from "react";

const SimpleInput = forwardRef(
  ({ placeholder, isDisabled = false, type = "text" }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`h-12 w-80 p-2 ${
          isDisabled ? "cursor-not-allowed bg-gray-300" : "cursor-pointer"
        }`}
        ref={ref} // Attacher la ref ici
        disabled={isDisabled} // Gérer l'état désactivé
      />
    );
  }
);

SimpleInput.displayName = "SimpleInput";

export default SimpleInput;
