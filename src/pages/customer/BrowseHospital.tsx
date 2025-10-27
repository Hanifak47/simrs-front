import { Link, useParams } from "react-router-dom";
import { useFetchSpecialist } from "../../hooks/useSpecialists";

function BrowseHospital() {
  const { specialistId } = useParams();
  const {
    data: specialist, 
  } = useFetchSpecialist(Number(specialistId));

  if (!specialist) return <p>Loading specialist not found details...</p>;

  return (
    <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
      <div
        id="Content-Container"
        className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
      >
        <div id="Top-Nav" className="flex relative w-full h-[128px]">
          <div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
            <div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
              <Link to={'/customer/discover'}
                className="size-11 flex shrink-0"
              >
                <img
                  src="/assets/images/icons/mobile-back-button.svg"
                  className="size-full"
                  alt="icon"
                />
              </Link>
              <h1 className="font-bold text-lg leading-none text-center">
                Hospital Specialist
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
            <div className="flex size-[72px] rounded-2xl bg-monday-background overflow-hidden shrink-0 p-2">
              <img
                src={specialist.photo}
                className="size-full object-contain"
                alt="icon"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <p className="font-semibold text-lg line-clamp-1">
                {specialist.name}
              </p>
              <div className="flex items-center gap-1 text-nowrap">
                <img
                  src="/assets/images/icons/profile-2user-grey.svg"
                  className="flex size-5 shrink-0"
                  alt="icon"
                />
                <p className="font-semibold text-monday-gray leading-none">
                  {specialist.doctors.length} Doctors
                </p>
              </div>
            </div>
          </div>
          <div
            id="Browse-Hospitals"
            className="flex flex-col rounded-2xl w-full flex-1 p-5 gap-4 bg-white mt-5 pb-[96px]"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-lg">Browse Hospitals</h2>
                <div className="flex items-center gap-1 text-nowrap">
                  <img
                    src="/assets/images/icons/hospital-grey.svg"
                    className="flex size-5 shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold text-monday-gray leading-none">
                    {specialist.hospitals.length} Total Hospitals
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {specialist.hospitals?.map((hospital) => (
                <Link
                  key={hospital.id}
                  to={`/customer/hospital/details/${hospital.id}/${specialistId}`}
                  className="card"
                >
                  <div className="flex items-center rounded-2xl border border-monday-stroke  p-4 bg-white gap-4">
                    <div className="flex w-[100px] h-[120px] rounded-xl bg-monday-background overflow-hidden shrink-0">
                      <img
                        src={hospital.photo}
                        className="size-full object-cover"
                        alt="thumbnail"
                      />
                    </div>
                    <div className="flex flex-col gap-[6px] overflow-hidden">
                      <p className="font-semibold text-lg">{hospital.name}</p>
                      <div className="flex items-center gap-1 text-nowrap">
                        <img
                          src="/assets/images/icons/profile-2user-grey.svg"
                          className="flex size-5 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold text-monday-gray truncate">
                          {hospital.doctors_count} Doctors
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-nowrap">
                        <img
                          src="/assets/images/icons/location-grey.svg"
                          className="flex size-5 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold text-monday-gray truncate">
                          {hospital.city} {hospital.post_code}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-nowrap">
                        <img
                          src="/assets/images/icons/star-sliced.svg"
                          className="flex size-5 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold text-monday-gray truncate">
                          <span className="text-monday-orange">4.8</span> (2400
                          Reviews)
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

export default BrowseHospital;
