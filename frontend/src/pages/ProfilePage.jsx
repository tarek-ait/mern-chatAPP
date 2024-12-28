import { Camera, User, Mail } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useState } from 'react'



const ProfilePage = () => {

  //  updating the user profile image
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        await updateProfile({profilePic: base64Image});
      };
      
    }else{
      return;
    }
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || '/avatar.png'}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4" />
              <label
                htmlFor="avatar-upload"
                className={`absolute 
                bottom-0 right-0 bg-primary
                rounded-full hover:scale-105
                p-2 transition-all duration-200
                cursor-pointer ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}`}
              >
                <Camera className="w-5 h-5 text-base-200"></Camera>
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  disabled={isUpdatingProfile}
                  onChange={handleImageUpload} />
              </label>
            </div>
            <p className="text-ms text-zinc-400">
              {isUpdatingProfile ? "Updating..." : "Click the camera icon to upodate your profile pic"}
            </p>
          </div>

          {/* user info section */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-5m text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4"></User>
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-5m text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4"></Mail>
                Email Adress
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member since</span>
                  <span>{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
