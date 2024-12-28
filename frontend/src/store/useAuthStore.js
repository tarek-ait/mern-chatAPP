import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js"; // Adjust the path as necessary
import  toast  from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =  import.meta.env.MODE === "development"  ? "http://localhost:3000" : "/"; 
export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningup: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // implementing socket.io
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
      get().connectSocket();
    } catch (e) {
      set({ authUser: null });
      console.error(e);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningup: true });
    try {
      // the data is in the req body 
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("account created successfully");
      console.log(res.data);
      set({ authUser: true });
    } catch (e) {
      toast.error(e.response.data.error);
      console.error(e);
    } finally {
      set({ isSigningup: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("logged in successfully");
      get().connectSocket();
    } catch (e) {
 
      toast.error(e.response.data.message);

    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("logged out successfully");
      get().disconnectSocket();
    } catch (e) {
      toast.error("an error occured");
      console.error(e);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/upate-profile", data);
      set({ authUser: res.data });
      toast.success("profile updated successfully");
    } catch (e) {
      toast.error(e.response.data.error);
      console.error(e);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect()
    set({ socket: socket})
    // lsiten for the event and get the data
    socket.on("get online users", (data) => {
      set({ onlineUsers: data });
    })
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
    set({ socket: null });
    // listen to the event
  },


}));
