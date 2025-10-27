import { Link, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import {
  useFetchTransaction,
  useUpdateTransactionStatus,
} from "../../../hooks/useTransactions";
import { useState } from "react";
import UserProfileCard from "../../../components/UserProfileCard";
import { formatDate } from "../../../utils/format";
import { ImagePreviewModal } from "../../../components/ImagePreviewModal";

const TransactionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: transaction, isPending } = useFetchTransaction(Number(id));

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateTransactionStatus();
  const [actionError, setActionError] = useState("");

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleStatusChange = (newStatus: "Approved" | "Rejected") => {
    if (!transaction?.id) return;

    setActionError("");

    updateStatus(
      { id: transaction.id, status: newStatus },
      {
        onError: (error) => {
          setActionError("Gagal mengubah status, coba lagi.");
          console.error(error);
        },
      }
    );
  };

  if (isPending) return <p className="p-8">Tunggu...</p>;
  if (!transaction) return <p className="p-8">Transaksi Tidak Ditemukan.</p>;

  return (
    <>
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
                  Detail Transaksi
                </h1>
                <Link
                  to={`/admin/transactions/`}
                  className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none"
                >
                  <img
                    src="/assets/images/icons/arrow-left-grey.svg"
                    className="size-[18px] flex shrink-0"
                    alt="icon"
                  />
                  Manajemen Transaksi
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
              id="Transaction-info"
              className="flex items-center justify-between gap-5 rounded-[20px] p-5 bg-white"
            >
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
                <div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0 p-[10px]">
                  <img
                    src={transaction.doctor.specialist.photo}
                    className="size-full object-cover"
                    alt="icon"
                  />
                </div>
                <div className="flex flex-col gap-[6px] flex-1">
                  <p className="font-semibold text-xl line-clamp-1">
                    {transaction.doctor.specialist.name}
                  </p>
                  <p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
                    <img
                      src="/assets/images/icons/hospital-grey.svg"
                      className="size-6"
                      alt="icon"
                    />
                    {transaction.doctor.hospital.name}
                  </p>
                </div>
              </div>
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
            </section>
            <div className="flex gap-5 flex-1">
              <section
                id="Booking-Details"
                className="flex flex-col gap-5 w-[calc((550/960)*100%)] shrink-0"
              >
                {transaction.status === "Rejected" && (
                  <div
                    id="Note-Red"
                    className="relative w-full h-[92px] rounded-[20px] overflow-hidden"
                  >
                    <div className="absolute w-full h-full overflow-hidden">
                      <img
                        src="/assets/images/backgrounds/red-note.svg"
                        className="w-full h-full object-cover"
                        alt="background"
                      />
                    </div>
                    <div className="relative flex items-center w-full h-full p-5 gap-[10px]">
                      <img
                        src="/assets/images/icons/note-remove-white-fill.svg"
                        className="flex size-[52px] shrink-0"
                        alt="icon"
                      />
                      <p className="font-semibold text-lg leading-[1.4em] text-white">
                        Maaf, dokter sedang tidak ada. Kami sedang memproses pengembalian dana Anda.
                      </p>
                    </div>
                  </div>
                )}

                {transaction.status === "Approved" && (
                  <div
                    id="Note-Green"
                    className="relative w-full h-[92px] rounded-[20px] overflow-hidden"
                  >
                    <div className="absolute w-full h-full overflow-hidden">
                      <img
                        src="/assets/images/backgrounds/green-note.svg"
                        className="w-full h-full object-cover"
                        alt="background"
                      />
                    </div>
                    <div className="relative flex items-center w-full h-full p-5 gap-[10px]">
                      <img
                        src="/assets/images/icons/stickynote-white-fill.svg"
                        className="flex size-[52px] shrink-0"
                        alt="icon"
                      />
                      <p className="font-semibold text-lg leading-[1.4em] text-white">
                        Janji temu disetujui. Dokter telah mengonfirmasi ketersediaan mereka.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col h-fit w-full rounded-[20px] p-5 gap-5 bg-white">
                  <p className="header font-semibold text-xl">
                    Detail Pesanan
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 w-full">
                        <div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
                          <img
                            src={transaction.doctor.photo}
                            className="size-full object-cover"
                            alt="icon"
                          />
                        </div>
                        <div className="flex flex-col gap-[6px] flex-1">
                          <p className="font-semibold text-xl">
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
                      <div className="flex flex-col justify-center text-right gap-2 shrink-0">
                        <p className="flex items-center gap-0.5 font-semibold text-lg leading-none text-nowrap">
                          <img
                            src="/assets/images/icons/briefcase-blue-fill.svg"
                            className="size-5"
                            alt="icon"
                          />
                          {transaction.doctor.yoe} Tahun
                        </p>
                        <p className="font-medium text-lg text-monday-gray">
                          Pengalaman
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col rounded-2xl border border-monday-stroke p-5 gap-5">
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-[6px] font-medium text-monday-gray text-lg leading-none">
                          <img
                            src="/assets/images/icons/calendar-2-grey.svg"
                            className="size-6"
                            alt="icon"
                          />
                          Tanggal
                        </p>
                        <p className="font-semibold text-xl leading-none">
                          {formatDate(transaction.started_at)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-[6px] font-medium text-monday-gray text-lg leading-none">
                          <img
                            src="/assets/images/icons/clock-grey.svg"
                            className="size-6"
                            alt="icon"
                          />
                          Waktu
                        </p>
                        <p className="font-semibold text-xl leading-none">
                          {transaction.time_at}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-[6px] font-medium text-monday-gray text-lg leading-none">
                          <img
                            src="/assets/images/icons/ticket-expired-grey.svg"
                            className="size-6"
                            alt="icon"
                          />
                          Harga
                        </p>
                        <p className="font-semibold text-xl leading-none">
                          Rp {transaction.sub_total.toLocaleString("id")}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-[6px] font-medium text-monday-gray text-lg leading-none">
                          <img
                            src="/assets/images/icons/receipt-2-grey.svg"
                            className="size-6"
                            alt="icon"
                          />
                          Pajak 11%
                        </p>
                        <p className="font-semibold text-xl leading-none">
                          Rp {transaction.tax_total.toLocaleString("id")}
                        </p>
                      </div>
                      <hr className="border-monday-stroke" />
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-[6px] font-medium text-monday-gray text-lg leading-none">
                          <img
                            src="/assets/images/icons/receipt-text-grey.svg"
                            className="size-6"
                            alt="icon"
                          />
                          Total Seluruhnya
                        </p>
                        <p className="font-semibold text-2xl leading-none">
                          Rp {transaction.grand_total.toLocaleString("id")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="header font-semibold text-xl">
                      Bukti Pembayaran
                    </p>
                    <div className="relative w-full h-[333px] rounded-2xl overflow-hidden bg-monday-gray-background">
                      <img
                        src={transaction.proof}
                        className="size-full object-cover"
                        alt="proof"
                      />
                      <button
                        onClick={() => setIsPreviewOpen(true)}
                        className="absolute transform -translate-x-1/2 left-1/2 bottom-3 flex items-center justify-center rounded-full py-[10px] px-3 gap-[6px] bg-white"
                      >
                        <img
                          src="/assets/images/icons/maximize-3-black.svg"
                          className="size-5 flex shrink-0"
                          alt="icon"
                        />
                        <p className="font-extrabold text-sm leading-none">
                          Tampilan
                        </p>
                      </button>
                    </div>
                  </div>

                  {transaction.status === "Waiting" && (
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => handleStatusChange("Approved")}
                        disabled={isUpdating}
                        className="btn btn-primary font-semibold text-lg leading-none"
                      >
                        {isUpdating ? "Approving..." : "Approve Order"}
                      </button>

                      <button
                        onClick={() => handleStatusChange("Rejected")}
                        disabled={isUpdating}
                        className="btn bg-monday-red/10 text-monday-red rounded-2xl font-semibold text-lg leading-none"
                      >
                        {isUpdating ? "Rejecting..." : "Reject Order"}
                      </button>
                    </div>
                  )}
                  {actionError && (
                    <p className="text-red-500 text-sm">{actionError}</p>
                  )}
                </div>
              </section>
              <section
                id="Hospital-Details"
                className="flex flex-col h-fit w-full rounded-[20px] p-5 gap-6 bg-white"
              >
                <p className="header font-semibold text-xl">Detail Rumah Sakit</p>
                <div className="flex items-center gap-4 w-full">
                  <div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
                    <img
                      src={transaction.doctor.hospital.photo}
                      className="size-full object-cover"
                      alt="icon"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
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
                    <p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
                      <img
                        src="/assets/images/icons/star-sliced.svg"
                        className="size-6"
                        alt="icon"
                      />
                      4.8/5.0
                    </p>
                  </div>
                </div>
                <div className="w-full h-[290px] overflow-hidden rounded-3xl resize-none">
                  <div id="g-mapdisplay" className="size-full">
                    <iframe
                      className="size-full border-none"
                      src={`https://www.google.com/maps/embed/v1/place?q=${transaction.doctor.hospital.name}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                    ></iframe>
                  </div>
                </div>
                <p className="font-semibold text-lg leading-[1.6em]">
                  {transaction.doctor.hospital.address}{" "}
                  {transaction.doctor.hospital.post_code} Indonesia
                </p>
              </section>
            </div>
          </main>
        </div>
      </div>

      {isPreviewOpen && (
        <ImagePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          src={transaction.proof}
        />
      )}
    </>
  );
};

export default TransactionDetails;
