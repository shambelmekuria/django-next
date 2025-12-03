"use client";

import { useAuth } from '@/components/auth-provider';
import { ModeToggle } from '@/components/theme-mode-toggle';
import React, { useEffect } from 'react';
import useSWR from 'swr';

type FetchError = Error & {
  info?: any;
  status?: number;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error: FetchError = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const WAITLISTS_API_URL = "/api/waitlists";

export default function Page() {
  const auth = useAuth();
  const { data, error, isLoading } = useSWR(WAITLISTS_API_URL, fetcher);
  useEffect(()=>{
    if((error as FetchError)?.status === 401){
      auth?.loginRequiredRedirect()
    }

  },[auth,error])

  console.log("Error...", (error as FetchError)?.status);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <ModeToggle/>
      <p>{auth?.isAuthenticated ? "Hello User" : "Hello Guest"}</p>
      {JSON.stringify(data)}
    </div>
  );
}
