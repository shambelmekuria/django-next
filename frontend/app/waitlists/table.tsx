"use client"
import { useAuth } from "@/components/auth-provider";
import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

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

export default function WaitlistTable() {
const router = useRouter()
  const auth = useAuth();
  const { data, error, isLoading } = useSWR(WAITLISTS_API_URL, fetcher);

  useEffect(() => {
    if ((error as FetchError)?.status === 401) {
      auth?.loginRequiredRedirect();
    }
  }, [auth, error]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const items = data;  
  return (
    <Table>
      <TableCaption>A list of your waitlist items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item: any, idx: number) => (
          <TableRow key={`item-${idx}`}>
            <TableCell onClick={e=>router.push(`/waitlists/${item.id}`)} className="hover:underline hover:cursor-pointer">{item.id}</TableCell>
            <TableCell>{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
