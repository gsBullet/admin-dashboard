import { useState } from "react";

const Switch = ({
  label,
  defaultChecked = false,
  disabled = false,
  onChange,
  color = "blue", // Default to blue color
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  console.log(onChange);
  

  const handleToggle = () => {
    if (disabled) return;
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };
  
    const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";

  const switchColors =
    color === "blue"
      ? {
          background: isChecked
            ? "bg-brand-500 "
            : "bg-gray-200 dark:bg-white/10", // Blue version
          knob: isChecked
            ? "translate-x-full bg-white"
            : "translate-x-0 bg-white",
        }
      : {
          background: isChecked
            ? "bg-gray-800 dark:bg-white/10"
            : "bg-gray-200 dark:bg-white/10", // Gray version
          knob: isChecked
            ? "translate-x-full bg-white"
            : "translate-x-0 bg-white",
        };

  return (
    <label
      className={`flex  select-none items-center gap-3 text-sm font-medium text-center justify-center  ${
        disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400"
      }`}
      // Toggle when the label itself is clicked
    >
      <div className="relative cursor-pointer" onClick={handleToggle}>
        <div
          className={`block  transition duration-150 ease-linear h-6 w-11 rounded-full ${
            disabled
              ? "bg-gray-100 pointer-events-none dark:bg-gray-800"
              : switchColors.background
          }`}
        ></div>
        <div
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full shadow-theme-sm duration-150 ease-linear transform ${switchColors.knob}`}
        ></div>
      </div>
      {defaultChecked ? (
        <label className={`${baseStyles} bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500`}>
          {label}
        </label>
      ) : (
        <label className={`${baseStyles} bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500`}>{label}</label>
      )}
    </label>
  );
};

export default Switch;
