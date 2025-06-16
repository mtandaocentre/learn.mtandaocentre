// src/pages/VerifyEmail.jsx
import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { isLoaded, signUp } = useSignUp();
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        navigate("/");
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error(err.errors?.[0]?.longMessage || "Verification failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-primary-darker p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Email</h2>
        <p className="mb-4 text-center">
          We've sent a verification code to your email address.
        </p>
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label htmlFor="code" className="block mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 bg-primary-dark border border-gray-600 rounded-md text-text-light"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;