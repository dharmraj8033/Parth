"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, Play, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ScanResults from "@/components/scan-results"
import AuthenticationSettings from "@/components/authentication-settings"
import PayloadManager from "@/components/payload-manager"

export default function ScannerInterface() {
  const [targetUrl, setTargetUrl] = useState("")
  const [scanInProgress, setScanInProgress] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [scanResults, setScanResults] = useState<any[]>([])
  const [error, setError] = useState("")

  const handleStartScan = async () => {
    if (!targetUrl) {
      setError("Please enter a target URL")
      return
    }

    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      setError("URL must start with http:// or https://")
      return
    }

    setError("")
    setScanInProgress(true)
    setScanProgress(0)
    setScanComplete(false)

    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setScanInProgress(false)
            setScanComplete(true)
            // Mock results for demonstration
            setScanResults([
              {
                id: 1,
                type: "XSS",
                severity: "High",
                parameter: "search",
                payload: "<script>alert('XSS')</script>",
                url: `${targetUrl}?search=<script>alert('XSS')</script>`,
                description: "Reflected Cross-Site Scripting vulnerability detected in the search parameter",
              },
              {
                id: 2,
                type: "SQL Injection",
                severity: "Critical",
                parameter: "id",
                payload: "1' OR '1'='1",
                url: `${targetUrl}?id=1' OR '1'='1`,
                description: "Potential SQL Injection vulnerability detected in the id parameter",
              },
            ])
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 300)
  }

  const handleReset = () => {
    setScanInProgress(false)
    setScanProgress(0)
    setScanComplete(false)
    setScanResults([])
  }

  return (
    <Tabs defaultValue="scanner" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="scanner">Scanner</TabsTrigger>
        <TabsTrigger value="authentication">Authentication</TabsTrigger>
        <TabsTrigger value="payloads">Payloads</TabsTrigger>
        <TabsTrigger value="settings">Advanced Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="scanner">
        <Card>
          <CardHeader>
            <CardTitle>Web Vulnerability Scanner</CardTitle>
            <CardDescription>Configure and run security scans on web applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target-url">Target URL</Label>
              <Input
                id="target-url"
                placeholder="https://example.com"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                disabled={scanInProgress}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>Vulnerability Types</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="xss" defaultChecked />
                  <Label htmlFor="xss">Cross-Site Scripting (XSS)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sqli" defaultChecked />
                  <Label htmlFor="sqli">SQL Injection</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cmdi" defaultChecked />
                  <Label htmlFor="cmdi">Command Injection</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="open-redirect" defaultChecked />
                  <Label htmlFor="open-redirect">Open Redirect</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="csrf" defaultChecked />
                  <Label htmlFor="csrf">CSRF</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ai-fuzzing" defaultChecked />
                  <Label htmlFor="ai-fuzzing">AI-Enhanced Fuzzing</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Scan Intensity</Label>
                <span className="text-sm text-muted-foreground">Medium</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="concurrent-requests">Concurrent Requests</Label>
                <Select defaultValue="10">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="recursive-scan" />
              <Label htmlFor="recursive-scan">Recursive Scanning</Label>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            {scanInProgress ? (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Scanning in progress...</span>
                  <span>{Math.round(scanProgress)}%</span>
                </div>
                <Progress value={scanProgress} className="w-full" />
              </div>
            ) : scanComplete ? (
              <div className="w-full flex justify-between">
                <Button variant="outline" onClick={handleReset}>
                  <X className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button variant="default">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Export Results
                </Button>
              </div>
            ) : (
              <Button onClick={handleStartScan} className="w-full">
                <Play className="mr-2 h-4 w-4" />
                Start Scan
              </Button>
            )}
          </CardFooter>
        </Card>

        {scanComplete && scanResults.length > 0 && <ScanResults results={scanResults} />}
      </TabsContent>

      <TabsContent value="authentication">
        <AuthenticationSettings />
      </TabsContent>

      <TabsContent value="payloads">
        <PayloadManager />
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>Configure advanced scanner settings and options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timeout">Request Timeout (ms)</Label>
              <Input id="timeout" type="number" defaultValue="5000" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-agent">User Agent</Label>
              <Input
                id="user-agent"
                defaultValue="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proxy">Proxy URL (optional)</Label>
              <Input id="proxy" placeholder="http://proxy.example.com:8080" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headers">Custom Headers</Label>
              <Textarea id="headers" placeholder="X-Custom-Header: value" className="min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>AI Model</Label>
                <Select defaultValue="default">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                    <SelectItem value="cautious">Cautious</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="follow-redirects" defaultChecked />
              <Label htmlFor="follow-redirects">Follow Redirects</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="verify-ssl" defaultChecked />
              <Label htmlFor="verify-ssl">Verify SSL Certificates</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

