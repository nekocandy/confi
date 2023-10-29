import * as fcl from '@onflow/fcl'
import Head from 'next/head'
import useCurrentUser from '../hooks/useCurrentUser'

export default function Home() {
  const { loggedIn } = useCurrentUser()

  return (
    <div>

      <Head>
        <title>Flow project!</title>
      </Head>

      <main className='h-screen flex items-center justify-center'>

        Hello
        <h1>
          GG -{loggedIn} -
        </h1>

    {
      loggedIn ?
        <button onClick={fcl.unauthenticate}>Log Out</button>
        :
        <button onClick={fcl.logIn}>Log In</button>
    }

      </main>
    </div>
  )
}
