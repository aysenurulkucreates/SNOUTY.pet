import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Importing your custom secure hook

// 1. Defining the User model for TypeScript strictly
interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

const UserManagement = () => {
  const { token } = useAuth(); // Your admin "entry permit"
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch Operation (GET Request)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8800/api/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setUsers(data);
      } catch (err: unknown) {
        // Handling errors with medical-grade precision
        if (axios.isAxiosError(err)) {
          console.error(
            "Fetch failed:",
            err.response?.data?.msg || err.message,
          );
        }
      } finally {
        setLoading(false); // Stop the scanner once finished
      }
    };

    if (token) fetchUsers();
  }, [token]);

  // 3. Delete Operation (DELETE Request)
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you certain you want to terminate this user?"))
      return;

    try {
      await axios.delete(`http://localhost:8800/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Updating state to remove the user instantly
      setUsers(users.filter((user) => user._id !== id));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert("Action rejected: " + (err.response?.data?.msg || err.message));
      }
    }
  };

  // 4. Role Update Operation (PATCH Request)
  const handleUpdateRole = async (id: string, currentStatus: boolean) => {
    try {
      await axios.patch(
        `http://localhost:8800/api/admin/users/${id}`,
        { isAdmin: !currentStatus }, // Toggle admin status
        { headers: { Authorization: `Bearer ${token}` } },
      );
      // Synchronizing local state with backend updates
      setUsers(
        users.map((u) =>
          u._id === id ? { ...u, isAdmin: !currentStatus } : u,
        ),
      );
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Update failed:", err.response?.data?.msg || err.message);
      }
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-slate-500 font-medium">
        Scanning patient records... 🐾☕
      </div>
    );

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">👤 User Management</h2>
        <span className="text-sm text-slate-400 font-medium italic">
          {users.length} total users in database
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <th className="pb-4">Identity Info</th>
              <th className="pb-4 text-center">Authorization Level</th>
              <th className="pb-4 text-right">Emergency Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-slate-50 transition-all duration-300"
              >
                <td className="py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700">
                      {user.username || "Anonymous"}
                    </span>
                    <span className="text-xs text-slate-400 font-mono italic">
                      {user.email}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <button
                    onClick={() => handleUpdateRole(user._id, user.isAdmin)}
                    className={`px-3 py-1 rounded-full text-[9px] font-black tracking-tighter transition-colors ${
                      user.isAdmin
                        ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                    }`}
                  >
                    {user.isAdmin ? "ADMINISTRATOR" : "STANDARD USER"}
                  </button>
                </td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-rose-500 font-bold text-[10px] uppercase hover:text-rose-700 tracking-wider"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
