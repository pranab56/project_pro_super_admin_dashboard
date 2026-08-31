import RevenueChart from "@/components/overview/RevenueChart";
import ServicesChart from "@/components/overview/ServicesChart";
import RecentContractor from "@/components/overview/RecentContractor";
import PendingProperty from "@/components/overview/PendingProperty";

const page = () => {
  return (
    <div className="space-y-6">
      {/* Analytics Charts & Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 ">
        <RevenueChart />
        <ServicesChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <RecentContractor />
        <PendingProperty />
      </div>
    </div>
  )
};

export default page;