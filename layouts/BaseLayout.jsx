import Head from 'next/head'


const BaseLayout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
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