import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getBookingInfo,
  useCreateBookingTransaction,
} from "../../hooks/useBookings";
import { z } from "zod";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../types/types";
import { useFetchDoctor } from "../../hooks/useDoctors";
import { useRef, useState } from "react";

const checkoutSchema = z.object({
  doctor_id: z.number(),
  started_at: z.string(),
  time_at: z.string(),
  proof: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File must be less than 2MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

function CheckoutDoctor() {
  const booking = getBookingInfo();
  const navigate = useNavigate();
  const { mutate: createBookingTransaction, isPending } =
    useCreateBookingTransaction();
  const { data: doctor } = useFetchDoctor(Number(booking?.doctorId));

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      doctor_id: booking?.doctorId || 0,
      started_at: booking?.started_at || "",
      time_at: booking?.time_at || "",
    },
  });

  if (!doctor) {
    return (
      <div className="text-center mt-10 text-red-500">Doctor not found</div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center mt-10 text-red-500">
        Booking info not found
      </div>
    );
  }

  const price = booking.price;
  const tax = Math.round(price * 0.11);
  const total = price + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    setError("root", { type: "server", message: "" });

    createBookingTransaction(data, {
      onSuccess: (transaction) => {
        const transactionState = {
          doctorName: transaction.doctor.name,
          doctorPhoto: transaction.doctor.photo,
          specialistName: transaction.doctor.specialist.name,
          hospitalName: transaction.doctor.hospital.name,
          date: transaction.started_at,
          time: transaction.time_at,
          status: transaction.status,
          grandTotal: transaction.grand_total,
          transactionId: transaction.id,
        };

        navigate("/customer/booking-finished", {
          state: transactionState,
        });
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const { message, errors: fieldErrors } = error.response?.data || {};
        if (message) {
          setError("root", { type: "server", message });
        }
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([key, value]) => {
            setError(key as keyof CheckoutFormData, {
              type: "server",
              message: value[0],
            });
          });
        }
      },
    });
  };

  return (
    <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
      <div
        id="Content-Container"
        className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
      >
        <div id="Top-Nav" className="flex relative w-full h-[128px]">
          <div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
            <div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
              <Link to={`/customer/book-doctor/${doctor.id}`}
                className="size-11 flex shrink-0"
              >
                <img
                  src="/assets/images/icons/mobile-back-button.svg"
                  className="size-full"
                  alt="icon"
                />
              </Link>
              <h1 className="font-bold text-lg leading-none text-center">
                Review &amp; Checkout
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
          <div className="flex flex-col rounded-2xl border border-monday-stroke p-4 bg-white gap-4 mt-5 mx-5">
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
                <p className="font-semibold leading-none text-white">5.0</p>
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
          <div
            id="Checkout-Details"
            className="flex flex-col w-full flex-1 p-5 pb-0 gap-4 bg-white mt-5 min-h-[536px]"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-4">
                <p className="font-bold">Booking Details</p>
                <div className="flex flex-col rounded-2xl border border-monday-stroke">
                  <div className="flex items-center gap-4 p-5 px-4">
                    <div className="flex size-16 rounded-2xl bg-monday-background overflow-hidden shrink-0">
                      <img
                        src={doctor.hospital.photo}
                        className="size-full object-cover"
                        alt="icon"
                      />
                    </div>
                    <div className="flex flex-col gap-[6px] w-full overflow-hidden">
                      <p className="font-bold">{doctor.hospital.name}</p>
                      <div className="flex items-center gap-1 text-nowrap">
                        <img
                          src="/assets/images/icons/location-grey.svg"
                          className="flex size-5 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold text-monday-gray truncate">
                          {doctor.hospital.city} ({doctor.hospital.post_code})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange py-[6px] px-[10px] gap-0.5">
                      <img
                        src="/assets/images/icons/star-sliced-white.svg"
                        className="flex size-5 shrink-0"
                        alt="icon"
                      />
                      <p className="font-semibold leading-none text-white">
                        4.8
                      </p>
                    </div>
                  </div>
                  <hr className="border-monday-stroke" />
                  <div className="flex flex-col p-5 px-4 gap-4">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/calendar-2-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Date
                      </p>
                      <p className="font-bold leading-none">
                        {booking.started_at
                          ? format(new Date(booking.started_at), "dd MMM yyyy")
                          : "-"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/clock-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Time
                      </p>
                      <p className="font-bold leading-none">
                        {booking.time_at}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/ticket-expired-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Price
                      </p>
                      <p className="font-bold leading-none">
                        Rp {price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/money-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Sub Total
                      </p>
                      <p className="font-bold leading-none">
                        Rp {price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/receipt-2-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Tax 11%
                      </p>
                      <p className="font-bold leading-none">
                        Rp {tax.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <hr className="border-monday-stroke" />
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/receipt-text-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Grand Total
                      </p>
                      <p className="font-bold text-lg leading-none text-monday-red">
                        Rp {total.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-bold">Proof of Payment</p>
                <div className="flex flex-col rounded-2xl border border-monday-stroke p-5 px-4 gap-4">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                      <img
                        src="/assets/images/icons/calendar-2-grey.svg"
                        className="size-5"
                        alt="icon"
                      />
                      Bank Name
                    </p>
                    <p className="font-bold leading-none">BWA BANK</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                      <img
                        src="/assets/images/icons/clock-grey.svg"
                        className="size-5"
                        alt="icon"
                      />
                      Bank Account
                    </p>
                    <p className="font-bold leading-none">Bimore Care</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                      <img
                        src="/assets/images/icons/ticket-expired-grey.svg"
                        className="size-5"
                        alt="icon"
                      />
                      Bank Number
                    </p>
                    <p className="font-bold leading-none">555 300 2003</p>
                  </div>
                  <div className="relative flex w-full h-[218px] rounded-[20px] shrink-0 overflow-hidden bg-monday-background">
                    <div
                      id="Add-Photo"
                      onClick={() => fileInputRef.current?.click()}
                      className={`absolute flex items-center justify-center rounded-[20px] size-full border-[1.5px] border-dashed border-monday-blue bg-monday-blue/10 cursor-pointer ${
                        previewImage ? "hidden" : ""
                      }`}
                    >
                      <p className="font-bold text-sm leading-none text-monday-blue text-center">
                        Add Proof of Payment +
                      </p>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setValue("proof", file);
                          setPreviewImage(URL.createObjectURL(file));
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <img
                      id="Thumbnail"
                      src={previewImage ?? "notfound.png"}
                      className={`relative size-full object-cover ${
                        previewImage ? "" : "hidden"
                      }`}
                      alt="proof"
                    />
                    <button
                      type="button"
                      id="Change-Photo"
                      onClick={() => fileInputRef.current?.click()}
                      className={`absolute rounded-full py-4 px-5 bg-monday-black text-nowrap font-bold text-sm text-white h-fit transform -translate-x-1/2 left-1/2 bottom-3 z-20 ${
                        previewImage ? "" : "hidden"
                      }`}
                    >
                      Change Image
                    </button>
                  </div>
                  {errors.proof && (
                    <p className="text-monday-red">{errors.proof.message}</p>
                  )}
                </div>
              </div>
              <div
                id="Bottom-Bar"
                className="flex relative w-full h-[104px] -ml-5"
              >
                <div className="fixed z-30 bottom-0 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
                  <button
                    type="submit"
                    id="Submit-Btn"
                    disabled={isPending}
                    className="flex items-center w-full justify-between rounded-full py-4 px-6 bg-monday-blue disabled:bg-monday-stroke"
                  >
                    <span className="font-semibold text-lg leading-none text-white">
                      {isPending ? "Saving..." : "Book Now"}
                    </span>
                    <img
                      src="/assets/images/icons/arrow-right-circle-white.svg"
                      className="flex size-6 shrink-0"
                      alt="icon"
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CheckoutDoctor;
