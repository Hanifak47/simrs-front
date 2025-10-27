import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginManager from "./pages/manager/LoginManager";
import SpecialistList from "./pages/manager/specialist/SpecialistList";
import AddSpecialist from "./pages/manager/specialist/AddSpecialist";
import OverviewDashboard from "./pages/manager/overview/OverviewDashboard";
import Unauthorized from "./pages/Unauthorized";
import EditSpecialist from "./pages/manager/specialist/EditSpecialist";
import AddHospital from "./pages/manager/hospital/AddHospital";
import HospitalList from "./pages/manager/hospital/HospitalList";
import EditHospital from "./pages/manager/hospital/EditHospital";
import HospitalDetails from "./pages/manager/hospital/HospitalDetails";
import AssignHospitalSpecialist from "./pages/manager/hospital/AssignHospitalSpecialist";
import DoctorList from "./pages/manager/doctor/DoctorList";
import AddDoctor from "./pages/manager/doctor/AddDoctor";
import EditDoctor from "./pages/manager/doctor/EditDoctor";
import SpecialistDetails from "./pages/manager/specialist/SpecialistDetails";
import DoctorDetails from "./pages/manager/doctor/DoctorDetails";
import TransactionList from "./pages/manager/transaction/TransactionList";
import TransactionDetails from "./pages/manager/transaction/TransactionDetails";
import LoginCustomer from "./pages/customer/LoginCustomer";
import RegisterCustomer from "./pages/customer/RegisterCustomer";
import Discover from "./pages/customer/Discover";
import BrowseHospital from "./pages/customer/BrowseHospital";
import CustomerHospitalDetails from "./pages/customer/CustomerHospitalDetails";
import BrowseDoctor from "./pages/customer/BrowseDoctor";
import CustomerDoctorDetail from "./pages/customer/CustomerDoctorDetails";
import BookDoctor from "./pages/customer/BookDoctor";
import CheckoutDoctor from "./pages/customer/CheckoutDoctor";
import BookFinished from "./pages/customer/BookFinished";
import MyOrders from "./pages/customer/MyOrders";
import CustomerSettings from "./pages/customer/CustomerSettings";
import MyOrderDetails from "./pages/customer/MyOrderDetails";
import BrowseSpecialist from "./pages/customer/BrowseSpecialist";
import Onboarding from "./pages/customer/Onboarding";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/customer/login" element={<LoginCustomer />} />
            <Route path="/customer/register" element={<RegisterCustomer />} />

            <Route path="/admin/login" element={<LoginManager />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              path="/customer/discover"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <Discover />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/discover/specialists"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <BrowseSpecialist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/discover/:specialistId/hospitals"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <BrowseHospital />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/hospital/details/:hospitalId/:specialistId"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <CustomerHospitalDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/browse-doctors/:hospitalId/:specialistId"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <BrowseDoctor />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/doctor/details/:doctorId"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <CustomerDoctorDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/book-doctor/:doctorId"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <BookDoctor />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/checkout"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <CheckoutDoctor />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/booking-finished"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <BookFinished />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/my-orders"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <MyOrders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/my-orders/:orderId"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <MyOrderDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customer/settings"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <CustomerSettings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/overview"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <OverviewDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/specialists"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <SpecialistList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/specialists/details/:id"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <SpecialistDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/specialists/create"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <AddSpecialist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/specialists/edit/:id"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <EditSpecialist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/hospitals"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <HospitalList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hospitals/create"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <AddHospital />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hospitals/edit/:id"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <EditHospital />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/hospitals/details/:id"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <HospitalDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hospitals/details/:id/assign-specialist"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <AssignHospitalSpecialist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/transactions"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <TransactionList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/transactions/details/:id"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <TransactionDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <DoctorList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors/details/:id"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <DoctorDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors/create"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <AddDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors/edit/:id"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <EditDoctor />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
