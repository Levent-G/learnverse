import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useFetchData = (collection) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "pages", "learnverse", "fields", collection);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setError("Veri bulunamadı.");
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [collection]);

  return [data, error];
};
