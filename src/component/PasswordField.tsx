import React, { useState, forwardRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export interface PasswordValidation {
  minLength: boolean;
  alphanumeric: boolean;
  specialChar: boolean;
}

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  focused: boolean;
  error?: boolean;
  validation?: PasswordValidation;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      name,
      value,
      onChange,
      onFocus,
      onBlur,
      focused = false,
      error,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const strength = useMemo(() => {
      let score = 0;
      if (value.length >= 8) score++;
      if (/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)) score++;
      if (/[!@#$%^&*]/.test(value)) score++;
      return score;
    }, [value]);

    const barColor = (index: number) => {
      if (strength >= 3) return "bg-green-500";
      if (strength === 2) return index < 2 ? "bg-yellow-400" : "bg-gray-300";
      if (strength === 1) return index < 1 ? "bg-red-500" : "bg-gray-300";
      return "bg-gray-300";
    };

    const barLabel = (index: number) => {
      if (index === 0) return "Weak";
      if (index === 1) return "Medium";
      if (index === 2) return "Strong";
      return "";
    };

    return (
      <div className="mb-4 relative">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            name={name}
            placeholder="Type your password"
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`w-full text-gray-500 mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 pr-10 placeholder-gray-500 transition-colors ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-purple-300 focus:ring-purple-500"
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        {focused && (
          <div className="flex mt-2 gap-2 relative">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative flex-1 h-2 rounded bg-gray-300 overflow-hidden group"
              >
                <div
                  className={`h-2 rounded ${barColor(
                    i
                  )} transition-all duration-500 ease-in-out ${
                    strength > i ? "w-full" : "w-0"
                  }`}
                />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg transition-opacity duration-300">
                  {barLabel(i)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default PasswordField;
