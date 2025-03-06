"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, FileDown, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ScanResult {
  id: number
  type: string
  severity: string
  parameter: string
  payload: string
  url: string
  description: string
}

interface ScanResultsProps {
  results: ScanResult[]
}

export default function ScanResults({ results }: ScanResultsProps) {
  const [selectedResult, setSelectedResult] = useState<ScanResult | null>(null)

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-500 hover:bg-red-600"
      case "high":
        return "bg-orange-500 hover:bg-orange-600"
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "low":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-500 hover:bg-orange-600">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Low</Badge>
      default:
        return <Badge variant="outline">Info</Badge>
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Scan Results</CardTitle>
            <CardDescription>{results.length} vulnerabilities detected</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.type}</TableCell>
                    <TableCell>{getSeverityBadge(result.severity)}</TableCell>
                    <TableCell>{result.parameter}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedResult(result)}>
                            <Info className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center">
                              <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                              {selectedResult?.type} Vulnerability
                            </DialogTitle>
                            <DialogDescription>
                              {getSeverityBadge(selectedResult?.severity || "")} - Found in parameter:{" "}
                              <code className="bg-muted px-1 py-0.5 rounded">{selectedResult?.parameter}</code>
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">Description</h4>
                              <p className="text-sm text-muted-foreground">{selectedResult?.description}</p>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium">Payload</h4>
                              <div className="rounded bg-muted p-2 font-mono text-sm">{selectedResult?.payload}</div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium">URL</h4>
                              <div className="rounded bg-muted p-2 font-mono text-sm break-all">
                                {selectedResult?.url}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium">Remediation</h4>
                              <p className="text-sm text-muted-foreground">
                                {selectedResult?.type === "XSS"
                                  ? "Implement proper input validation and output encoding to prevent XSS attacks. Consider using Content Security Policy (CSP) headers."
                                  : selectedResult?.type === "SQL Injection"
                                    ? "Use parameterized queries or prepared statements instead of building SQL queries with string concatenation. Implement proper input validation."
                                    : "Implement proper input validation and sanitization for all user inputs."}
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="summary">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Critical</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {results.filter((r) => r.severity.toLowerCase() === "critical").length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">High</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {results.filter((r) => r.severity.toLowerCase() === "high").length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Medium</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {results.filter((r) => r.severity.toLowerCase() === "medium").length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Low</CardTitle>
                    <Info className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {results.filter((r) => r.severity.toLowerCase() === "low").length}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Vulnerability Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Array.from(new Set(results.map((r) => r.type))).map((type) => (
                      <div key={type} className="flex items-center justify-between">
                        <span>{type}</span>
                        <span className="font-medium">{results.filter((r) => r.type === type).length}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="space-y-4">
              {results.map((result) => (
                <Card key={result.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center">
                        <span className="mr-2">{result.type}</span>
                        {getSeverityBadge(result.severity)}
                      </CardTitle>
                    </div>
                    <CardDescription>
                      Parameter: <code className="bg-muted px-1 py-0.5 rounded">{result.parameter}</code>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <h4 className="font-medium text-sm">Description</h4>
                      <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Payload</h4>
                      <div className="rounded bg-muted p-2 font-mono text-sm mt-1">{result.payload}</div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">URL</h4>
                      <div className="rounded bg-muted p-2 font-mono text-sm mt-1 break-all">{result.url}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

