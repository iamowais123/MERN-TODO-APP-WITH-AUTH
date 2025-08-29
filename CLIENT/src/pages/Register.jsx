import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async (data) => {

    // api call with axios library

    try {
      const res = await api.post("/user/register",data); // api call
      console.log('success :',res);
      alert("User Registered Succesfull");
    } catch (error) {
      console.log('error :',error.response.data.message);
      alert("Registration Failed");
    }

    // same api call with fetch 

    // try {
    //   const res = await fetch("http://localhost:3000/user/register", {
    //     method: "POST",
    //     headers: {
    //      "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data), // form data send
    //     credentials : "include" // if you are using cookies
    //   });
    //   const reasult = await res.json();
    //   alert("User Registered succesfull");
    //   console.log(reasult);
    // } catch (error) {
    //   console.log(error);
    //   alert("Registration Failed");
    // }

    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/login" >Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
