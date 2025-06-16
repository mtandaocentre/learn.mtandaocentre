import { useSignUp, useClerk } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Register = () => {
  const { isLoaded, signUp } = useSignUp();
  const { loaded, isCaptchaEnabled } = useClerk();
  const navigate = useNavigate();

  // Get API URL from environment variables
  const API_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000";
  const CREATE_USER_ENDPOINT = `${API_URL}/api/users/create`;

  useEffect(() => {
    if (loaded && isCaptchaEnabled) {
      console.log("CAPTCHA enabled. Container should be initialized.");
    }
  }, [loaded, isCaptchaEnabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role") || "student";

    try {
      // Start the sign-up process with Clerk
      const result = await signUp.create({
        username,
        emailAddress: email,
        password,
      });

      // Send complete user data to your backend
      const response = await fetch(CREATE_USER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkUserId: result.id,
          username,
          email,
          role,
          enrollmentStatus: "approved",
          isEmailVerified: true,
          isActive: true
        }),
      });

      // Improved error handling
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user in database");
      }

      // Prepare for email verification
      await result.prepareEmailAddressVerification();
      navigate("/verify-email");

    } catch (err) {
      console.error("Registration error:", err);
      
      // More specific error messages
      if (err.errors?.[0]?.code === "form_captcha_invalid") {
        toast.error("CAPTCHA verification failed. Please try again.");
      } else if (err.errors?.[0]?.code === "form_identifier_exists") {
        toast.error("An account with this email already exists.");
      } else {
        toast.error(err.message || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-primary-darker p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 bg-primary-dark border border-gray-600 rounded-md text-text-light"
              required
              minLength={3}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 bg-primary-dark border border-gray-600 rounded-md text-text-light"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 bg-primary-dark border border-gray-600 rounded-md text-text-light"
              required
              minLength={6}
            />
          </div>
          <div>
            <label htmlFor="role" className="block mb-1">
              Account Type
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-3 py-2 bg-primary-dark border border-gray-600 rounded-md text-text-light"
              defaultValue="student"
            >
              <option value="student">Student</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          
          {loaded && isCaptchaEnabled && (
            <div id="clerk-captcha" className="my-4"></div>
          )}
          
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            disabled={!isLoaded}
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;