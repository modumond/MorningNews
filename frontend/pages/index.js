import Head from 'next/head';
import Home from '../components/Home';

export default function Index() {
  return (<>
    <Head>
      <title>Morning News - Home</title>
    </Head>
    <Home />
  </>);
};