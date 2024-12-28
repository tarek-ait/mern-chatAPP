import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js"
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import { Users } from 'lucide-react';
import { useAuthStore } from "../store/useAuthStore.js";

const Sidebar = () => {


  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers  } = useAuthStore();

  const [showOnline, setShowOnline] = useState(false)

  useEffect(() => {
    getUsers()
  }, [getUsers]);

  const filteredUsers = showOnline ? users.filter((user) => onlineUsers.includes(user._id)) : users

  if (isUsersLoading) return <SidebarSkeleton />
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users></Users>
          <span className="hidden lg:inline">Contacts</span>
        </div>
        {/* to do, online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnline}
              onChange={(e) => setShowOnline(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
      {Array.isArray(filteredUsers) ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-base-300 transition-colors
                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              `}
            >
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={user.profilePic || '/avatar.png'} alt="profile" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{user.name}</h3>
                <p className="text-xs text-base-content/70 truncate">{user.email}</p>
              </div>
            </button>
          ))
        ) : (
          <p>No users to display</p>
        )}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
