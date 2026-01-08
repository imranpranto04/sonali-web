import MaintenancePage from "@/components/common/MaintenancePage";

export const metadata = {
  title: "Careers | Sonali Life Insurance",
  description: "Join our team. Career page coming soon.",
};

export default function CareerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* You can still keep your header or footer visible if you want */}

      <MaintenancePage
        title="Career Opportunities Coming Soon"
        description="We are currently building a new portal for job applicants. Please check back later or email our HR team for open positions."
        showHomeButton={true}
      />
    </div>
  );
}
