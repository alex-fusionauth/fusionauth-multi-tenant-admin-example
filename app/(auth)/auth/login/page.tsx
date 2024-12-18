'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, KeyRound } from 'lucide-react';
import {
  useFusionAuth
} from '@fusionauth/react-sdk';

export default function LoginPage() {
  const {
    startLogin,
    startRegister,
  } = useFusionAuth()
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            FusionAuth Admin
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <Button
            onClick={() => startLogin()}
            size="lg"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
          <Button
            onClick={() => startRegister()}
            size="lg"
          >
            <KeyRound className="mr-2 h-4 w-4" />
            Register
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function getLayout(page: any) {
  return (
    <>
      {page}
    </>
  );
}