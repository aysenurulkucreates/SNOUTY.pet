import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

// StatCardProps ve StatCard bileşeni aynı kalıyor (Pırlanta gibi!)
interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend: string;
  color: string;
}

interface User {
  _id: string;
  username?: string;
  email: string;
  createdAt: string;
}

// Pati Tipi (Pet Interface)
interface Pet {
  _id: string;
  name: string;
  type: string;
  createdAt: string;
}

// Aktivite State'i için pırlanta bir paket
interface ActivityState {
  recentUsers: User[];
  recentPets: Pet[];
}

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
  const { token } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, totalPets: 0 });
  const [activities, setActivities] = useState<ActivityState>({
    recentUsers: [],
    recentPets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activitiesRes] = await Promise.all([
          fetch("http://localhost:8800/api/admin/stats", {
            headers: { Authorization: `Bearer ${token}` }, // Kimlik kartımızı ekledik
          }),
          fetch("http://localhost:8800/api/admin/recent-activities", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const statsData = await statsRes.json();
        const activitiesData = await activitiesRes.json();

        setStats(statsData);
        setActivities(activitiesData);
        setLoading(false);
      } catch (error) {
        console.error("Dashboard yüklenirken hata oluştu:", error);
        setLoading(false);
      }
    };

    if (token) fetchData(); // Sadece token varsa veriyi çek
  }, [token]);

  if (loading)
    return (
      <p className="p-10 text-center font-medium text-slate-600">
        Data is loading, please wait... ☕
      </p>
    );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-800 mb-8 font-serif">
        Snouty Admin Control Center 🐾
      </h1>

      {/* Üst Kısım: İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total User"
          value={stats?.totalUsers?.toLocaleString() || "0"}
          icon="👥"
          trend="+12%"
          color="text-blue-600 bg-blue-600"
        />
        <StatCard
          title="Total Pet"
          value={stats?.totalPets?.toLocaleString() || "0"}
          icon="🐾"
          trend="+5%"
          color="text-purple-600 bg-purple-600"
        />
        <StatCard
          title="Bookings"
          value="89"
          icon="📅"
          trend="-2%"
          color="text-orange-600 bg-orange-600"
        />
        <StatCard
          title="Revenue"
          value="$4,120"
          icon="💰"
          trend="+18%"
          color="text-emerald-600 bg-emerald-600"
        />
      </div>

      {/* Alt Kısım: Ayrı Odalar (Recent Activities) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sol Oda: Son Kayıt Olan Kullanıcılar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            👤 Recent Registered Users
          </h2>
          <div className="space-y-4">
            {activities.recentUsers?.map((user: User) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0"
              >
                <span className="font-medium text-slate-700">
                  {user.username || user.email}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Oda: Yeni Eklenen Patiler */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            🐾 Newest Furry Friends
          </h2>
          <div className="space-y-4">
            {activities.recentPets?.map((pet: Pet) => (
              <div
                key={pet._id}
                className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0"
              >
                <span className="font-medium text-slate-700">
                  {pet.name}{" "}
                  <span className="text-slate-400 text-xs">({pet.type})</span>
                </span>
                <span className="text-xs text-emerald-500 font-semibold px-2 py-1 bg-emerald-50 rounded-full">
                  New
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
