"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
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

// Upload Icon
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "#9ca3af", width: "48px", height: "48px" }}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

// File Text Icon
const FileTextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "24px", height: "24px", color: "#9ca3af" }}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
)

// Platform Icons
const RedditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "20px", height: "20px" }}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M16.5 14.5c-.5.3-2.7 1.5-4.5 1.5-1.8 0-4-1.2-4.5-1.5" />
    <path d="M8.4 9.8a2.12 2.12 0 0 0-1.4.6 1.8 1.8 0 0 0-.5 1.4c.1.6.4 1 .9 1.2" />
    <path d="M15.6 9.8a2.12 2.12 0 0 1 1.4.6 1.8 1.8 0 0 1 .5 1.4c-.1.6-.4 1-.9 1.2" />
    <path d="M9 13c.2.1.5.1.8.1.3 0 .5 0 .7-.1" />
    <path d="M15 13c-.2.1-.5.1-.8.1-.3 0-.5 0-.7-.1" />
  </svg>
)

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "20px", height: "20px" }}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "20px", height: "20px" }}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const SnapshotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "20px", height: "20px" }}
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

// Coming Soon Badge
const ComingSoonBadge = () => (
  <span
    style={{
      position: "absolute",
      top: "-8px",
      right: "-8px",
      backgroundColor: "#f59e0b",
      color: "white",
      fontSize: "10px",
      fontWeight: "bold",
      padding: "2px 6px",
      borderRadius: "10px",
      whiteSpace: "nowrap",
    }}
  >
    Coming Soon
  </span>
)

type AccountStatus = {
  username: string
  status: string
}

// API response type based on the provided JSON structure
type ApiResponse = {
  results: AccountStatus[]
}

type Platform = "reddit" | "instagram" | "twitter" | "snapshot"

// Define the possible status values
type StatusValue = "active" | "banned" | "suspended" | "forbidden"

