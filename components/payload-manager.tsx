"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Plus, Save, Trash, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function PayloadManager() {
  const [payloads, setPayloads] = useState([
    { id: 1, name: "XSS Basic", type: "XSS", count: 25, active: true },
    { id: 2, name: "XSS Advanced", type: "XSS", count: 42, active: true },
    { id: 3, name: "SQL Injection", type: "SQLi", count: 38, active: true },
    { id: 4, name: "Command Injection", type: "CMDi", count: 20, active: true },
    { id: 5, name: "Open Redirect", type: "Redirect", count: 15, active: true },
  ])

  const [editingPayload, setEditingPayload] = useState<any>(null)

  return (
    <Tabs defaultValue="manage" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="manage">Manage Payloads</TabsTrigger>
        <TabsTrigger value="create">Create Payload</TabsTrigger>
        <TabsTrigger value="import">Import/Export</TabsTrigger>
      </TabsList>

      <TabsContent value="manage">
        <Card>
          <CardHeader>
            <CardTitle>Payload Collections</CardTitle>
            <CardDescription>Manage your payload collections for different vulnerability types</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox id="select-all" />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-center">Payloads</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payloads.map((payload) => (
                  <TableRow key={payload.id}>
                    <TableCell>
                      <Checkbox id={`select-${payload.id}`} />
                    </TableCell>
                    <TableCell className="font-medium">{payload.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{payload.type}</Badge>
                    </TableCell>
                    <TableCell className="text-center">{payload.count}</TableCell>
                    <TableCell className="text-center">
                      {payload.active ? (
                        <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                      ) : (
                        <Badge variant="outline">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setEditingPayload(payload)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Payload Collection</DialogTitle>
                              <DialogDescription>Make changes to your payload collection</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input id="edit-name" defaultValue={editingPayload?.name} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-type">Type</Label>
                                <Input id="edit-type" defaultValue={editingPayload?.type} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-payloads">Payloads (one per line)</Label>
                                <Textarea
                                  id="edit-payloads"
                                  className="min-h-[200px]"
                                  placeholder="<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
javascript:alert('XSS')"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle>Create New Payload Collection</CardTitle>
            <CardDescription>Add a new collection of payloads for vulnerability testing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-name">Collection Name</Label>
              <Input id="new-name" placeholder="e.g., XSS Advanced Bypasses" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-type">Vulnerability Type</Label>
              <Input id="new-type" placeholder="e.g., XSS, SQLi, CMDi" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-payloads">Payloads (one per line)</Label>
              <Textarea
                id="new-payloads"
                className="min-h-[200px]"
                placeholder="<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
javascript:alert('XSS')"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Create Payload Collection
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="import">
        <Card>
          <CardHeader>
            <CardTitle>Import/Export Payloads</CardTitle>
            <CardDescription>Import payloads from files or export your collections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Import Payloads</h3>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="import-file">Upload File</Label>
                <div className="flex items-center gap-2">
                  <Input id="import-file" type="file" />
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Supported formats: .txt, .json, .csv</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Export Payloads</h3>
              <div className="flex flex-col gap-2">
                <Button variant="outline">Export All as JSON</Button>
                <Button variant="outline">Export All as TXT</Button>
                <Button variant="outline">Export Selected Collections</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

