"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"

export default function AuthenticationSettings() {
  const [authMethod, setAuthMethod] = useState("none")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authentication Settings</CardTitle>
        <CardDescription>Configure authentication for scanning protected endpoints</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full" onValueChange={setAuthMethod}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="none">None</TabsTrigger>
            <TabsTrigger value="basic">Basic Auth</TabsTrigger>
            <TabsTrigger value="token">Token/JWT</TabsTrigger>
            <TabsTrigger value="cookie">Cookie</TabsTrigger>
          </TabsList>

          <TabsContent value="none">
            <div className="py-6 text-center text-muted-foreground">
              No authentication will be used for scanning. Only public endpoints will be tested.
            </div>
          </TabsContent>

          <TabsContent value="basic">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="basic-username">Username</Label>
                <Input id="basic-username" placeholder="Enter username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="basic-password">Password</Label>
                <Input id="basic-password" type="password" placeholder="Enter password" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="token">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="token-type">Token Type</Label>
                <Input id="token-type" placeholder="Bearer" defaultValue="Bearer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token-value">Token Value</Label>
                <Textarea
                  id="token-value"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="token-refresh" />
                  <Label htmlFor="token-refresh">Enable Token Refresh</Label>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cookie">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cookie-value">Cookie Value</Label>
                <Textarea id="cookie-value" placeholder="session=abc123; auth=xyz456" className="min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-url">Login URL (Optional)</Label>
                <Input id="login-url" placeholder="https://example.com/login" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-data">Login Form Data (Optional)</Label>
                <Textarea id="login-data" placeholder="username=admin&password=password123" className="min-h-[100px]" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Authentication Settings
        </Button>
      </CardFooter>
    </Card>
  )
}

