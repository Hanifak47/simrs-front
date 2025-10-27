import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import {
  useFetchSpecialists,
} from "../../../hooks/useSpecialists";
import UserProfileCard from "../../../components/UserProfileCard";
import React from "react";

const SpecialistList = () => {
  const { data: specialists, isPending } = useFetchSpecialists();
  if (isPending) return <p>Tunggu Spesialis...</p>;

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
                Manajemen Spesialis
              </h1>
              <p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
                Lihat &amp; Perbarui Spesialisasi Disini
              </p>
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
          <section className="flex flex-col gap-6 flex-1 rounded-[20px] p-5 px-0 bg-white">
            <div id="Header" className="flex items-center justify-between px-5">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-xl">Semua Spesialisasi</p>
                <p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
                  <img
                    src="/assets/images/icons/stetoscop-grey.svg"
                    className="size-6"
                    alt="icon"
                  />
                  {specialists && specialists.length.toLocaleString("id")} Total Spesialis
                </p>
              </div>
              <Link
                to="/admin/specialists/create"
                className="btn btn-primary font-semibold text-lg"
              >
                Tambahkan Baru
                <img
                  src="/assets/images/icons/add-white.svg"
                  className="flex sixe-6 shrink-0"
                  alt="icon"
                />
              </Link>
            </div>
            <hr className="border-monday-border" />
            <div className="flex flex-col px-5 gap-5 flex-1">
              {specialists && specialists.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {specialists.map((specialist) => (
                    <React.Fragment key={specialist.id}>
                      <div className="card flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4 w-[280px] shrink-0">
                          <div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0 p-[10px]">
                            <img
                              src={specialist.photo}
                              className="size-full object-contain"
                              alt="icon"
                            />
                          </div>
                          <div className="flex flex-col gap-[6px] flex-1">
                            <p className="font-semibold text-xl w-[172px] truncate">
                              {specialist.name}
                            </p>
                            <p className="font-semibold text-xl text-monday-red">
                              Rp {specialist.price.toLocaleString("id")}
                            </p>
                          </div>
                        </div>
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
                        <div className="flex items-center gap-1 w-[164px] shrink-0">
                          <img
                            src="/assets/images/icons/profile-2user-black.svg"
                            className="size-6 flex shrink-0"
                            alt="icon"
                          />
                          <p className="font-semibold text-lg text-nowrap">
                            {specialist.doctors.length.toLocaleString("id")}{" "}
                            Dokter
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Link
                            to={`/admin/specialists/details/${specialist.id}`}
                            className="btn btn-primary-opacity min-w-[120px] font-semibold"
                          >
                            Detail
                          </Link>
                          <Link
                            to={`/admin/specialists/edit/${specialist.id}`}
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
                      Ups, Kamu tidak memiliki data
                    </p>
                    <a href="#" className="font-bold text-monday-blue">
                      Tambahkan Sekarang +
                    </a>
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

export default SpecialistList;
