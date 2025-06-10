import Head from 'next/head';
import Bookmarks from '../components/Bookmarks';

export default function BookmarksPage() {
  return (<>
    <Head>
      <title>Morning News - Bookmarks</title>
    </Head>
    <Bookmarks />
  </>);
};