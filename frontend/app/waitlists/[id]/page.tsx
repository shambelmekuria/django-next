'use client'
import fetcher from '@/app/lib/fecher'
import React, { use } from 'react'
import useSWR from 'swr'

export default function Page({params}:{params:Promise<{id:string}>}) {
    const {id} = use(params)
    const {data,error,isLoading} = useSWR(`/api/waitlists/${id}`,fetcher)
    console.log(data)
  return (
    <div>Page</div>
  )
}
