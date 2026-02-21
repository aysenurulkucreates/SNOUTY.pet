interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend: string;
  color: string;
}

// Sub-component for Statistic Cards
const StatCard = ({ title, value, icon, trend, color }: StatCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-xl`}>
        {icon}
      </div>
      <span
        className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith("+") ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
      >
        {trend}
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,284",
      icon: "👥",
      trend: "+12%",
      color: "bg-blue-500",
    },
    {
      title: "Active Pets",
      value: "452",
      icon: "🐾",
      trend: "+5%",
      color: "bg-purple-500",
    },
    {
      title: "Total Bookings",
      value: "89",
      icon: "📅",
      trend: "-2%",
      color: "bg-orange-500",
    },
    {
      title: "Revenue",
      value: "$4,120",
      icon: "💰",
      trend: "+18%",
      color: "bg-emerald-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Ayşe Y.",
      action: "Registered a new pet (Buddy)",
      time: "2 mins ago",
      status: "New",
    },
    {
      id: 2,
      user: "Mehmet K.",
      action: "Updated sitter profile",
      time: "15 mins ago",
      status: "Updated",
    },
    {
      id: 3,
      user: "Zeynep A.",
      action: "Completed a booking",
      time: "1 hour ago",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h2>
        <p className="text-slate-500 text-sm">
          Welcome back! Here is what's happening with Snouty today.
        </p>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* 3. Main Content Section (Activity & Quick Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">
            Recent Activity
          </h3>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {activity.user}
                    </p>
                    <p className="text-xs text-slate-500">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    {activity.time}
                  </p>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips / System Status Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-4">System Insights 💡</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg border border-white/10 text-sm">
              <p className="font-semibold text-blue-300">Tip of the day:</p>
              <p className="text-slate-300 mt-1">
                Check pending pet listings twice to ensure the quality of our
                community!
              </p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-slate-400 mb-2">SERVER UPTIME</p>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[99.9%]" />
              </div>
              <p className="text-[10px] mt-1 text-emerald-400 font-mono">
                99.9% - Stable
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
