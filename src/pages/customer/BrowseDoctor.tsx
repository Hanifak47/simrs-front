
import { Link, useParams } from "react-router-dom";
import { useDoctorsByHospitalSpecialist } from "../../hooks/useDoctors";
import { useFetchHospital } from "../../hooks/useHospitals";

function BrowseDoctor() {
  const { hospitalId, specialistId } = useParams<{
    hospitalId: string;
    specialistId: string;
  }>();

  const {
      data: hospital, 
      error: errorHospital,
    } = useFetchHospital(Number(hospitalId));

  const {
    data: doctors, 
  } = useDoctorsByHospitalSpecialist(
    Number(hospitalId),
    Number(specialistId)
  );

  if (errorHospital || !hospital)
    return <p className="p-4 text-red-500">Failed to load hospital</p>;

  return (
    <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
  <div
    id="Content-Container"
    className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
  >
    <div id="Top-Nav" className="flex relative w-full h-[128px]">
      <div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
        <div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
          <Link to={`/customer/hospital/details/${hospitalId}/${specialistId}`}
            className="size-11 flex shrink-0"
          >
            <img
              src="/assets/images/icons/mobile-back-button.svg"
              className="size-full"
              alt="icon"
            />
          </Link>
          <h1 className="font-bold text-lg leading-none text-center">
            Hospital Doctors
          </h1>
          <a href="#" className="size-11 flex shrink-0">
            <img
              src="/assets/images/icons/mobile-more-button.svg"
              className="size-full"
              alt="icon"
            />
          </a>
        </div>
      </div>
    </div>
    <main className="flex flex-col flex-1">
      <div className="flex items-center rounded-2xl py-5 px-4 bg-white gap-4 mx-5">
        <div className="flex size-16 rounded-2xl bg-monday-background overflow-hidden shrink-0">
          <img
            src={hospital.photo}
            className="size-full object-cover"
            alt="icon"
          />
        </div>
        <div className="flex flex-col gap-[6px] w-full overflow-x-hidden">
          <p className="font-semibold text-lg">{hospital.name}</p>
          <div className="flex items-center gap-1 text-nowrap">
            <img
              src="/assets/images/icons/location-grey.svg"
              className="flex size-5 shrink-0"
              alt="icon"
            />
            <p className="font-semibold text-monday-gray truncate">
              {hospital.city} ({hospital.post_code})
            </p>
          </div>
        </div>
        <div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange py-[6px] px-[10px] gap-0.5">
          <img
            src="/assets/images/icons/star-sliced-white.svg"
            className="flex size-5 shrink-0"
            alt="icon"
          />
          <p className="font-semibold leading-none text-white">4.8</p>
        </div>
      </div>
      <div
        id="Browse-Doctors"
        className="flex flex-col w-full flex-1 p-5 gap-4 bg-white mt-5 pb-[96px]"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-lg">Browse Doctors</h2>
            <div className="flex items-center gap-1 text-nowrap">
              <img
                src="/assets/images/icons/profile-2user-grey.svg"
                className="flex size-5 shrink-0"
                alt="icon"
              />
              <p className="font-semibold text-monday-gray leading-none">
                {doctors?.length} Doctors
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
        {doctors?.map((doctor) => (

          <Link to={`/customer/doctor/details/${doctor.id}`} key={doctor.id} className="card">
            <div className="flex flex-col rounded-2xl border border-monday-stroke  p-4 bg-white gap-4">
              <div className="flex items-center gap-[10px]">
                <div className="flex size-16 rounded-full bg-monday-background overflow-hidden shrink-0">
                  <img
                    src={doctor.photo}
                    className="size-full object-cover"
                    alt="icon"
                  />
                </div>
                <div className="flex flex-col gap-[6px] w-full">
                  <p className="font-semibold">{doctor.name}</p>
                  <div className="flex items-center gap-1 text-nowrap">
                    <img
                      src="/assets/images/icons/stetoscop-grey.svg"
                      className="flex size-5 shrink-0"
                      alt="icon"
                    />
                    <p className="font-semibold text-monday-gray leading-none">
                      {doctor.specialist.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange py-[6px] px-[10px] gap-0.5">
                  <img
                    src="/assets/images/icons/star-sliced-white.svg"
                    className="flex size-5 shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold leading-none text-white">4.8</p>
                </div>
              </div>
              <hr className="border border-monday-stroke" />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 items-center text-center shrink-0">
                  <p className="flex items-center gap-0.5 font-semibold leading-none text-nowrap">
                    <img
                      src="/assets/images/icons/briefcase-blue-fill.svg"
                      className="size-5"
                      alt="icon"
                    />
                    {doctor.yoe} years
                  </p>
                  <p className="font-medium text-sm text-monday-gray leading-none">
                    Experience
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-center text-center">
                  <p className="flex items-center gap-0.5 font-semibold leading-none">
                    <img
                      src={`${
                        doctor.gender == "Male"
                          ? "/assets/images/icons/man-black-fill.svg"
                          : "/assets/images/icons/woman-black-fill.svg "
                      }`}
                      className="size-5"
                      alt="icon"
                    />
                    {doctor.gender}
                  </p>
                  <p className="font-medium text-sm text-monday-gray leading-none">
                    Gender
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </main>
    <button className="fixed bottom-[28px] transform -translate-x-1/2 left-1/2 z-10 flex items-center rounded-full py-3 px-4 bg-monday-blue gap-[6px] w-fit">
      <img
        src="/assets/images/icons/filter-white.svg"
        className="flex size-6 shrink-0"
        alt="icon"
      />
      <p className="font-medium leading-none text-white">Filter</p>
    </button>
  </div>
</div>

  );
}

export default BrowseDoctor;
