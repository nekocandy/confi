import * as fcl from '@onflow/fcl'
import Head from 'next/head'
import useCurrentUser from '../hooks/useCurrentUser'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import contractSnippets from "../config/contracts.json"
import EmbedGitHubFileContent from "react-embed-github-file-content";
import { useState, useEffect } from "react"
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";



export default function Home() {
    const { loggedIn, addr } = useCurrentUser()
    const [urls, setURLs] = useState([])

    function generateSnippetLinks() {
        // const URLs = contractSnippets.map((snippet) => (
        //     `<script src="https://emgithub.com/embed-v2.js?target=${encodeURI(snippet)}&style=base16%2Fgruvbox-dark-hard&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on&fetchFromJsDelivr=on"></script>`
        // ))

        // const URLs = contractSnippets.map(async (snippet) => (snippet))


        setURLs(contractSnippets)
    }

    useEffect(() => {
        generateSnippetLinks()
    }, [])

    return (
        <div>

            <Head>
                <title>Flow project!</title>
            </Head>

            <main className='min-h-screen flex flex-col bg-zinc-900 text-white gap-6 px-4'>
                <Navbar />

        <h1 className='text-4xl font-bold'>useful snippets for Flow Blockchain:</h1>

                <div className='grid grid-cols-2 gap-8'>
                    {
                        urls.map((url, i) => (
                            <div className='flex flex-col gap-2'>
                                <h1>Sauce: <Link href={url} target='_blank'>{url}</Link></h1>
                                <EmbedGitHubFileContent
                                    className="text-xs"
                                    url={url}
                                    loadingComponent={<p>Loading...</p>}
                                    errorComponent={<p>Error</p>}
                                    onLoad={() => Prism.highlightAll()}
                                    onError={() => console.error("onError")}
                                />
                            </div>
                        ))
                    }
                </div>
            </main>
        </div>
    )
}
