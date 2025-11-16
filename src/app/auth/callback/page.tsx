"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiInstance } from "@/services";

export default function OAuthCallback() {
  const [message, setMessage] = useState("Processing OAuth callback...");
  const router = useRouter();
  const calledRef = useRef(false); // prevent multiple calls

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const handleCallback = async () => {
      try {
        // Get URL parameters (code, state, etc.)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");
        const error = urlParams.get("error");

        // Check for OAuth errors
        if (error) {
          setMessage(`OAuth error: ${error}`);
          setTimeout(() => router.replace("/"), 2000);
          return;
        }

        // Check if we have the authorization code
        if (!code) {
          setMessage("No authorization code received");

          setTimeout(() => router.replace("/"), 2000);
          return;
        }

        setMessage("Exchanging authorization code...");

        // Send code to backend to exchange for tokens
        const response = await apiInstance.post(
          "/blog/auth/callback",
          {
            code,
            state,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setMessage("Authentication successful, redirecting...");
          setTimeout(() => router.replace("/admin"), 1000);
        } else {
          throw new Error("Authentication failed");
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        setMessage("OAuth callback processing failed.");
        setTimeout(() => router.replace("/"), 2000);
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>{message}</div>
      <div
        style={{
          width: "20px",
          height: "20px",
          border: "2px solid #ff3333",
          borderTop: "2px solid transparent",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
