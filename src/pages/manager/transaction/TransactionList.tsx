import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { useFetchTransactions } from "../../../hooks/useTransactions";
import UserProfileCard from "../../../components/UserProfileCard";
import { formatDate } from "../../../utils/format";

const TransactionList = () => {
  const { data: transactions, isPending } = useFetchTransactions();
  if (isPending) return <p> Menunggu Transaksi</p>;
  if (!transactions) return <p> Transaksi Tidak Ditemukan...</p>;


  // console.log(transactions);

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
                Pengaturan Transaksi
              </h1>
              <p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
                Lihat &amp; Perbarui Transaksimu Disini
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
                <p className="font-semibold text-xl">All Transactions</p>
                <p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
                  <img
                    src="/assets/images/icons/note-2-grey.svg"
                    className="size-5"
                    alt="icon"
                  />
                  {transactions.length} Total Transactions
                </p>
              </div>
            </div>
            <div className="flex flex-col px-5 gap-5 flex-1">
              {transactions && transactions.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {transactions.map((transaction) => (
                    <div className="card flex flex-col gap-5 p-4 rounded-2xl border border-monday-stroke">
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center gap-4 w-full">
                          <div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
                            <img
                              src={transaction.user.photo}
                              className="size-full object-cover"
                              alt="icon"
                            />
                          </div>
                          <div className="flex flex-col gap-[6px] flex-1">
                            <p className="font-semibold text-xl line-clamp-1">
                              {transaction.user.name}
                            </p>
                            <p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
                              <img
                                src={`${transaction.user.gender == "Male"
                                    ? "/assets/images/icons/man-grey.svg"
                                    : "/assets/images/icons/woman-grey.svg"
                                  }`}
                                className="size-6"
                                alt="icon"
                              />
                              {transaction.user.gender}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 w-full">
                          <div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
                            <img
                              src={transaction.doctor.hospital.photo}
                              className="size-full object-cover"
                              alt="icon"
                            />
                          </div>
                          <div className="flex flex-col gap-[6px] flex-1">
                            <p className="font-semibold text-xl line-clamp-1">
                              {transaction.doctor.hospital.name}
                            </p>
                            <p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
                              <img
                                src="/assets/images/icons/location-grey.svg"
                                className="size-6"
                                alt="icon"
                              />
                              {transaction.doctor.hospital.city}
                            </p>
                          </div>
                        </div>
                        {transaction && (
                          <p
                            className={`badge flex w-[100px] shrink-0 rounded-full py-3 items-center justify-center text-white font-bold text-sm leading-none ${transaction.status === "Waiting"
                                ? "bg-monday-orange"
                                : transaction.status === "Rejected"
                                  ? "bg-monday-red"
                                  : transaction.status === "Approved"
                                    ? "bg-monday-green"
                                    : "bg-gray-400"
                              }`}
                          >
                            {transaction.status}
                          </p>
                        )}
                      </div>
                      <hr className="border-monday-stroke" />
                      <div className="flex items-center gap-5">
                        <div className="flex items-center w-full gap-3">
                          <div className="flex size-[56px] rounded-full p-4 bg-monday-gray-background overflow-hidden">
                            <img
                              src="/assets/images/icons/stetoscop-black.svg"
                              className="size-6 object-contain object-center"
                              alt="icon"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-xl">
                              {transaction.doctor.specialist.name}
                            </p>
                            <p className="font-medium text-monday-gray">
                              Nama Spesialis
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center w-full gap-3">
                          <div className="flex size-[56px] rounded-full p-4 bg-monday-gray-background overflow-hidden">
                            <img
                              src="/assets/images/icons/calendar-2-black.svg"
                              className="size-6 object-contain object-center"
                              alt="icon"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-xl">
                              {formatDate(transaction.started_at)}
                            </p>
                            <p className="font-medium text-monday-gray">
                              Jadwal Temu
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`/admin/transactions/details/${transaction.id}`}
                          className="btn btn-primary-opacity min-w-[120px] font-semibold"
                        >
                          Detail
                        </Link>
                      </div>
                    </div>
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
                      Ups, Kamu Tidak Mempunyai Data
                    </p>
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

export default TransactionList;
