import Head from 'next/head'


const BaseLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>InstaShare</title>
        <meta name="description" content="Share files instantly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  )
}

export default BaseLayout