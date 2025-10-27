import Sidebar from "../../../components/Sidebar";
import { useFetchTransactions } from "../../../hooks/useTransactions";
import { useFetchDoctors } from "../../../hooks/useDoctors";
import { useFetchSpecialists } from "../../../hooks/useSpecialists";
import { useFetchHospitals } from "../../../hooks/useHospitals";
import { Link } from "react-router-dom";
import UserProfileCard from "../../../components/UserProfileCard";
// OverviewDashboard.tsx

import { formatDate, formatDate2 } from '../../../utils/format';

import { getLatestDateString } from '../../../utils/lastDate';

// ... (kode komponen OverviewDashboard di bawah ini)
import React from "react";

function OverviewDashboard() {
  // fetch data
  const { data: transactions } = useFetchTransactions();
  const { data: doctors } = useFetchDoctors();
  const { data: specialists } = useFetchSpecialists();
  const { data: hospitals } = useFetchHospitals();

  let totalRev = 0;
  if (transactions) {
    transactions.forEach((transaction) => {
      if (transaction.status == "Approved") {
        totalRev += transaction.grand_total;
      }
    });
  }


  // proses format
  const sortedSpecialists = getLatestDateString(specialists, "updated_at");
  const urut_specialist = sortedSpecialists
    ? formatDate2(sortedSpecialists) // Panggil formatDate2 HANYA jika sortedSpecialists adalah string
    : 'Loading...'; // Nilai default saat sortedSpecialists adalah undefined

  const sortedDoctors = getLatestDateString(doctors, "updated_at");
  const urut_dokter = sortedDoctors
    ? formatDate2(sortedDoctors) // Panggil formatDate2 HANYA jika sortedSpecialists adalah string
    : 'Loading...'; // Nilai default saat sortedSpecialists adalah undefined

  const sortedTransactions = getLatestDateString(transactions, "updated_at");
  const urut_transaksi = sortedTransactions
    ? formatDate2(sortedTransactions) // Panggil formatDate2 HANYA jika sortedSpecialists adalah string
    : 'Loading...'; // Nilai default saat sortedSpecialists adalah undefined


  const sortedHospitals = getLatestDateString(hospitals, "updated_at");
  const urut_hospital = sortedHospitals
    ? formatDate2(sortedHospitals) // Panggil formatDate2 HANYA jika sortedSpecialists adalah string
    : 'Loading...'; // Nilai default saat sortedSpecialists adalah undefined

  // const totalRevenue =
  //   transactions?.reduce((acc, tx) => acc + tx.grand_total, 0) || 0;

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
                Dashboard Overview
              </h1>
              <p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
                <img
                  src="/assets/images/icons/calendar-2-grey.svg"
                  className="size-6 flex shrink-0"
                  alt="icon"
                />
                {formatDate(new Date().toISOString())}
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
          <section className="grid grid-cols gap-5">
            <div className="flex flex-col rounded-3xl p-5 gap-8 blue-gradient">
              <div className="flex items-center gap-4">
                <div className="flex size-14 rounded-full bg-monday-orange items-center justify-center">
                  <img
                    src="/assets/images/icons/wallet-2-white-fill.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
                <p className="font-medium text-lg text-white">Total Pendapatan (Hanya Yang Ter ACC)</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-bold text-[36px] text-white">
                  {/* Rp {totalRevenue.toLocaleString("id")} */}

                  Rp {totalRev}
                </p>
                <hr className="border-monday-stroke/20" />
                <p className="font-medium text-lg text-white/60">
                  Last Updated Today
                </p>
              </div>
            </div>
          </section>
          <section className="grid grid-cols-3 gap-5">
            <div className="flex flex-col rounded-3xl p-5 gap-8 bg-white">
              <div className="flex items-center gap-4">
                <div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
                  <img
                    src="/assets/images/icons/profile-2user-blue.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
                <p className="font-medium text-lg text-monday-gray">
                  Total Dokter
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-bold text-[36px]">
                  {doctors?.length.toLocaleString("id")}
                </p>
                <hr className="border-monday-stroke" />
                <p className="font-medium text-lg text-monday-gray">
                  Terakhir diubah {urut_dokter}
                </p>
              </div>
            </div>
            <div className="flex flex-col rounded-3xl p-5 gap-8 bg-white">
              <div className="flex items-center gap-4">
                <div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
                  <img
                    src="/assets/images/icons/hospital-blue.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
                <p className="font-medium text-lg text-monday-gray">
                  Total Rumah Sakit
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-bold text-[36px]">
                  {hospitals?.length.toLocaleString("id")}
                </p>
                <hr className="border-monday-stroke" />
                <p className="font-medium text-lg text-monday-gray">
                  Terakhir diubah {urut_hospital}
                </p>
              </div>
            </div>
            <div className="flex flex-col rounded-3xl p-5 gap-8 bg-white">
              <div className="flex items-center gap-4">
                <div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
                  <img
                    src="/assets/images/icons/stetoscop-blue.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
                <p className="font-medium text-lg text-monday-gray">
                  Total Spesialis
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-bold text-[36px]">
                  {specialists?.length.toLocaleString("id")}
                </p>
                <hr className="border-monday-stroke" />
                <p className="font-medium text-lg text-monday-gray">
                  Terakhir diubah {urut_specialist}
                </p>
              </div>
            </div>
          </section>
          <div className="flex gap-5 flex-1">
            <section className="flex flex-col gap-6 flex-1 rounded-[20px] p-5 px-0 bg-white">
              <div className="flex flex-col gap-8">
                <div
                  id="Header"
                  className="flex items-center justify-between px-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
                      <img
                        src="/assets/images/icons/note-2-blue.svg"
                        className="size-6"
                        alt="icon"
                      />
                    </div>
                    <p className="font-medium text-lg text-monday-gray">
                      Total Transaksi
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5">
                  <p className="font-bold text-[36px]">
                    {transactions?.length.toLocaleString("id")}
                  </p>
                  <p className="font-semibold text-lg text-monday-gray">
                    Terakhir diubah {urut_transaksi}
                  </p>
                </div>
              </div>
              <hr className="border-monday-border" />
              <div
                id="Transactions-List"
                className="flex flex-col px-5 gap-5 flex-1"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-2xl">Transaksi Terakhir</p>
                </div>

                {transactions && transactions.length > 0 ? (
                  <div className="flex flex-col gap-5">
                    {transactions.map((transaction) => (
                      <React.Fragment key={transaction.id}>
                        <div className="card flex items-center justify-between gap-6">
                          <div className="flex items-center gap-4 w-[320px] shrink-0">
                            <div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
                              <img
                                src={transaction.doctor.photo}
                                className="size-full object-cover"
                                alt="icon"
                              />
                            </div>
                            <div className="flex flex-col gap-[6px] flex-1">
                              <p className="font-semibold text-xl w-[212px] truncate">
                                {transaction.doctor.name}
                              </p>
                              <p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
                                <img
                                  src="/assets/images/icons/stetoscop-grey.svg"
                                  className="size-5"
                                  alt="icon"
                                />
                                {transaction.doctor.specialist.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 w-[210px] shrink-0">
                            <img
                              src="/assets/images/icons/calendar-2-black.svg"
                              className="size-6 flex shrink-0"
                              alt="icon"
                            />
                            <p className="font-semibold text-lg text-nowrap">
                              {new Date(
                                transaction.started_at
                              ).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 w-[210px] shrink-0">
                            <img
                              src="/assets/images/icons/hospital-black.svg"
                              className="size-6 flex shrink-0"
                              alt="icon"
                            />
                            <p className="font-semibold text-lg text-nowrap">
                              {transaction.doctor.hospital.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Link to={`/admin/transactions/details/${transaction.id}`} className="btn btn-primary-opacity min-w-[130px] font-semibold">
                              Detail
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
                    className=" flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-stroke gap-8"
                  >
                    <img
                      src="/assets/images/icons/note-remove-grey.svg"
                      className="size-[52px]"
                      alt="icon"
                    />
                    <div className="flex flex-col gap-1 items-center text-center">
                      <p className="font-semibold text-monday-gray">
                        Oops, you don't have any data yet
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default OverviewDashboard;
