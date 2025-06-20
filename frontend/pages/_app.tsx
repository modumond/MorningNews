import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";

// import typescript
import type { AppProps } from "next/app";

// imports redux
import { Provider } from "react-redux";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import bookmarks from "../reducers/bookmarks";
import user from "../reducers/user";
import hiddenArticles from "../reducers/hiddenArticles";

// imports redux-persist
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({ bookmarks, user, hiddenArticles });
const persistConfig = { key: "morningnews", storage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Morning News</title>
        </Head>
        <Header />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
