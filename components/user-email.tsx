'use client'
import { useFusionAuth } from "@fusionauth/react-sdk";

export default function UserEmail() {
  const {
    userInfo
  } = useFusionAuth()
  return (
    <div
      className="flex flex-col w-full"
    >
      <div>
        {userInfo?.email}
      </div>
    </div>
  );
}
