"use client"

import Link from "next/link"

// Shield Check Icon
const ShieldCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "32px", height: "32px", color: "#3b82f6" }}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export default function AccountCheckerPage() {
  return (
    <div
      style={{
        backgroundColor: "#080b14",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "20px", textAlign: "right" }}>
        <Link href="/" style={{ color: "white", textDecoration: "none" }}>
          Back to Dashboard
        </Link>
      </div>

      <main style={{ maxWidth: "800px", margin: "20px auto 40px", padding: "0 20px", flex: "1" }}>
        <div
          style={{
            backgroundColor: "#111827",
            borderRadius: "8px",
            padding: "32px",
          }}
        >
          <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <ShieldCheckIcon />
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Account Checker</h1>
          </div>

          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Coming Soon</h2>
            <p style={{ color: "#9ca3af", marginBottom: "16px" }}>
              This tool is currently under development. Check back later!
            </p>
            <Link
              href="/"
              style={{
                display: "inline-block",
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "10px 20px",
                borderRadius: "6px",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>

      <div style={{ textAlign: "center", padding: "20px", color: "#9ca3af", fontSize: "14px" }}>
        © 2023 BH101. All rights reserved.
      </div>
    </div>
  )
}
