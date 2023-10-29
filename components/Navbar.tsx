import * as fcl from '@onflow/fcl'

import useCurrentUser from '../hooks/useCurrentUser'

export default function Navbar() {
  const user = useCurrentUser()

  return (
    <div className='flex items-center justify-between gap-4'>
      Welcome, {user.addr}

      <button className='bg-red-400 px-4 py-1 rounded-md text-white' onClick={fcl.unauthenticate}>Logout</button>
    </div>
  )
}