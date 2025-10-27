import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDoctorAvailability, useFetchDoctor } from "../../hooks/useDoctors";
import { format, addDays } from "date-fns";
import { useBookDoctor } from "../../hooks/useBookings";

function BookDoctor() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { data: doctor, isPending, isError } = useFetchDoctor(Number(doctorId));
  const { data: availability, isPending: isLoadingAvailability } =
    useDoctorAvailability(Number(doctorId));

  const bookingDays = [1, 2, 3].map((offset) => addDays(new Date(), offset));
  const availableTimes = ['10:30', '11:30', '13:30', '14:30', '15:30', '16:30'];

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const saveBooking = useBookDoctor();

  const handleContinue = () => {
    if (!selectedDate || !selectedTime || !doctor) return;

    saveBooking({
      doctorId: doctor.id,
      doctorName: doctor.name,
      started_at: selectedDate,
      time_at: selectedTime,
      specialist: doctor.specialist?.name ?? "",
      price: doctor.specialist?.price ?? 0,
    });

    navigate("/customer/checkout");
  };

  if (isPending || isLoadingAvailability) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError || !doctor || !availability) {
    return (
      <div className="text-center mt-10 text-red-500">Doctor not found</div>
    );
  }

  return (
    <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
      <div
        id="Content-Container"
        className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
      >
        <div id="Top-Nav" className="flex relative w-full h-[128px]">
          <div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
            <div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
              <Link to={`/customer/doctor/details/${doctorId}`}
                className="size-11 flex shrink-0"
              >
                <img
                  src="/assets/images/icons/mobile-back-button.svg"
                  className="size-full"
                  alt="icon"
                />
              </Link>
              <h1 className="font-bold text-lg leading-none text-center">
                Book Doctor
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
            <div className="flex size-16 rounded-2xl bg-monday-background overflow-hidden shrink-0">
              <img
                src={doctor.hospital.photo}
                className="size-full object-cover"
                alt="icon"
              />
            </div>
            <div className="flex flex-col gap-[6px] w-full overflow-x-hidden">
              <p className="font-semibold text-lg">{doctor.hospital.name}</p>
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
              <p className="font-semibold leading-none text-white">4.8</p>
            </div>
          </div>
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
            id="Choose-Date"
            className="flex flex-col w-full flex-1 p-5 pb-0 gap-4 bg-white mt-5 min-h-[536px]"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleContinue();
              }}
              className="flex flex-col gap-8"
            >
              <div className="peer/date flex flex-col gap-4">
                <p className="font-bold">Choose Date</p>
                <div className="grid grid-cols-3 gap-4">
                  {bookingDays.map((date) => {
                    const formattedDate = format(date, "yyyy-MM-dd");
                    const isSoldOut =
                      availability[formattedDate] &&
                      Object.values(availability[formattedDate]).every(
                        (slot) => !slot
                      );

                    return (
                      <label
                        key={formattedDate}
                        className="group relative flex flex-col items-center justify-center text-center rounded-xl ring-[1.5px] ring-monday-stroke p-4 gap-1 has-[:checked]:ring-2 has-[:checked]:ring-monday-blue has-[:checked]:bg-monday-blue/10 has-[:disabled]:bg-monday-stroke transition-300"
                      >
                        <input
                          type="radio"
                          name="date"
                          className="absolute -z-10"
                          disabled={isSoldOut}
                          onChange={() => {
                            setSelectedDate(formattedDate);
                            setSelectedTime(null);  
                          }}
                        />
                        <p className="font-bold text-lg group-has-[:checked]:text-monday-blue transition-300">
                          {format(date, "dd MMM")}
                        </p>
                        <p className="font-semibold text-sm text-monday-gray leading-none">
                          {format(date, "EEE")}
                        </p>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="peer/time peer-has-[:checked]/date:flex hidden flex-col gap-4">
                <p className="font-bold">Choose Time</p>
                <div className="grid grid-cols-3 gap-4">
                  {availableTimes.map((time) => {
                    const isAvailable =
                      availability[selectedDate || ""]?.includes(time);

                    return (
                      <label
                        key={time}
                        className="group relative flex flex-col items-center justify-center text-center rounded-xl ring-[1.5px] ring-monday-stroke p-4 gap-1 has-[:checked]:ring-2 has-[:checked]:ring-monday-blue has-[:checked]:bg-monday-blue/10 has-[:disabled]:bg-monday-stroke transition-300"
                      >
                        <input
                          type="radio"
                          name="time"
                          value={time}
                          className="absolute -z-10"
                          disabled={!isAvailable}
                          onChange={() => setSelectedTime(time)}
                        />
                        <div className="flex items-center gap-1">
                          <div className="relative flex size-[18px] shrink-0">
                            <img
                              src="/assets/images/icons/clock-blue-thick.svg"
                              className="absolute size-full object-contain opacity-0 group-has-[:checked]:opacity-100 transition-300"
                              alt="icon"
                            />
                            <img
                              src="/assets/images/icons/clock-black-thick.svg"
                              className="absolute size-full object-contain opacity-100 group-has-[:checked]:opacity-0 transition-300"
                              alt="icon"
                            />
                          </div>
                          <p className="font-bold group-has-[:checked]:text-monday-blue transition-300">
                            {time}
                          </p>
                        </div>
                        <p
                          className={`font-semibold text-sm leading-none ${
                            isAvailable
                              ? "text-monday-blue group-has-[:checked]:text-monday-gray"
                              : "text-monday-gray"
                          } transition-300`}
                        >
                          {isAvailable ? "Available" : "Soldout"}
                        </p>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="peer-has-[:checked]/time:flex hidden h-[104px] w-full">
                <div
                  id="Bottom-Bar"
                  className="flex relative w-full h-[104px] -ml-5"
                >
                  <div className="fixed z-30 bottom-0 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
                    <button
                      type="submit"
                      className="flex items-center w-full justify-between rounded-full py-4 px-6 bg-monday-blue disabled:bg-gray-300 disabled:cursor-not-allowed"
                      disabled={!selectedDate || !selectedTime}
                    >
                      <span className="font-semibold text-lg leading-none text-white">
                        Continue Payment
                      </span>
                      <img
                        src="/assets/images/icons/arrow-right-circle-white.svg"
                        className="flex size-6 shrink-0"
                        alt="icon"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BookDoctor;
