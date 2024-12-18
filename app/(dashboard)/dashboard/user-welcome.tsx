'use client'
import { useFusionAuth } from "@fusionauth/react-sdk";

export default function UserWelcome() {
  const {
    userInfo
  } = useFusionAuth()
  return (
    <div
      className="flex flex-col w-full"
    >
      <div>
        Welcome to FusionAuth {JSON.stringify(userInfo)}
      </div>
    </div>
  );
}