export default function AccountCheckerPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<AccountStatus[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showResults, setShowResults] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("reddit")

  // Define which platforms are available
  const availablePlatforms: Platform[] = ["reddit"]
  const isAvailable = (platform: Platform) => availablePlatforms.includes(platform)

  // Reset results when component unmounts
  useEffect(() => {
    return () => {
      setResults([])
      setShowResults(false)
    }
  }, [])

  // Reset results when platform changes
  useEffect(() => {
    setResults([])
    setShowResults(false)
    setSelectedFile(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [selectedPlatform])

  // Upload area handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      handleFileSelection(file)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      handleFileSelection(file)
    }
  }

  const handleFileSelection = (file: File) => {
    // Check file type
    if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
      setError("Invalid file type. Please upload a .txt file.")
      return
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Maximum size is 5MB.")
      return
    }

    setSelectedFile(file)
    setError(null)
    setResults([]) // Reset results when new file is selected
    setShowResults(false)
  }

  const handleCheckAccounts = async () => {
    if (!selectedFile || !isAvailable(selectedPlatform)) return

    setIsProcessing(true)
    setError(null)
    setShowResults(false)

    try {
      // Create a FormData object to send the file
      const formData = new FormData()
      formData.append("file", selectedFile)

      // Call the API endpoint based on the selected platform
      const endpoint = `http://localhost:5000/check-${selectedPlatform}`
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      })

      // Check if the request was successful
      if (!response.ok) {
        let errorMessage = `Server responded with status: ${response.status}`
        try {
          const errorData = await response.json()
          if (errorData && errorData.message) {
            errorMessage = errorData.message
          }
        } catch (e) {}
        throw new Error(errorMessage)
      }

      // Parse the JSON response
      const data = await response.json()
      console.log("API Response:", data)

      // Handle the specific API response format with a "results" array
      if (data && data.results && Array.isArray(data.results)) {
        setResults(data.results)
      }
      // Fallback handling for other response formats
      else if (Array.isArray(data)) {
        setResults(data)
      } else if (data && typeof data === "object") {
        // If the response is an object with username/status pairs
        const formattedResults = Object.entries(data).map(([username, status]) => ({
          username,
          status: typeof status === "string" ? status : String(status),
        }))
        setResults(formattedResults)
      } else {
        throw new Error("Unexpected response format from server")
      }

      setShowResults(true)
    } catch (err) {
      console.error("Error checking accounts:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setResults([])
    setError(null)
    setShowResults(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Function to get status color - updated for new status values
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "#10b981" // green
      case "banned":
        return "#ef4444" // red
      case "suspended":
        return "#f59e0b" // yellow/orange
      case "forbidden":
        return "#8b5cf6" // purple
      default:
        return "#9ca3af" // gray
    }
  }

  // Function to get platform display name
  const getPlatformDisplayName = (platform: Platform) => {
    switch (platform) {
      case "reddit":
        return "Reddit"
      case "instagram":
        return "Instagram"
      case "twitter":
        return "Twitter"
      case "snapshot":
        return "Snapshot"
      default:
        return platform.charAt(0).toUpperCase() + platform.slice(1)
    }
  }

  // Function to get platform icon
  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case "reddit":
        return <RedditIcon />
      case "instagram":
        return <InstagramIcon />
      case "twitter":
        return <TwitterIcon />
      case "snapshot":
        return <SnapshotIcon />
      default:
        return null
    }
  }

  // Function to handle platform selection
  const handlePlatformSelect = (platform: Platform) => {
    if (isAvailable(platform) || selectedPlatform === platform) {
      setSelectedPlatform(platform)
    }
  }

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
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Select Platform</h2>
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "12px",
                }}
              >
                {(["reddit", "instagram", "twitter", "snapshot"] as Platform[]).map((platform) => (
                  <button
                    key={platform}
                    onClick={() => handlePlatformSelect(platform)}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "12px",
                      backgroundColor: selectedPlatform === platform ? "#3b82f6" : "#374151",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: isAvailable(platform) ? "pointer" : "default",
                      transition: "background-color 0.2s",
                      opacity: isAvailable(platform) ? 1 : 0.7,
                    }}
                  >
                    {getPlatformIcon(platform)}
                    {getPlatformDisplayName(platform)}
                    {!isAvailable(platform) && <ComingSoonBadge />}
                  </button>
                ))}
              </div>
            </div>

            {!isAvailable(selectedPlatform) ? (
              <div
                style={{
                  backgroundColor: "#111827",
                  borderRadius: "6px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "16px" }}>
                  {getPlatformDisplayName(selectedPlatform)} Account Checker Coming Soon
                </h3>
                <p style={{ color: "#9ca3af", marginBottom: "16px" }}>
                  We're working on adding support for {getPlatformDisplayName(selectedPlatform)} account checking.
                  Please check back later!
                </p>
                <button
                  onClick={() => setSelectedPlatform("reddit")}
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Try Reddit Account Checker
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
                  Upload {getPlatformDisplayName(selectedPlatform)} Account List
                </h2>
                <p style={{ color: "#9ca3af", marginBottom: "16px" }}>
                  Upload a .txt file with one {getPlatformDisplayName(selectedPlatform)} username per line to check
                  their status.
                </p>

                {error && (
                  <div
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                      padding: "12px",
                      borderRadius: "6px",
                      marginBottom: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p>{error}</p>
                    <button
                      onClick={() => setError(null)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}

                <div
                  style={{
                    border: `2px dashed ${isDragging ? "#3b82f6" : "#374151"}`,
                    borderRadius: "6px",
                    padding: "32px",
                    backgroundColor: isDragging ? "rgba(59, 130, 246, 0.05)" : "transparent",
                    transition: "all 0.2s",
                    minHeight: "240px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {!selectedFile ? (
                    <div style={{ textAlign: "center", width: "100%" }}>
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                        <UploadIcon />
                      </div>
                      <h3 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "8px" }}>
                        Drag & drop your text file here
                      </h3>
                      <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "8px" }}>
                        File should contain one username per line.
                      </p>
                      <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "16px" }}>Max file size: 5MB.</p>
                      <label
                        style={{
                          backgroundColor: "#374151",
                          color: "white",
                          padding: "8px 16px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                      >
                        Browse File
                        <input
                          type="file"
                          style={{ display: "none" }}
                          accept=".txt"
                          onChange={handleFileInputChange}
                          ref={fileInputRef}
                        />
                      </label>
                    </div>
                  ) : (
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "6px",
                            overflow: "hidden",
                            marginRight: "16px",
                            backgroundColor: "#111827",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FileTextIcon />
                        </div>
                        <div>
                          <p style={{ fontWeight: "500", marginBottom: "4px", wordBreak: "break-all" }}>
                            {selectedFile.name}
                          </p>
                          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "16px" }}>
                        <button
                          onClick={handleReset}
                          disabled={isProcessing}
                          style={{
                            flex: 1,
                            padding: "10px",
                            backgroundColor: "#1e293b",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: isProcessing ? "not-allowed" : "pointer",
                            opacity: isProcessing ? 0.7 : 1,
                          }}
                        >
                          Change File
                        </button>
                        <button
                          onClick={handleCheckAccounts}
                          disabled={isProcessing}
                          style={{
                            flex: 1,
                            padding: "10px",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: isProcessing ? "not-allowed" : "pointer",
                            opacity: isProcessing ? 0.7 : 1,
                          }}
                        >
                          {isProcessing ? "Checking..." : `Check ${getPlatformDisplayName(selectedPlatform)} Accounts`}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {showResults && results.length > 0 && (
                  <div
                    style={{
                      marginTop: "24px",
                      backgroundColor: "#111827",
                      borderRadius: "6px",
                      padding: "24px",
                    }}
                  >
                    <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "16px" }}>
                      {getPlatformDisplayName(selectedPlatform)} Results
                    </h3>
                    <div style={{ overflowX: "auto" }}>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          textAlign: "left",
                        }}
                      >
                        <thead>
                          <tr>
                            <th
                              style={{
                                padding: "12px 16px",
                                borderBottom: "1px solid #374151",
                                color: "#9ca3af",
                                fontWeight: "500",
                              }}
                            >
                              Username
                            </th>
                            <th
                              style={{
                                padding: "12px 16px",
                                borderBottom: "1px solid #374151",
                                color: "#9ca3af",
                                fontWeight: "500",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((result, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  padding: "12px 16px",
                                  borderBottom: "1px solid #374151",
                                }}
                              >
                                {result.username}
                              </td>
                              <td
                                style={{
                                  padding: "12px 16px",
                                  borderBottom: "1px solid #374151",
                                  color: getStatusColor(result.status),
                                }}
                              >
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "8px",
                                      height: "8px",
                                      borderRadius: "50%",
                                      backgroundColor: getStatusColor(result.status),
                                    }}
                                  ></span>
                                  {typeof result.status === "string"
                                    ? result.status.charAt(0).toUpperCase() + result.status.slice(1)
                                    : String(result.status)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ marginTop: "16px", textAlign: "right" }}>
                      <p style={{ color: "#9ca3af", fontSize: "14px" }}>Total accounts checked: {results.length}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <div style={{ textAlign: "center", padding: "20px", color: "#9ca3af", fontSize: "14px" }}>
        © 2023 BH101. All rights reserved.
      </div>
    </div>
  )
}
