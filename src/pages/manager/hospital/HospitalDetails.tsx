import { Link, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { useFetchHospital } from "../../../hooks/useHospitals";
import UserProfileCard from "../../../components/UserProfileCard";
import React from "react";
import { useDeleteHospitalSpecialist } from "../../../hooks/useHospitalSpecialists";

const HospitalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: hospital, isPending } = useFetchHospital(Number(id));
  const { mutate: deleteSpecialist } = useDeleteHospitalSpecialist();

  if (isPending) return <p>Tunggu Detail Rumah Sakit...</p>;
  if (!hospital) return <p> Rumah Sakit Tidak Dietmukan...</p>;

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
                Detail Rumah Sakit
              </h1>
              <Link to={`/admin/hospitals/`}
                className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none"
              >
                <img
                  src="/assets/images/icons/arrow-left-grey.svg"
                  className="size-[18px] flex shrink-0"
                  alt="icon"
                />
                Manajemen Rumah Sakit
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
            <div className="flex items-center gap-4 w-[320px] shrink-0">
              <div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
                <img
                  src={hospital.photo}
                  className="size-full object-cover"
                  alt="icon"
                />
              </div>
              <div className="flex flex-col gap-[6px] flex-1">
                <p className="font-semibold text-xl w-[212px] truncate">
                  {hospital.name}
                </p>
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
            <div className="flex items-center gap-1 w-[210px] shrink-0">
              <img
                src="/assets/images/icons/stetoscop-black.svg"
                className="size-6 flex shrink-0"
                alt="icon"
              />
              <p className="font-semibold text-lg text-nowrap">
                {hospital.specialists_count} Specialist
              </p>
            </div>
            <div className="flex items-center gap-1 w-[210px] shrink-0">
              <img
                src="/assets/images/icons/profile-2user-black.svg"
                className="size-6 flex shrink-0"
                alt="icon"
              />
              <p className="font-semibold text-lg text-nowrap">
                {hospital.doctors_count} Dokter
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to={`/admin/hospitals/edit/${hospital.id}`}
                className="btn btn-black min-w-[120px] font-semibold"
              >
                <img
                  src="/assets/images/icons/edit-white.svg"
                  className="flex size-6 shrink-0"
                  alt="icon"
                />
                Ubah
              </Link>
            </div>
          </section>
          <div className="flex gap-5 flex-1">
            <section
              id="Doctor-List"
              className="flex flex-col h-full w-[calc((440/960)*100%)] shrink-0 rounded-[20px] p-5 gap-5 bg-white"
            >
              <p className="header font-semibold text-xl">Daftar Dokter</p>
              {hospital.doctors && hospital.doctors.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {hospital.doctors.map((doctor) => (
                    <React.Fragment key={doctor.id}>
                      <hr className="border-monday-stroke last:hidden" />
                      <div className="card flex items-center gap-4 w-full shrink-0">
                        <div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
                          <img
                            src={doctor.photo}
                            className="size-full object-cover"
                            alt="icon"
                          />
                        </div>
                        <div className="flex flex-col gap-[6px] flex-1">
                          <p className="font-semibold text-xl w-[304px] truncate">
                            {doctor.name}
                          </p>
                          <p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
                            <img
                              src="/assets/images/icons/stetoscop-grey.svg"
                              className="size-5"
                              alt="icon"
                            />
                            {doctor.specialist.name}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div
                  id="Empty-State"
                  className="hidden flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-stroke gap-8"
                >
                  <img
                    src="/assets/images/icons/note-remove-grey.svg"
                    className="size-[52px]"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-1 items-center text-center">
                    <p className="font-semibold text-monday-gray">
                      Ups, kamu tidak memiliki data
                    </p>
                  </div>
                </div>
              )}
            </section>
            <section
              id="Specialist-List"
              className="flex flex-col h-full w-full rounded-[20px] p-5 gap-6 bg-white"
            >
              <p className="header font-semibold text-xl">Daftar Spesialis</p>
              <Link
                to={`/admin/hospitals/details/${id}/assign-specialist`}
                className="btn btn-primary font-semibold text-lg w-full"
              >
                Penambahan Spesialis
                <img
                  src="/assets/images/icons/add-white.svg"
                  className="flex sixe-6 shrink-0"
                  alt="icon"
                />
              </Link>

              {hospital.specialists && hospital.specialists.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {hospital.specialists.map((specialist) => (
                    <React.Fragment key={specialist.id}>
                      <div className="card flex items-center gap-4 w-full shrink-0">
                        <div className="flex size-[92px] rounded-2xl bg-monday-gray-background overflow-hidden shrink-0 p-[10px]">
                          <img
                            src={specialist.photo}
                            className="size-full object-cover"
                            alt="icon"
                          />
                        </div>
                        <div className="flex flex-col gap-[6px] flex-1">
                          <p className="font-semibold text-xl">
                            {specialist.name}
                          </p>
                          <div className="flex items-center gap-1 w-[164px] shrink-0">
                            <img
                              src="/assets/images/icons/verify-blue-fill.svg"
                              className="size-6 flex shrink-0"
                              alt="icon"
                            />
                            <p className="font-semibold text-lg text-nowrap text-monday-blue">
                              Certified
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const specialistId = specialist.id;

                            if (
                              window.confirm(
                                "Apakah Kamu Ingin Menghapus Spesialis Ini?"
                              )
                            ) {
                              deleteSpecialist({
                                hospital_id: hospital.id,
                                specialist_id: specialistId,
                              });
                            }
                          }}
                          className="flex size-[56px] shrink-0 rounded-2xl p-4 bg-monday-red/10 items-center justify-center"
                        >
                          <img
                            src="/assets/images/icons/trash-red-fill.svg"
                            className="size-6"
                            alt="icon"
                          />
                        </button>
                      </div>
                      <hr className="border-monday-stroke last:hidden" />
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div
                  id="Empty-State"
                  className="hidden flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-stroke gap-8"
                >
                  <img
                    src="/assets/images/icons/note-remove-grey.svg"
                    className="size-[52px]"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-1 items-center text-center">
                    <p className="font-semibold text-monday-gray">
                      Ups, Kamu Tidak Punya Data
                    </p>
                    <a href="#" className="font-bold text-monday-blue">
                      Tambahkan Sekarang
                    </a>
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HospitalDetails;
