import "@/styles/globals.css";
import Head from "next/head";
import { SWRConfig } from "swr";
import Layout from "@/components/Layout";
import RouteGuard from "@/components/RouteGuard";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(process.env.NEXT_PUBLIC_SYNC_FUSION_KEY);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>To-Do App</title>
      </Head>

      <RouteGuard>
        <Layout>
          <SWRConfig
            value={{
              fetcher: async (url) => {
                const res = await fetch(url);

                if (!res.ok) {
                  const error = new Error(
                    "An error occurred while fetching the data."
                  );

                  error.info = await res.json();
                  error.status = res.status;
                  throw error;
                }

                return res.json();
              },
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </Layout>
      </RouteGuard>
    </>
  );
}
