import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Links from '../components/Links'
import Container from '../components/Container'
import useCurrentUser from '../hooks/useCurrentUser'

export default function Home() {
  const { loggedIn } = useCurrentUser()

  return (
    <div className={styles.container}>

      <Head>
        <title>Flow project!</title>
      </Head>

      <main className={styles.main}>

        {loggedIn && <Container />}

        <Links />

      </main>
    </div>
  )
}
