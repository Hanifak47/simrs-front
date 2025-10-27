import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";

function BookFinished() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="text-center mt-10 text-red-500">
        No transaction data found. Please return to your orders.
        <Link to="/customer/my-orders" className="text-blue-500 underline ml-2">
          Go back
        </Link>
      </div>
    );
  } 
  
  const {
    doctorPhoto,
    doctorName,
    specialistName,
    hospitalName,
    date,
    time,
    status,
    grandTotal,
  } = state;

  return (
    <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
      <div
        id="Content-Container"
        className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
      >
        <main className="flex flex-col flex-1">
          {/* Success Message */}
          <div className="flex flex-col items-center justify-center w-full h-[321px] pt-[90px] px-5 pb-[50px] gap-6 bg-white">
            <img
              src="/assets/images/icons/success-check.svg"
              className="h-[106px]"
              alt="icon"
            />
            <div>
              <p className="font-semibold text-xl capitalize text-center">
                Your appointment is confirmed
              </p>
              <p className="font-medium text-center text-monday-gray">
                Your booking is being processed
              </p>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="flex flex-col w-full p-5 gap-4 bg-white mt-2">
            <p className="font-bold">Booking Details</p>
            <div className="flex flex-col rounded-2xl border border-monday-stroke p-4 gap-4">
              <div className="flex items-center gap-4">
                <div className="flex size-16 rounded-full bg-monday-background overflow-hidden shrink-0">
                  <img
                    src={doctorPhoto}
                    className="size-full object-cover"
                    alt="doctor"
                  />
                </div>
                <div className="flex flex-col gap-[6px] w-full">
                  <p className="font-semibold">{doctorName}</p>
                  <div className="flex items-center gap-1 text-nowrap">
                    <img
                      src="/assets/images/icons/stetoscop-grey.svg"
                      className="flex size-5 shrink-0"
                      alt="icon"
                    />
                    <p className="font-semibold text-monday-gray leading-none">
                      {specialistName}
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

              <hr className="border-monday-stroke" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                    <img
                      src="/assets/images/icons/timer-grey.svg"
                      className="size-5"
                      alt="icon"
                    />
                    Status
                  </p>
                  <p className="h-8 rounded-[4px] py-[6px] px-2 bg-monday-orange/10 font-bold leading-none text-monday-orange">
                    {status}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                    <img
                      src="/assets/images/icons/hospital-grey.svg"
                      className="size-5"
                      alt="icon"
                    />
                    Hospital
                  </p>
                  <p className="font-bold leading-none">{hospitalName}</p>
                </div>
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
                    {format(new Date(date), "dd MMMM yyyy")}
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
                  <p className="font-bold leading-none">{time}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                    <img
                      src="/assets/images/icons/receipt-2-grey.svg"
                      className="size-5"
                      alt="icon"
                    />
                    Grand Total
                  </p>
                  <p className="font-bold leading-none text-monday-red">
                    Rp {grandTotal.toLocaleString("id")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="Bottom-Bar" className="flex relative w-full h-[171px] mt-2">
            <div className="fixed z-30 bottom-0 flex flex-col gap-3 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
              <Link
                to="/customer/my-orders"
                className="flex items-center justify-center w-full h-[55px] rounded-full py-4 px-6 bg-monday-blue"
              >
                <span className="font-semibold text-lg leading-none text-white">
                  View Orders
                </span>
              </Link>
              <Link
                to="/customer/discover"
                className="flex items-center justify-center w-full h-[55px] rounded-full py-4 px-6 bg-monday-blue/10"
              >
                <span className="font-semibold text-lg leading-none text-monday-blue">
                  Back to Homepage
                </span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BookFinished;
