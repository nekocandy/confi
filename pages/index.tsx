import Head from 'next/head'
import Container from '../components/Container'
import useCurrentUser from '../hooks/useCurrentUser'

export default function Home() {
  const { loggedIn } = useCurrentUser()

  return (
    <div>

      <Head>
        <title>Flow project!</title>
      </Head>

      <main>

        {loggedIn && <Container />}


      </main>
    </div>
  )
}
