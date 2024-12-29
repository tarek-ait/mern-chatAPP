import { Mail, MessageSquare, User, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // Adjust the path as necessary
import AuthImagePattern from "../components/AuthImagePatter.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {


  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const { signup, isSingingUp } = useAuthStore();

  const validateForm = () => {
    if (formData.fullName.length === 0) {
      toast.error("Full name is required");
      return false;
    }
    // validate email, all cases
    if (formData.email.length === 0) {
      toast.error("Email is required");
      return false;
    }
    if (formData.password.length === 0) {
      toast.error("Password is required");
      return false;
    } // the password lentgh must be at least 6
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const successCase = validateForm()
    if (successCase === true) {
      signup(formData)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 smp">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                <MessageSquare className="size-6 text-primary">

                </MessageSquare>

              </div>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-cotrol">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="size-5 text-base-content/40"></User>
                </div>
                <input type="text"
                  className={`input input-bordered w-full pl-12 ${formData.fullName.length > 0 ? 'input-success' : ''}`}
                  placeholder="Mar!"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>
            <div className="form-cotrol">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="size-5 text-base-content/40"></Mail>
                </div>
                <input type="email"
                  className={`input input-bordered w-full pl-12 ${formData.email.length > 0 ? 'input-success' : ''}`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-cotrol">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="size-5 text-base-content/40"></Lock>
                </div>
                <input type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-5 text-base-content/40"></EyeOff> : <Eye className="size-5 text-base-content/40"></Eye>}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSingingUp}>
              {isSingingUp ? (
                <>
                  <Loader className="size-5 animate-spin"> </Loader>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/50">
              Already have an account?&nbsp;&nbsp;{""}
              <Link to="/login" className="link link-primary">
                Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <AuthImagePattern
        title="join our community"
        subtitle="Chat with tarek's friends, why use instagram, facebook or snap, when you can you this cool thing!!"
      />
    </div>
  )
}

export default SignUpPage


