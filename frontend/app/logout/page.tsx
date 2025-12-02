"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const LOGOUT_URL ='api/logout'
export default function Pages() {
    const router = useRouter()
    const logoutForm = useForm()
    const onSubmit = async ()=>{
        const response = await axios.post(LOGOUT_URL,{})
        console.log("I am clicked")
        if (response){
            router.replace('/login')
        }

    }
  return (
    <div className='h-100 flex items-center justify-center'>
        <form  method="post" className='max-w-xl' onSubmit={logoutForm.handleSubmit(onSubmit)}>
            <p className='font-bold text-xl mb-3'>Are you sure to logout</p>

            <Button variant='destructive' type="submit">Yes , logout</Button>
        </form>

    </div>
  )
}
