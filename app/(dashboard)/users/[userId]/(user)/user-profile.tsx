import { client } from "@/lib/fusionauth-dal";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { HelpCircle, Lock, Unlock } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


export default async function UserProfile({ userId }: { userId: string }) {
  const resp = (await client.retrieveUser(userId)).response;
  const { user, emailVerificationId } = resp;
  return (
    <Card>
      <CardContent className="container mx-auto p-4 space-y-6">
        <div className="flex justify-end items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View JSON</Button>
            </DialogTrigger>
            <DialogContent className=''>
              <DialogHeader>
                <DialogTitle>JSON Details</DialogTitle>
              </DialogHeader>
              <pre className='max-h-[80vh] overflow-y-scroll'>
                <code className="language-json">{JSON.stringify(resp, null, 2)}</code>
              </pre>
            </DialogContent>
          </Dialog>
          {user?.active ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
        </div>

        <div className="grid md:grid-cols-[240px,1fr] gap-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-48 h-48">
              <AvatarImage src="/placeholder.svg" alt="User avatar" />
              <AvatarFallback />
            </Avatar>
            <h2 className="text-xl font-semibold">{user?.username}</h2>
          </div>

          <Card>
            <CardContent className="p-6 grid gap-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold w-32">Email</span>
                  <span className="flex items-center gap-2">
                    {user?.email}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{emailVerificationId ? 'Verified' : 'Unverified'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold w-32">User Id</span>
                  <span className="text-sm font-mono">{user?.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold w-32">Tenant</span>
                  <span>{user?.username}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Mobile Phone</h3>
                  <p>{user?.mobilePhone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Birthdate</h3>
                  <p>{user?.birthDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Username</h3>
                  <p>{user?.username}n</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Preferred languages</h3>
                  <p>{user?.preferredLanguages?.join(', ')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Created</h3>
                  <p>{user?.insertInstant ? new Date(user?.insertInstant).toLocaleString() : '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Last login</h3>
                  <p>{user?.lastLoginInstant ? new Date(user?.lastLoginInstant).toLocaleString() : '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

