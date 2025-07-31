import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateUserProfile = async (userId, profileData) => {
  try {
    await setDoc(doc(db, "users", userId), {
      ...profileData,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
    console.log("Profile updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    return false;
  }
};