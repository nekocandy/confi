import * as fcl from '@onflow/fcl'
import Head from 'next/head'
import useCurrentUser from '../hooks/useCurrentUser'
import Link from 'next/link'

export default function Home() {
  const { loggedIn, addr } = useCurrentUser()

  return (
    <div>

      <Head>
        <title>Flow project!</title>
      </Head>

      <main className='h-screen flex flex-col items-center justify-center bg-zinc-900 text-white gap-6'>

        <h1 className='font-mono font-bold uppercase text-4xl'>Welcome!</h1>

        <button
          onClick={loggedIn ? fcl.unauthenticate : fcl.authenticate}
          className='bg-indigo-900 px-12 py-2 rounded-md uppercase'>
          {
            loggedIn ?
              `Sign Out | ${addr}`
              :
              'Sign in using FLOW'
          }
        </button>

        {
          loggedIn && <Link className='underline' href={"/dashboard"}>
            Head to dashboard
          </Link>
        }

      </main>
    </div>
  )
}
