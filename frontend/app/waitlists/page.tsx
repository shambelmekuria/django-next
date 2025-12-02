"use client"
import { useAuth } from '@/components/auth-provider';
import React from 'react'
import useSWR from 'swr'
const fetcher = (url:string) => fetch(url).then((res) => res.json());
const WAITLISTS_API_URL ="/api/waitlists"
export default function Page() {
  const auth = useAuth()
      const { data, error, isLoading } = useSWR(WAITLISTS_API_URL, fetcher)
      console.log(data)
      

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <div>
      <p>{auth?.isAuthenticated?"Hello User":"Hello Guest"}</p>
      {JSON.stringify(data)}
    </div>
  )
}
