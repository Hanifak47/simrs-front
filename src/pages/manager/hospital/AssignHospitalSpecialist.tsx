import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetchHospital } from "../../../hooks/useHospitals";
import { useFetchSpecialists } from "../../../hooks/useSpecialists";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../types/types";
import { useAssignHospitalSpecialist } from "../../../hooks/useHospitalSpecialists";
import {
  AssignHospitalSpecialistFormData,
  assignHospitalSpecialistSchema,
} from "../../../schemas/hospitalSpecialistSchema";
import UserProfileCard from "../../../components/UserProfileCard";

const AssignHospitalSpecialist = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: hospital, isPending: loadingHospital } = useFetchHospital(
    Number(id)
  );
  const { data: specialists, isPending: loadingSpecialists } =
    useFetchSpecialists();
  const { mutate: assignSpecialist, isPending } = useAssignHospitalSpecialist();


  // console.log(hospital?.doctors.length);

  // console.log(hospital?.specialists.length);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AssignHospitalSpecialistFormData>({
    resolver: zodResolver(assignHospitalSpecialistSchema),
  });

  const onSubmit = (data: AssignHospitalSpecialistFormData) => {
    setError("root", { type: "server", message: "" });

    assignSpecialist(
      {
        hospital_id: Number(id),
        specialist_id: Number(data.specialist_id),
      },
      {
        onSuccess: () => navigate(`/admin/hospitals/details/${id}`),
        onError: (error: AxiosError<ApiErrorResponse>) => {
          const { message, errors: fieldErrors } = error.response?.data || {};
          if (message) {
            setError("root", { type: "server", message });
          }
          if (fieldErrors) {
            Object.entries(fieldErrors).forEach(([key, value]) => {
              setError(key as keyof AssignHospitalSpecialistFormData, {
                type: "server",
                message: value[0],
              });
            });
          }
        },
      }
    );
  };

  if (loadingHospital || loadingSpecialists) return <p>Loading...</p>;
  if (!hospital) return <p> hospital notfound...</p>;

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
                Tentukan Spesialisasi
              </h1>
              <Link
                to={`/admin/hospitals/details/${id}`}
                className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none"
              >
                <img
                  src="/assets/images/icons/arrow-left-grey.svg"
                  className="size-[18px] flex shrink-0"
                  alt="icon"
                />
                Detail Rumah Sakit
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
          <section
            id="Hospital-Info"
            className="flex items-center justify-between gap-5 rounded-[20px] p-5 bg-white"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
                <img
                  src={hospital.photo}
                  className="size-full object-cover"
                  alt="icon"
                />
              </div>
              <div className="flex flex-col gap-[6px] flex-1">
                <p className="font-semibold text-xl">{hospital.name}</p>
                <p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
                  <img
                    src="/assets/images/icons/location-grey.svg"
                    className="size-6"
                    alt="icon"
                  />
                  {hospital.city}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 w-full">
              <img
                src="/assets/images/icons/stetoscop-black.svg"
                className="size-6 flex shrink-0"
                alt="icon"
              />
              <p className="font-semibold text-lg text-nowrap">
                {hospital?.specialists.length} Specialists
              </p>
            </div>
            <div className="flex items-center gap-1 w-full">
              <img
                src="/assets/images/icons/profile-2user-black.svg"
                className="size-6 flex shrink-0"
                alt="icon"
              />
              <p className="font-semibold text-lg text-nowrap">{hospital?.doctors.length} Doctors</p>
            </div>
          </section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full rounded-3xl p-5 gap-5 bg-white"
          >
            <h2 className="font-semibold text-xl capitalize">
              Lengkapi Formnya
            </h2>
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg text-monday-gray">
                Pilih Specialist
              </p>
              <div className="group/errorState flex flex-col gap-2 invalid">
                <label
                  className={`group relative rounded-3xl border-[1.5px] focus-within:border-monday-black transition-300 overflow-hidden w-[500px] ${errors.specialist_id
                    ? "group-[&.invalid]/errorState:border-monday-red"
                    : "border-monday-border"
                    }`}
                >
                  <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
                    <img
                      src="/assets/images/icons/stetoscop-grey.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </div>
                  <p className="placeholder font-medium text-lg absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-has-[:valid]:text-sm group-has-[:valid]:text-monday-gray group-focus-within:top-[25px] transition-300">
                    Pilih Specialist
                  </p>

                  <select
                    id=""
                    {...register("specialist_id")}
                    className="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
                  >
                    <option value="">Pilih Specialist</option>
                    {specialists?.map((specialist) => (
                      <option key={specialist.id} value={specialist.id}>
                        {specialist.name}
                      </option>
                    ))}
                  </select>
                  <img
                    src="/assets/images/icons/arrow-down-black.svg"
                    className="absolute transform -translate-y-1/2 top-1/2 right-6 size-6"
                    alt="icon"
                  />
                </label>
                {errors.specialist_id && (
                  <p className="text-red-500">
                    <span className="font-semibold text-lg text-monday-red leading-none group-[&.invalid]/errorState:block">
                      {errors.specialist_id.message}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Link
                to={`/admin/hospitals/details/${id}`}
                className="btn btn-red font-semibold"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="btn btn-primary font-semibold rounded-full"
              >
                {isPending ? "Mendaftarkan..." : "Daftarkan"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AssignHospitalSpecialist;
