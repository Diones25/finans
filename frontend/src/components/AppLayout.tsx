import BreadcrumbComponent from "@/components/Breadcrumb";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <BreadcrumbComponent />
      <Outlet />
    </>
  );
}
