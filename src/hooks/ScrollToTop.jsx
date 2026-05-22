import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scrolling behavior config
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Agat instant chahiye toh 'instant' ya 'auto' bhi use kar sakte hain
    });
  }, [pathname]); // Jab bhi pathname badlega, yeh trigger hoga

  return null; // Is component ne kuch render nahi karna
}