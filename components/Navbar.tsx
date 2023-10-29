import * as fcl from '@onflow/fcl'
import { useEffect } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Navbar() {
  const user = useCurrentUser()
  const router = useRouter()

  return (
    <div className='flex items-center justify-between gap-4 py-4 border-b-2 border-zinc-700'>
      <div>
        Welcome, <span className='font-bold'>{user.addr}</span>
      </div>

      <div className='flex items-center gap-4 font-mono' >
        <Link href="/dashboard" className='hover:underline'>
          Confessions
        </Link>
        <div>
          |
        </div>
        <Link href="/snippets" className='hover:underline'> 
          Flow Code Snippets
        </Link>
      </div>

      <button className='bg-red-400 px-4 py-1 rounded-md text-white' onClick={fcl.unauthenticate}>Logout</button>
    </div>
  )
}