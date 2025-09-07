import { useEffect, useState } from "react";
import { auth } from "../src/firebase/config";

function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    const checkAdmin = async () => {
      unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          // Force refresh so you always get latest claims
          const tokenResult = await user.getIdTokenResult(true);
          setIsAdmin(!!tokenResult.claims.admin);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      });
    };

    checkAdmin();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { isAdmin, loading };
}

export default useAdmin;
