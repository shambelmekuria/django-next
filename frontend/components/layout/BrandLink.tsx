"use client"

import Link from "next/link"
import { Package2 } from "lucide-react"

type BrandLinkProps = {
  className?:string,
  displayName?:boolean

}

export default function BrandLink({displayName, className}:BrandLinkProps){
    const finalClass = className ? className : "flex items-center gap-2 text-lg font-semibold md:text-base"
    return <Link
        href="/"
        className={finalClass}
    >
        <Package2 className="h-6 w-6" />
        {displayName ? 
             <span>SaaS</span>
            : 
            <span className="sr-only">SaaS</span>
        }
    </Link>
}