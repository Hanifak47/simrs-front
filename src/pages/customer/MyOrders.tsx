import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../../hooks/useAuth";
import { useMyOrders } from "../../hooks/useBookings";

function MyOrders() {
  const { user } = useAuth();

  const { data: orders, isLoading, isError } = useMyOrders();

  if (!user) return <p className="p-8">User not logged in.</p>;

  if (isLoading) return <p className="p-8">Loading orders...</p>;
  if (isError) return <p className="p-8">Loading error...</p>;

  return (
    <div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9]">
      <div
        id="Content-Container"
        className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
      >
        <div
          id="Top-Nav"
          className="flex items-center justify-between h-[112px] w-full p-5 pt-8 bg-white"
        >
          <div className="flex items-center w-full gap-2">
          <Link to={'/customer/settings'}>
              <div className="relative flex size-[60px] shrink-0 items-center justify-center">
                <div
                  id="Avatar-Container"
                  className="flex size-full rounded-full overflow-hidden border-[3px] border-white ring-2 ring-monday-blue bg-monday-background"
                >
                  <img
                    src={user.photo}
                    className="size-full object-cover"
                    alt="avatar"
                  />
                </div>
                <p className="absolute transform -translate-x-1/2 left-1/2 -bottom-[2px] flex items-center gap-0.5 h-5 w-12 rounded-[20px] py-1 px-2 bg-monday-blue">
                  <img
                    src="/assets/images/icons/crown-white-fill.svg"
                    className="flex size-3 shrink-0"
                    alt="icon"
                  />
                  <span className="font-extrabold text-[8px] text-white leading-none">
                    PRO
                  </span>
                </p>
              </div>
            </Link>
            <div className="flex flex-col gap-[6px]">
              <p className="font-bold">{user.name}</p>
              <p className="flex items-center gap-0.5">
                <img
                  src="/assets/images/icons/location-rounded-grey-fill.svg"
                  className="flex size-4 shrink-0"
                  alt="icon"
                />
                <span className="font-semibold text-sm leading-none text-monday-gray text-nowrap">
                  Malang, Indonesia
                </span>
                <img
                  src="/assets/images/icons/arrow-down-grey-thick.svg"
                  className="flex size-3 shrink-0"
                  alt="icon"
                />
              </p>
            </div>
          </div>
          <a href="#" className="flex size-12 shrink-0">
            <img
              src="/assets/images/icons/notification-circle.svg"
              className="size-12"
              alt="icon"
            />
          </a>
        </div>
        <main className="flex flex-col flex-1">
          <div className="flex flex-col w-full p-5 gap-4 bg-white mb-5 mt-2">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-2xl">My Orders</p>
              <p className="font-semibold text-sm leading-none text-monday-gray">
                {orders && orders.length} Total Orders
              </p>
            </div>

            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col rounded-2xl border border-monday-stroke p-4 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-16 rounded-2xl bg-monday-background overflow-hidden shrink-0">
                      <img
                        src={order.doctor.hospital.photo}
                        className="size-full object-cover"
                        alt="icon"
                      />
                    </div>
                    <div className="flex flex-col gap-[6px] w-full overflow-hidden">
                      <p className="font-semibold">
                        {order.doctor.hospital.name}
                      </p>
                      <div className="flex items-center gap-1 text-nowrap">
                        <img
                          src="/assets/images/icons/location-grey.svg"
                          className="flex size-5 shrink-0"
                          alt="icon"
                        />
                        <p className="font-semibold text-monday-gray truncate">
                          {order.doctor.hospital.city} (
                          {order.doctor.hospital.post_code})
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
                      {order.status === "Approved" && (
                        <p className="rounded-[4px] py-[6px] px-2 bg-monday-green/10 font-bold text-monday-green">
                          Approved
                        </p>
                      )}
                      {order.status === "Waiting" && (
                        <p className="rounded-[4px] py-[6px] px-2 bg-monday-orange/10 font-bold text-monday-orange">
                          Waiting
                        </p>
                      )}
                      {order.status === "Rejected" && (
                        <p className="rounded-[4px] py-[6px] px-2 bg-monday-red/10 font-bold text-monday-red">
                          Rejected
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
                        <img
                          src="/assets/images/icons/stetoscop-grey.svg"
                          className="size-5"
                          alt="icon"
                        />
                        Specialist
                      </p>
                      <p className="font-bold leading-none">
                        {order.doctor.specialist.name}
                      </p>
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
                        {format(new Date(order.started_at), "dd MMMM yyyy")}
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
                      <p className="font-bold leading-none">{order.time_at}</p>
                    </div>
                  </div>
                  <hr className="border-monday-stroke" />
                  <Link
                    to={`/customer/my-orders/${order.id}`}
                    className="flex items-center justify-center w-full h-[56px] rounded-full py-4 px-6 bg-monday-blue/10"
                  >
                    <span className="font-semibold text-lg leading-none text-monday-blue">
                      View Details
                    </span>
                  </Link>
                </div>
              ))
            ) : (
              <div
                id="Empty-State"
                className="  flex flex-col flex-1 items-center justify-center rounded-[20px] p-[10px] gap-8"
              >
                <img
                  src="/assets/images/icons/note-remove-grey.svg"
                  className="size-[52px]"
                  alt="icon"
                />
                <div className="flex flex-col gap-1 items-center text-center">
                  <p className="font-semibold text-monday-gray text-lg">
                    Oops, you don't have any data yet
                  </p>
                  <Link to={'/customer/discover/'}
                    className="font-bold text-monday-blue leading-none"
                  >
                    Make Appointment +
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
        <div id="Menu-Bar" className="flex relative h-[100px] w-full">
          <div className="fixed bottom-0 z-30 h-[100px] w-full max-w-[640px] grid grid-cols-2 gap-4 items-center">
            <div className="backdrop absolute flex justify-center w-full h-full drop-shadow-2xl">
              <img
                src="/assets/images/backgrounds/Subtract-menu-bar.svg"
                className="h-full"
                alt=""
              />
              <div className="absolute h-full w-1/3 bg-white left-0 border-t border-monday-stroke" />
              <div className="absolute h-full w-1/3 bg-white right-0 border-t border-monday-stroke" />
            </div>
            <div className="relative grid grid-cols-2 justify-evenly pr-[30px] h-full px-6">
              <Link to="/customer/discover" className="group menu">
                <div className="flex flex-col h-full items-center gap-2 pt-6">
                  <img
                    src="/assets/images/icons/home-grey-fill-opacity.svg"
                    className="flex size-6 shrink-0 group-[.active]:hidden"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/home-blue-fill-opacity.svg"
                    className="size-6 shrink-0 hidden group-[.active]:flex"
                    alt="icon"
                  />
                  <span className="font-semibold leading-none text-monday-gray group-[&.active]:text-monday-blue">
                    Home
                  </span>
                  <img
                    src="/assets/images/icons/menu-active-icon.svg"
                    className="mt-auto mb-0 mx-auto hidden group-[&.active]:flex"
                    alt="active"
                  />
                </div>
              </Link>
              <Link to="/customer/my-orders" className="group menu active">
                <div className="flex flex-col h-full items-center gap-2 pt-6">
                  <img
                    src="/assets/images/icons/stickynote-grey-fill-opacity.svg"
                    className="flex size-6 shrink-0 group-[.active]:hidden"
                    alt="icon"
                  />
                  <img
                    src="/assets/images/icons/stickynote-blue-fill-opacity.svg"
                    className="size-6 shrink-0 hidden group-[.active]:flex"
                    alt="icon"
                  />
                  <span className="font-semibold leading-none text-monday-gray group-[&.active]:text-monday-blue">
                    Orders
                  </span>
                  <img
                    src="/assets/images/icons/menu-active-icon.svg"
                    className="mt-auto mb-0 mx-auto hidden group-[&.active]:flex"
                    alt="active"
                  />
                </div>
              </Link>
            </div>
            <a
              href="#"
              className="flex size-[60px] shrink-0 absolute transform -translate-x-1/2 left-1/2 -top-[30px]"
            >
              <img
                src="/assets/images/icons/Nav.svg"
                className="size-full object-contain"
                alt="icon"
              />
            </a>
            <div className="relative grid grid-cols-2 justify-evenly pr-[30px] h-full px-6">
              <a href="#" className="group menu">
                <div className="flex flex-col h-full items-center gap-2 pt-6">
                  <img
                    src="/assets/images/icons/direct-inbox-grey-fill-opacity.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                  <span className="font-semibold leading-none text-monday-gray group-[&.active]:text-monday-blue">
                    Inbox
                  </span>
                  <img
                    src="/assets/images/icons/menu-active-icon.svg"
                    className="mt-auto mb-0 mx-auto hidden group-[&.active]:flex"
                    alt="active"
                  />
                </div>
              </a>
              <Link to="/customer/settings" className="group menu">
                <div className="flex flex-col h-full items-center gap-2 pt-6">
                  <img
                    src="/assets/images/icons/setting-2-grey-fill-opacity.svg"
                    className="flex size-6 shrink-0"
                    alt="icon"
                  />
                  <span className="font-semibold leading-none text-monday-gray group-[&.active]:text-monday-blue">
                    Settings
                  </span>
                  <img
                    src="/assets/images/icons/menu-active-icon.svg"
                    className="mt-auto mb-0 mx-auto hidden group-[&.active]:flex"
                    alt="active"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
