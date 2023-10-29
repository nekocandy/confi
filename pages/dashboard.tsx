import * as fcl from '@onflow/fcl'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useConfig from '../hooks/useConfig'
import useCurrentUser from '../hooks/useCurrentUser'

import ReadConfessions from "../cadence/scripts/ReadConfessions.cdc"
import AddConfession from "../cadence/transactions/AddConfession.cdc"
import Navbar from '../components/Navbar'
import { createExplorerTransactionLink } from '../helpers/links'

export default function Dashboard() {
    const { loggedIn, addr } = useCurrentUser()

    const [confessionInput, setConfessionInput] = useState('')
    const [confessions, setConfessions] = useState([])
    const [lastTransactionId, setLastTransactionId] = useState<string>()
    const [transactionStatus, setTransactionStatus] = useState<number>()
    const { network } = useConfig()

    const isEmulator = network => network !== 'mainnet' && network !== 'testnet'
    const isSealed = statusCode => statusCode === 4


    const queryChain = async () => {
        const res = await fcl.query({
            cadence: ReadConfessions
        })

        console.log({ read: res })

        setConfessions(res)
    }


    const addConfession = async (event) => {
        event.preventDefault()

        if (!confessionInput.length) {
            throw new Error('Please add a confession.')
        }

        const toRecordString = `${confessionInput}||${addr}||${Date.now()}`

        const transactionId = await fcl.mutate({
            cadence: AddConfession,
            args: (arg, t) => [arg(toRecordString, t.String)],
        })

        setLastTransactionId(transactionId)
    }


    useEffect(() => {
        if (lastTransactionId) {
            console.log('Last Transaction Id on chain: ', lastTransactionId)

            fcl.tx(lastTransactionId).subscribe(res => {
                setTransactionStatus(res.statusString)

                if (isSealed(res.status)) {
                    queryChain()
                }
            })
        }
    }, [lastTransactionId])

    const openExplorerLink = (transactionId, network) => window.open(createExplorerTransactionLink({ network, transactionId }), '_blank')

    return (
        <div>

            <Head>
                <title>Flow project!</title>
            </Head>

            <main className='h-screen bg-zinc-900 text-white px-4 py-2 flex flex-col gap-6'>
                <Navbar />
                <div className='flex items-center gap-8' >
                    <input onChange={(event) => setConfessionInput(
                        event.target.value
                    )} className='flex-1 py-2 px-6 bg-zinc-900 placeholder:text-zinc-500 border-2 border-zinc-500 focus:outline-none' type="text" placeholder='Enter confession' />
                    <button onClick={addConfession} className='bg-indigo-500 rounded-md px-8 py-2'>Submit</button>
                </div>

                <div className='flex flex-col gap-4'>
                    <div>
                        Previous Confessions:
                    </div>

                    <div className='grid grid-cols-4 gap-6'>
                        {confessions.map((confession, i) => {
                            let cnf, date, by;

                            if (confession.includes('||')) {
                                cnf = confession.split('||')[0]
                                by = confession.split('||')[1]
                                date = confession.split('||')[2]
                            } else {
                                cnf = confession
                                by = 'Unknown'
                                date = 'Unknown'
                            }

                            return (
                                <div key={i} className='bg-zinc-800 border-2 px-4 py-4 rounded-md border-zinc-600 flex flex-col gap-8 justify-between'>
                                    <div>{cnf}</div>
                                    <div className='flex items-center justify-between text-xs'>
                                        <div>
                                            Date: {date}
                                        </div>

                                        <div>
                                            By: {by}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <button className='bg-white text-black' onClick={queryChain}>RefreshData</button>
            </main>
        </div>
    )
}
