import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();
      console.log("response data : ", responseData.message);

      if (response.ok) {
        toast.success("Registration successful");

        //storetokenInLS(responseData.token);
        //localStorage.setItem("token", responseData.token);

        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/product-catalog");
      } else {
        toast.error(
          responseData.extraDetails
            ? responseData.extraDetails
            : responseData.message
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <main className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Registration Image */}
            <div className="flex justify-center items-center">
              <img
                src="/images/register.png"
                alt="a nurse with a cute look"
                className="max-w-full h-auto"
              />
            </div>
            {/* Registration Form */}
            <div className="w-full">
              <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="username" className="text-lg font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="Enter username"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-lg font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Enter email"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-lg font-medium">
                    Phone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
                    placeholder="Enter phone number"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="password" className="text-lg font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Enter password"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register;
