import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    bio: "",
    profilePicture: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (!token) {
      setError("Please login first.");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/users/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(res.data.user);
      setError(null);
    } catch (err) {
      setError("Failed to load profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/users/${user.id}`,
        profile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditing(false);
      setError(null);
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile.name) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 relative">
      <div className="absolute top-2 right-2">
        <Link to="/landing">
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              Logout
            </div>
          </button>
        </Link>
      </div>

      <div className="container mx-auto p-8">
        {error && <div className="bg-red-600 text-white p-3 mb-4 rounded">{error}</div>}

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center mb-6">
            <img
              src={
                profile.profilePicture ||
                "https://upload.wikimedia.org/wikipedia/en/2/2f/Jerry_Mouse.png"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
              <p className="text-gray-400">{profile.email}</p>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {editing ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows="4"
                  className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Profile Picture URL</label>
                <input
                  type="text"
                  value={profile.profilePicture}
                  onChange={(e) =>
                    setProfile({ ...profile, profilePicture: e.target.value })
                  }
                  className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Address</h3>
              <p className="text-white">{profile.address || "No address provided"}</p>

              <h3 className="text-lg font-semibold text-gray-300">Bio</h3>
              <p className="text-white">{profile.bio || "No bio provided"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
