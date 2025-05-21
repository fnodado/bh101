import Link from "next/link"

// Custom SVG Icons
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="dashboard-icon"
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
)

const ImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="tool-icon"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
)

const ShieldCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="tool-icon"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="tool-icon"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

// Tool data
const tools = [
  {
    id: "imagespook",
    title: "ImageSpook",
    description: "Upload 1 image → get 20 spoofed variations.",
    icon: ImageIcon,
  },
  {
    id: "account-checker",
    title: "Account Checker",
    description: "Check if Reddit/IG accounts are active.",
    icon: ShieldCheckIcon,
  },
  {
    id: "dead-link-finder",
    title: "Dead Link Finder",
    description: "Scan for broken or expired links.",
    icon: SearchIcon,
  },
]

export default function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <div className="container">
          {/* Header */}
          <header className="dashboard-header">
            <div className="dashboard-title">
              <DashboardIcon />
              <h1>BH101 Dashboard</h1>
            </div>
            <p className="dashboard-subtitle">All your tools in one place.</p>
          </header>

          {/* Tools Grid */}
          <div className="tools-grid">
            {tools.map((tool) => (
              <div key={tool.id} className="tool-card">
                <div className="tool-card-header">
                  <div className="tool-card-title">
                    <tool.icon />
                    <h2>{tool.title}</h2>
                  </div>
                </div>
                <div className="tool-card-content">
                  <p className="tool-description">{tool.description}</p>
                </div>
                <div className="tool-card-footer">
                  <Link href={`/${tool.id}`} className="launch-button">
                    Launch
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="dashboard-footer">© 2023 BH101. All rights reserved.</div>
    </div>
  )
}
