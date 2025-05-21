"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Custom SVG Icons
const GridIcon = () => (
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
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
)

const Upload = () => (
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

export default function ImageSpookPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const router = useRouter()

  // Upload area states
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFileUrl, setProcessedFileUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Check if user is logged in (using localStorage for demo purposes)
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn")

      if (!isLoggedIn) {
        router.push("/login")
        return
      }

      // Get user info from localStorage
      const email = localStorage.getItem("userEmail")
      setUser({ email: email || "user@example.com" })

      // Get subscription info from localStorage
      const plan = localStorage.getItem("userPlan")
      const status = localStorage.getItem("subscriptionStatus")
      const createdAt = localStorage.getItem("subscriptionDate")

      if (plan && status) {
        // Calculate expiry date (for demo purposes)
        const createdDate = createdAt ? new Date(createdAt) : new Date()
        const expiryDate = new Date(createdDate)

        // If plan is yearly, add 1 year, otherwise add 1 month
        if (plan === "team" || plan === "pro") {
          const isYearly = localStorage.getItem("billingCycle") === "yearly"
          if (isYearly) {
            expiryDate.setFullYear(expiryDate.getFullYear() + 1)
          } else {
            expiryDate.setMonth(expiryDate.getMonth() + 1)
          }
        }

        // Set feature limits based on plan
        let uploadLimit = 2
        let outputVariations = 5

        if (plan === "pro") {
          uploadLimit = Number.POSITIVE_INFINITY
          outputVariations = 20
        } else if (plan === "team") {
          uploadLimit = Number.POSITIVE_INFINITY
          outputVariations = 50
        }

        setSubscription({
          plan,
          status,
          created_at: createdAt || new Date().toISOString(),
          expires_at: expiryDate.toISOString(),
          upload_limit: uploadLimit,
          output_variations: outputVariations,
        })
      }

      setIsLoading(false)
    }

    // For demo purposes, set user as logged in
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", "demo@bh101.com")
    localStorage.setItem("userPlan", "pro")
    localStorage.setItem("subscriptionStatus", "active")

    checkAuth()
  }, [router])

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
    const validTypes = ["image/jpeg", "image/png", "image/gif"]
    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Please upload a JPG, PNG, or GIF file.")
      return
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10MB.")
      return
    }

    setSelectedFile(file)
    setError(null)
    setProcessedFileUrl(null) // Reset processed file when new file is selected
  }

  const handleProcessImage = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)

    try {
      // Create a FormData object to send the file
      const formData = new FormData()
      formData.append("file", selectedFile)

      // Call the API endpoint with proper headers
      const response = await fetch("http://localhost:5000/process", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/zip, application/octet-stream",
        },
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

      // Get the blob from the response
      const blob = await response.blob()

      // Create a URL for the blob
      const url = URL.createObjectURL(blob)
      setProcessedFileUrl(url)
    } catch (err) {
      console.error("Error processing image:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setProcessedFileUrl(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
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
        <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", textAlign: "center", flex: "1" }}>
          <p>Loading...</p>
        </div>
        <div style={{ textAlign: "center", padding: "20px", color: "#9ca3af", fontSize: "14px" }}>
          © 2023 BH101. All rights reserved.
        </div>
      </div>
    )
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
            <GridIcon />
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>ImageSpook</h1>
          </div>

          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "8px",
              padding: "24px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Upload Image</h2>

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
                    <Upload />
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "8px" }}>
                    Drag & drop your image here
                  </h3>
                  <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "8px" }}>
                    Support for JPG, PNG and GIF files.
                  </p>
                  <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "16px" }}>Max file size: 10MB.</p>
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
                      accept=".jpg,.jpeg,.png,.gif"
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
                        width: "80px",
                        height: "80px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        marginRight: "16px",
                        backgroundColor: "#111827",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                        alt="Preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <p style={{ fontWeight: "500", marginBottom: "4px", wordBreak: "break-all" }}>
                        {selectedFile.name}
                      </p>
                      <p style={{ color: "#9ca3af", fontSize: "14px" }}>
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
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
                      onClick={handleProcessImage}
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
                      {isProcessing ? "Processing..." : "Process Image"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {processedFileUrl && (
              <div
                style={{
                  marginTop: "24px",
                  backgroundColor: "#111827",
                  borderRadius: "6px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "8px" }}>
                  Your processed images are ready!
                </h3>
                <p style={{ color: "#9ca3af", marginBottom: "16px" }}>
                  Download the ZIP file containing all variations.
                </p>
                <a
                  href={processedFileUrl}
                  download={`${selectedFile?.name.split(".")[0]}-variations.zip`}
                  style={{
                    display: "inline-block",
                    backgroundColor: "#10b981",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                >
                  Download ZIP
                </a>
              </div>
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
