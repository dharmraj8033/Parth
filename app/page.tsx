import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard-header"
import ScannerInterface from "@/components/scanner-interface"

export const metadata: Metadata = {
  title: "AI-Enhanced Vulnerability Scanner",
  description: "Advanced security testing tool for web applications",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          </div>
          <ScannerInterface />
        </div>
      </main>
    </div>
  )
}

