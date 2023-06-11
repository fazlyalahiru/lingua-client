import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { userRole } from "../apis/user";
import axios from "axios";

// import app from "../firebase/firebase.config";
export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      userRole(user.email).then((data) => setRole(data));
    }
  }, [user]);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // update user profile
  const updateProfileInfo = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const singnInWithGoogle = () => {
    return signInWithPopup(auth, googleAuthProvider);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      if (loggedUser?.email) {
        axios
          .post(`${import.meta.env.VITE_SERVER_URL}/jwt`, {
            email: loggedUser?.email,
          })
          .then((data) => {
            console.log(data.data.token);
            localStorage.setItem("access-token", data.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [loading]);

  const authInfo = {
    user,
    role,
    loading,
    setRole,
    createUser,
    signIn,
    singnInWithGoogle,
    logOut,
    setLoading,
    updateProfileInfo,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
