import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const LoginManager = () => {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false); // <-- TAMBAHKAN INI

  const togglePasswordVisibility = () => { // <-- TAMBAHKAN FUNGSI INI
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (!loading && user?.roles) {
      if (user.roles.includes("manager")) {
        navigate("/admin/overview");
      }
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      console.log(email);
      console.log(password);
      if (user && user.roles?.includes("manager")) {
        navigate("/admin/overview");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="relative flex flex-1 h-screen items-center">
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-[486px] shrink-0 rounded-3xl gap-8 p-6 bg-white"
        >
          <img
            src="/assets/images/logos/logo.png"
            className="w-full h-[34px] mx-auto"
            alt="logo"
          />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 text-center">
              <p className="font-semibold text-2xl">
                Halo! 🙌🏻 Selamat Datang Kembali!
              </p>
              <p className="font-medium text-monday-gray">
                Akses akunmu untuk melanjutkan
              </p>
            </div>
            <div className="flex flex-col gap-8 w-full">
              <label className="group relative">
                <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                  <img
                    src="/assets/images/icons/sms-grey.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                </div>
                <p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                  Alamat Email
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300"
                  placeholder=""
                />
              </label>

              <label className="group relative">
                <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                  <img
                    src="/assets/images/icons/key-grey.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                </div>
                <p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                  Passwordmu
                </p>
                <input
                  id="passwordInput"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-16 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 tracking-[0.3em]"
                  placeholder=""
                />
                <button
                  id="togglePassword"
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute transform -translate-y-1/2 top-1/2 right-6"
                >
                  <img
                    src="/assets/images/icons/eye-grey.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                </button>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full font-medium"
            >
              Sign In
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginManager;
