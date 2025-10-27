import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  customerRegisterSchema,
  CustomerRegisterFormData,
} from "../../schemas/customerSchema";
import { useRegisterCustomer } from "../../hooks/useUsers";
import { Link, useNavigate } from "react-router-dom";
import { ApiErrorResponse } from "../../types/types";
import { AxiosError } from "axios";
import { useRef, useState } from "react";

function RegisterCustomer() {
  const { mutate: registerCustomer } = useRegisterCustomer();
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState(
    "/assets/images/icons/profile-photo-default.svg"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<CustomerRegisterFormData>({
    resolver: zodResolver(customerRegisterSchema),
  });

  const onSubmit = (data: CustomerRegisterFormData) => {
    setError("root", { type: "server", message: "" });

    registerCustomer(data, {
      onSuccess: () => navigate("/customer/login"),
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const { message, errors: fieldErrors } = error.response?.data || {};
        if (message) {
          setError("root", { type: "server", message });
        }
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([key, value]) => {
            setError(key as keyof CustomerRegisterFormData, {
              type: "server",
              message: value[0],
            });
          });
        }
      },
    });
  };

  return (
    <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
      <div
        id="Content-Container"
        className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
      >
        <div className="flex flex-col w-full pt-[60px] p-5 bg-white gap-2">
          <p className="font-semibold text-2xl capitalize">
            Hey 🙌, Selamat Datang!
          </p>
          <p className="font-medium text-monday-gray leading-none">
            Buat Akun Untuk Melanjutkan!
          </p>
        </div>
        {errors.root && (
          <p className="text-red-500 bg-red-100 border border-red-400 p-2 rounded">
            {errors.root.message}
          </p>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col"
        >
          <div className="flex flex-col py-6 px-5 gap-8 bg-white mt-2 flex-1">
            <div className="flex items-center justify-between">
              <div className="group relative flex size-[100px] rounded-full overflow-hidden items-center justify-center bg-[#D7D7E417] border border-monday-stroke">
                <img
                  id="Thumbnail"
                  src={imagePreview}
                  className="size-full object-cover"
                  alt="icon"
                />

                <input
                  type="file"
                  id="File-Input"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("photo", file);
                      setImagePreview(URL.createObjectURL(file));
                    } else {
                      setImagePreview(
                        "/assets/images/icons/profile-photo-default.svg"
                      );
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <button
                type="button"
                id="Add-Photo"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-black w-fit font-medium text-sm text-nowrap gap-[6px] p-[14px] leading-none h-[46px]"
              >
                {imagePreview !== "/assets/images/icons/gallery-grey.svg"
                  ? "Tambahkan Foto"
                  : "Rubah Foto"}
                <img
                  src="/assets/images/icons/receive-square-white.svg"
                  className="flex size-4 shrink-0"
                  alt="icon"
                />
              </button>
            </div>
            {errors.photo && (
              <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                {errors.photo.message}
              </span>
            )}
            <div className="flex flex-col gap-2">
              <p className="font-medium text-monday-gray">Nama Lengkap</p>
              <div className="group/errorState flex flex-col gap-2">
                <label className="group relative">
                  <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/user-thin-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[22px] group-has-[:placeholder-shown]:top-[33px] group-focus-within:top-[22px] transition-300">
                    Tuliskan Namamu
                  </p>
                  <input
                    type="text"
                    {...register("name")}
                    className="appearance-none w-full h-[66px] font-semibold rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
                    placeholder=""
                  />
                </label>
                {errors.name && (
                  <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-monday-gray">Nomor Telepon</p>
              <div className="group/errorState flex flex-col gap-2">
                <label className="group relative">
                  <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/call-calling-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[22px] group-has-[:placeholder-shown]:top-[33px] group-focus-within:top-[22px] transition-300">
                    Tuliskan Nomor Telepon mu
                  </p>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="appearance-none w-full h-[66px] font-semibold rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
                    placeholder=""
                  />
                </label>
                {errors.phone && (
                  <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-monday-gray">Pilih Jenis Kelamin</p>
              <div className="flex items-center gap-4 h-[56px]">
                <label className="group relative flex items-center h-full py-4 px-5 gap-4 rounded-2xl border-[2px] border-monday-border focus-within:border-monday-black has-[:checked]:border-monday-blue has-[:checked]:bg-monday-blue/10 transition-300 w-full">
                  <div className="flex h-full shrink-0 pr-4 pl-1 border-r-[1.5px] border-monday-border group-has-[:checked]:border-monday-blue">
                    <div className="flex size-6 shrink-0 relative">
                      <img
                        src="/assets/images/icons/man-grey.svg"
                        className="flex size-6 shrink-0 absolute opacity-100 group-has-[:checked]:opacity-0 transition-300"
                        alt="icon"
                      />
                      <img
                        src="/assets/images/icons/man-blue.svg"
                        className="flex size-6 shrink-0 absolute opacity-0 group-has-[:checked]:opacity-100 transition-300"
                        alt="icon"
                      />
                    </div>
                  </div>
                  <p className="font-semibold leading-none w-full text-monday-gray group-has-[:checked]:text-monday-blue">
                    Laki-laki
                  </p>
                  <input
                    type="radio"
                    value="Male"
                    id=""
                    {...register("gender")}
                    className="absolute opacity-0"
                  />
                </label>
                <label className="group relative flex items-center h-full py-4 px-5 gap-4 rounded-2xl border-[2px] border-monday-border focus-within:border-monday-black has-[:checked]:border-monday-blue has-[:checked]:bg-monday-blue/10 transition-300 w-full">
                  <div className="flex h-full shrink-0 pr-4 pl-1 border-r-[1.5px] border-monday-border group-has-[:checked]:border-monday-blue">
                    <div className="flex size-6 shrink-0 relative">
                      <img
                        src="/assets/images/icons/woman-grey.svg"
                        className="flex size-6 shrink-0 absolute opacity-100 group-has-[:checked]:opacity-0 transition-300"
                        alt="icon"
                      />
                      <img
                        src="/assets/images/icons/woman-blue.svg"
                        className="flex size-6 shrink-0 absolute opacity-0 group-has-[:checked]:opacity-100 transition-300"
                        alt="icon"
                      />
                    </div>
                  </div>
                  <p className="font-semibold leading-none w-full text-monday-gray group-has-[:checked]:text-monday-blue">
                    Perempuan
                  </p>
                  <input
                    type="radio"
                    {...register("gender")}
                    value="Female"
                    id=""
                    className="absolute opacity-0"
                  />
                </label>
              </div>
              {errors.gender && (
                <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                  {errors.gender.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-monday-gray">Alamat E-mail</p>
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
                    Tulis emailmu
                  </p>
                  <input
                    type="email"
                    {...register("email")}
                    className="appearance-none w-full h-[66px] font-semibold rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
                    placeholder=""
                  />
                </label>
                {errors.email && (
                  <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                    {errors.email.message}
                  </span>
                )}
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
                    Tulis Password mu
                  </p>
                  <input
                    type="password"
                    {...register("password")}
                    className="appearance-none w-full h-[66px] font-semibold rounded-3xl border-[1.5px] border-monday-border pl-20 pr-16 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black group-[&.invalid]/errorState:border-monday-red transition-300 tracking-[0.3em]"
                    placeholder=""
                  />
                </label>
                {errors.password && (
                  <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-monday-gray">
                Konfirmasi Password
              </p>
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
                    Tulis Password
                  </p>
                  <input
                    {...register("password_confirmation")}
                    type="password"
                    className="appearance-none w-full h-[66px] font-semibold rounded-3xl border-[1.5px] border-monday-border pl-20 pr-16 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black group-[&.invalid]/errorState:border-monday-red transition-300 tracking-[0.3em]"
                    placeholder=""
                  />
                </label>
                {errors.password_confirmation && (
                  <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                    {errors.password_confirmation.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div id="Bottom-Bar" className="flex relative w-full h-[138px] mt-2">
            <div className="fixed z-30 bottom-0 flex flex-col gap-3 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
              <button
                type="submit"
                className="flex items-center w-full h-[56px] justify-center gap-[6px] rounded-2xl py-4 px-6 bg-monday-blue"
              >
                <span className="font-semibold text-lg leading-none text-white">
                  Registrasi Akun
                </span>
              </button>
              <p className="font-semibold text-sm capitalize text-center text-monday-gray">
                Sudah punya akun?{" "}
                <Link
                  to={"/customer/login"}
                  className="text-monday-blue hover:underline"
                >
                  Login Sekarang
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterCustomer;
