import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSpecialist } from "../../../hooks/useSpecialists";
import { ApiErrorResponse } from "../../../types/types";
import UserProfileCard from "../../../components/UserProfileCard";
import { useRef, useState } from "react";
import {
  SpecialistFormData,
  specialistSchema,
} from "../../../schemas/specialistSchema";

const AddSpecialist = () => {
  const navigate = useNavigate();
  const { mutate: createSpecialist, isPending } = useCreateSpecialist();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState(
    "/assets/images/icons/gallery-grey.svg"
  );

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<SpecialistFormData>({
    resolver: zodResolver(specialistSchema),
  });

  const onSubmit = (data: SpecialistFormData) => {
    setError("root", { type: "server", message: "" });

    createSpecialist(data, {
      onSuccess: () => navigate("/admin/specialists"),
      onError: (error: AxiosError<ApiErrorResponse>) => {
        if (error.response) {
          const { message, errors } = error.response.data;

          if (message) {
            setError("root", { type: "server", message });
          }

          if (errors) {
            Object.entries(errors).forEach(([key, messages]) => {
              setError(key as keyof SpecialistFormData, {
                type: "server",
                message: messages[0],
              });
            });
          }
        }
      },
    });
  };

  return (
    <div id="main-container" className="flex flex-1">
      <Sidebar />
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        <div
          id="Top-Bar"
          className="flex items-center w-full gap-6 mt-[30px] mb-6"
        >
          <div className="flex items-center gap-6 h-[102px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-2 w-full">
              <h1 className="font-bold text-2xl capitalize">
                Buat Spesialisasi Baru
              </h1>
              <Link
                to={`/admin/specialists/`}
                className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none"
              >
                <img
                  src="/assets/images/icons/arrow-left-grey.svg"
                  className="size-[18px] flex shrink-0"
                  alt="icon"
                />
                Manajemen Spesialis
              </Link>
            </div>
            <div className="flex items-center flex-nowrap gap-3">
              <a href="#">
                <div className="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden">
                  <img
                    src="/assets/images/icons/search-normal-black.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
              </a>
              <a href="#">
                <div className="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden">
                  <img
                    src="/assets/images/icons/notification-black.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
              </a>
              <div className="relative w-fit">
                <div className="flex size-14 rounded-full bg-monday-lime-green items-center justify-center overflow-hidden">
                  <img
                    src="/assets/images/icons/help-desk-black.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
                <p className="absolute transform -translate-x-1/2 left-1/2 -bottom-2 rounded-[20px] py-1 px-2 bg-monday-black text-white w-fit font-extrabold text-[8px]">
                  24/7
                </p>
              </div>
            </div>
          </div>
          <UserProfileCard />
        </div>
        <main className="flex flex-col gap-5 flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full rounded-3xl p-5 gap-5 bg-white"
          >
            <h2 className="font-semibold text-xl capitalize">
              Selesaikan Formnya
            </h2>
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg text-monday-gray">
                Unggah Gambar
              </p>
              <div className="flex items-center justify-between w-[500px]">
                <div className="group relative flex size-[100px] p-[14px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
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
                          "/assets/images/icons/gallery-grey.svg"
                        );
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-black w-[152px] font-semibold text-nowrap"
                >
                  {imagePreview !== "/assets/images/icons/gallery-grey.svg"
                    ? "Ubah Foto"
                    : "Tambahkan Foto"}
                </button>
              </div>
            </div>
            {errors.photo && (
              <p className="text-red-500">
                <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                    {/* {errors.photo.message} */}
                  {String(errors.photo.message)}
                </span>
              </p>
            )}

            <div className="flex items-center justify-between">
              <p className="font-medium text-lg text-monday-gray">
                Nama Spesialis
              </p>
              <div className="group/errorState flex flex-col gap-2 invalid">
                <label className="group relative w-[500px]">
                  <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/stetoscop-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="placeholder font-semibold text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:text-monday-black group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                    Masukkan Nama
                  </p>
                  <input
                    type="text"
                    {...register("name")}
                    className={`appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[2px] pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 ${errors.name
                      ? "group-[&.invalid]/errorState:border-monday-red"
                      : "border-monday-border"
                      }`}
                    placeholder=""
                  />
                </label>
                {errors.name && (
                  <p className="text-red-500">
                    <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                      {errors.name.message}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="font-medium text-lg text-monday-gray">
                Harga Spesialis
              </p>
              <div className="group/errorState flex flex-col gap-2 invalid">
                <label className="group relative w-[500px]">
                  <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/money-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="placeholder font-semibold text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:text-monday-black group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
                    Masukkan Harga
                  </p>
                  <input
                    type="number"
                    {...register("price")}
                    className={`appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[2px] pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300
                      ${errors.price
                        ? "group-[&.invalid]/errorState:border-monday-red"
                        : "border-monday-border"
                      }`}
                    placeholder=""
                  />
                </label>
                {errors.price && (
                  <p className="text-red-500">
                    <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                      {errors.price.message}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg text-monday-gray">
                Tentang Spesialis
              </p>
              <div className="group/errorState flex flex-col gap-2 invalid">
                <label
                  className={`group flex py-4 px-6 rounded-3xl border-[2px] transition-300 w-[500px] ${errors.about
                    ? "group-[&.invalid]/errorState:border-monday-red"
                    : "border-monday-border"
                    } focus-within:border-monday-black`}
                >
                  <div className="flex h-full pr-4 pt-2 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/note-text-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <div className="flex flex-col gap-[6px] pl-4 w-full">
                    <p className="placeholder font-semibold text-monday-gray text-sm group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:text-monday-black transition-300">
                      Masukkan Deskripsi                    </p>
                    <textarea
                      className="appearance-none outline-none w-full font-semibold text-lg leading-[160%]"
                      rows={3}
                      {...register("about")}
                      placeholder=""
                      defaultValue={""}
                    />
                  </div>
                </label>
                {errors.about && (
                  <p className="text-red-500">
                    <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                      {errors.about.message}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Link
                to={`/admin/specialists/`}
                className="btn btn-red font-semibold"
              >
                Batal
              </Link>
              <button
                disabled={isPending}
                type="submit"
                className="btn btn-primary font-semibold rounded-full"
              >
                {isPending ? "Menyimpan..." : "Simpan Specialist"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddSpecialist;
