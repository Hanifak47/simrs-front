import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const LoginCustomer = () => {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user?.roles) {
      if (user.roles.includes("customer")) {
        navigate("/customer/discover");
      }
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      if (user && user.roles?.includes("customer")) {
        navigate("/customer/discover");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
      <div
        id="Content-Container"
        className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
      >
        <div className="flex flex-col w-full pt-[60px] p-5 bg-white gap-2">
          <p className="font-semibold text-2xl capitalize">Welcome Back! 🙌</p>
          <p className="font-medium text-monday-gray leading-none">
            Hop into your account to continue!
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-1 flex-col">
          <div className="flex flex-col py-6 px-5 gap-8 bg-white mt-2 flex-1">
            {error && <p className="text-monday-red">{error}</p>}
            <div className="flex flex-col gap-2">
              <p className="font-medium text-monday-gray">Email Address</p>
              <div className="group/errorState flex flex-col gap-2">
                <label className="group relative">
                  <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/sms-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[22px] group-has-[:placeholder-shown]:top-[33px] group-focus-within:top-[22px] transition-300">
                    Type your email
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none w-full h-[66px] font-semibold rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
                    placeholder=""
                  />
                </label>
                <span className="font-semibold text-sm text-monday-red hidden leading-none group-[&.invalid]/errorState:block">
                  Lorem dolor error message here
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-monday-gray">Password</p>
              <div className="group/errorState flex flex-col gap-2">
                <label className="group relative">
                  <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/key-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[22px] group-has-[:placeholder-shown]:top-[33px] group-focus-within:top-[22px] transition-300">
                    Type your Password
                  </p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none w-full h-[66px] font-semibold rounded-3xl border-[1.5px] border-monday-border pl-20 pr-16 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black group-[&.invalid]/errorState:border-monday-red transition-300 tracking-[0.3em]"
                    placeholder=""
                  />
                </label>
                <span className="font-semibold text-sm text-monday-red hidden leading-none group-[&.invalid]/errorState:block">
                  Lorem dolor error message here
                </span>
              </div>
              <a
                href="#"
                className="text-right font-semibold text-sm text-monday-blue hover:underline"
              >
                Reset Password
              </a>
            </div>
          </div>
          <div id="Bottom-Bar" className="flex relative w-full h-[138px] mt-2">
            <div className="fixed z-30 bottom-0 flex flex-col gap-3 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
              <button
                type="submit"
                className="flex items-center w-full h-[56px] justify-center gap-[6px] rounded-2xl py-4 px-6 bg-monday-blue"
              >
                <span className="font-semibold text-lg leading-none text-white">
                  Sign In
                </span>
              </button>
              <p className="font-semibold text-sm capitalize text-center text-monday-gray">
                Doesn't have an account?{" "}
                <Link
                  to={"/customer/register"}
                  className="text-monday-blue hover:underline"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCustomer;
