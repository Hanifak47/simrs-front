import { useFetchSpecialists } from "../../hooks/useSpecialists";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function BrowseSpecialist() {
  const { user } = useAuth();

  const { data: specialists } = useFetchSpecialists();

  if (!user) return <p className="p-8">User not logged in.</p>;

  return (
    <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
      <div
        id="Content-Container"
        className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
      >
        <div id="Top-Nav" className="flex relative w-full h-[128px]">
          <div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
            <div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
              <Link
                to={"/customer/discover/"}
                className="size-11 flex shrink-0"
              >
                <img
                  src="/assets/images/icons/mobile-back-button.svg"
                  className="size-full"
                  alt="icon"
                />
              </Link>
              <h1 className="font-bold text-lg leading-none text-center">
                Browse Specialist
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
          <div
            id="Choose-Specialist"
            className="flex flex-col w-full flex-1 p-5 gap-4 bg-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-lg">Choose a Specialist</h2>
                <div className="flex items-center gap-1 text-nowrap">
                  <img
                    src="/assets/images/icons/stetoscop-grey.svg"
                    className="flex size-5 shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold text-monday-gray leading-none">
                    {specialists && specialists.length} Total Speciliast
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {specialists &&
                specialists.map((specialist) => (
                  <Link
                    to={`/customer/discover/${specialist.id}/hospitals`}
                    key={specialist.id}
                    className="card"
                  >
                    <div className="flex flex-col rounded-2xl border border-monday-stroke py-5 px-4 bg-white gap-6">
                      <div className="flex size-[52px] rounded-xl bg-monday-background overflow-hidden shrink-0 p-[5px]">
                        <img
                          src={specialist.photo}
                          className="size-full object-contain"
                          alt="icon"
                        />
                      </div>
                      <div className="flex flex-col gap-[6px]">
                        <p className="font-bold text-lg overflow-hidden truncate">
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
                  </Link>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BrowseSpecialist;
