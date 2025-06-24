import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-primary-dark">
      <div className="w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto"> {/* Added mx-auto */}
        <SignUp
          path="/register"
          routing="path"
          signInUrl="/login"
          fallbackRedirectUrl="/complete-registration"
          appearance={{
            variables: {
              colorPrimary: '#4f46e5',
              colorText: '#1e293b',
              colorTextSecondary: '#334155',
              colorTextOnPrimaryBackground: '#ffffff',
              colorAlphaShade: '#64748b',
            },
            elements: {
              rootBox: "w-full flex justify-center", // Center the rootBox content
              card: "bg-white shadow-lg rounded-xl border border-gray-200 p-6 w-full max-w-full", // Ensure full width
              headerTitle: "text-gray-800 text-center", // Center header
              headerSubtitle: "text-gray-600 text-center", // Center subtitle
              formFieldLabel: "text-gray-700",
              formFieldInput: "text-gray-800 bg-gray-50 w-full", // Full width inputs
              footerActionText: "text-gray-600 text-center", // Center footer text
              footerActionLink: "text-indigo-600 hover:text-indigo-800",
              socialButtonsBlockButton: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 w-full", // Full width buttons
              socialButtonsBlockButtonText: "text-gray-700",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500 bg-white text-center", // Center divider text
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white w-full", // Full width button
              formFieldAction: "text-indigo-600 hover:text-indigo-800",
              identityPreviewEditButton: "text-indigo-600",
              form: "space-y-4 w-full" // Full width form
            }
          }}
        />
      </div>
    </div>
  );
};

export default Register;