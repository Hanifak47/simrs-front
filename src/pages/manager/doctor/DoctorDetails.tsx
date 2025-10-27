import { Link, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { useFetchDoctor } from "../../../hooks/useDoctors";
import UserProfileCard from "../../../components/UserProfileCard";
import React from "react"; 
import { formatDate } from "../../../utils/format";

const DoctorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: doctor, isPending } = useFetchDoctor(Number(id));

  // console.log(doctor);

  if (isPending) return <p className="p-8">Loading detail dokter...</p>;
  if (!doctor) return <p className="p-8">Dokter tidak ditemukan.</p>;

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
              <h1 className="font-bold text-2xl capitalize">Detail Dokter</h1>
              <Link to={'/admin/doctors'}
                className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none"
              >
                <img
                  src="/assets/images/icons/arrow-left-grey.svg"
                  className="size-[18px] flex shrink-0"
                  alt="icon"
                />
                Manajemen Dokter
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
            id="Doctor-Info"
            className="flex items-center justify-between gap-5 rounded-[20px] p-5 bg-white"
          >
            <div className="flex items-center gap-4 w-[300px] shrink-0">
              <div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
                <img
                  src={doctor.photo}
                  className="size-full object-cover"
                  alt="icon"
                />
              </div>
              <div className="flex flex-col gap-[6px] flex-1">
                <p className="font-semibold text-xl w-[202px] truncate">
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
            <div className="flex flex-col gap-2 w-[134px]">
              <p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
                <img
                  src="/assets/images/icons/star-sliced.svg"
                  className="size-6"
                  alt="icon"
                />
                4.8/5.0
              </p>
              <p className="font-medium text-lg text-monday-gray leading-none">
                Rating
              </p>
            </div>
            <div className="flex flex-col gap-2 w-[134px]">
              <p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
                <img
                  src="/assets/images/icons/briefcase-blue-fill.svg"
                  className="size-6"
                  alt="icon"
                />
                {doctor.yoe} Tahun
              </p>
              <p className="font-medium text-lg text-monday-gray leading-none">
                Pengalaman
              </p>
            </div>
            <div className="flex flex-col gap-2 w-[134px]">
              <p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
                <img
                  src={`${
                    doctor.gender == "Male"
                      ? "/assets/images/icons/man-black-fill.svg"
                      : "/assets/images/icons/woman-black-fill.svg "
                  }`}
                  className="size-6"
                  alt="icon"
                />
                {doctor.gender}
              </p>
              <p className="font-medium text-lg text-monday-gray leading-none">
                Jenis Kelamin
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to={`/admin/doctors/edit/${doctor.id}`}
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
          <section className="flex flex-col gap-6 flex-1 rounded-[20px] p-5 px-0 bg-white">
            <div id="Header" className="flex items-center justify-between px-5">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-xl">Transaksi Terakhir</p>
                <p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
                  <img
                    src="/assets/images/icons/stetoscop-grey.svg"
                    className="size-6"
                    alt="icon"
                  />
                  {doctor.booking_transactions.length} Total Transaksi
                </p>
              </div>
            </div>
            <hr className="border-monday-stroke" />
            <div className="flex flex-col px-5 gap-5 flex-1">
              {doctor.booking_transactions &&
              doctor.booking_transactions.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {doctor.booking_transactions.map((transaction) => (
                    <React.Fragment key={transaction.id}>
                      <div className="card flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4 w-[320px] shrink-0">
                          <div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
                            <img
                              src={transaction.user.photo}
                              className="size-full object-cover"
                              alt="icon"
                            />
                          </div>
                          <div className="flex flex-col gap-[6px] flex-1">
                            <p className="font-semibold text-xl w-[222px] truncate">
                              {transaction.user.name}
                            </p>
                            <p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
                              <img
                                src={`${
                                  transaction.user.gender == "Male"
                                    ? "/assets/images/icons/man-black-fill.svg"
                                    : "/assets/images/icons/woman-black-fill.svg "
                                }`}
                                className="size-6"
                                alt="icon"
                              />
                              {transaction.user.gender}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 w-[220px]">
                          <p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
                            <img
                              src="/assets/images/icons/calendar-2-black.svg"
                              className="size-6"
                              alt="icon"
                            />
                            {formatDate(transaction.started_at)}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 w-[220px]">
                          <p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
                            <img
                              src="/assets/images/icons/clock-black.svg"
                              className="size-6"
                              alt="icon"
                            />
                            {transaction.time_at} WIB
                          </p>
                        </div>
                        <p className="badge flex w-[100px] shrink-0 rounded-full py-3 items-center justify-center text-white font-bold text-sm leading-none bg-monday-orange">
                          Menunggu
                        </p>
                      </div>
                      <hr className="border-monday-stroke last:hidden" />
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div
                  id="Empty-State"
                  className="  flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-stroke gap-8"
                >
                  <img
                    src="/assets/images/icons/note-remove-grey.svg"
                    className="size-[52px]"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-1 items-center text-center">
                    <p className="font-semibold text-monday-gray">
                     Ups, tidak ada data
                    </p>
                    {/* <a href="#" className="font-bold text-monday-blue">
                      Create Now +
                    </a> */}
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DoctorDetails;
