"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TokenVerificationResult {
  userId: string | null;
  userContact: string | null;
  userEmail: boolean;
  error: string | null;
  isLoading: boolean;
}

function useTokenVerification(): TokenVerificationResult {
  const [verificationResult, setVerificationResult] =
    useState<TokenVerificationResult>({
      userId: null,
      userContact: null,
      userEmail: false,
      error: null,
      isLoading: true,
    });

  const router = useRouter();

  useEffect(() => {
    const verifyToken = async (nkt: string) => {
      try {
        const response = await axios.get<any>(
          "https://mxagro-backend.onrender.com/api/userTKNroute/verifyToken",
          {
            headers: {
              Authorization: nkt,
            },
          }
        );

        // Set state directly from the response data
        setVerificationResult({
          userId: response.data.userId,
          userContact: response.data.userContact, // Assuming it's 'userContact', adjust accordingly if different
          userEmail: response.data.userEmail,
          error: null,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error verifying token:", error);
        setVerificationResult({
          userId: null,
          userContact: null,
          userEmail: false,
          error: "Error occurred while verifying token",
          isLoading: false,
        });
        // router.push("/login");
      }
    };

    const nkt = localStorage.getItem("nkt");

    if (nkt) {
      verifyToken(nkt);
    } else {
      setVerificationResult({
        userId: null,
        userContact: null,
        userEmail: false,
        error: "Token not found in localStorage",
        isLoading: false,
      });
      // router.push("/");
    }

    // Periodic token verification every 30 minutes
    const intervalId = setInterval(() => {
      const nkt = localStorage.getItem("nkt");
      if (nkt) {
        verifyToken(nkt);
      }
    }, 30 * 60 * 1000); // 30 minutes

    // Cleanup function to clear the interval when component unmounts or when the token changes
    return () => clearInterval(intervalId);
  }, []); // Dependency array is empty, so this effect runs only once on mount

  return verificationResult;
}

export default useTokenVerification;
