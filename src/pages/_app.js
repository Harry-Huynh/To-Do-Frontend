import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-layouts/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-react-kanban/styles/material.css";
import "@/styles/globals.css";
import Head from "next/head";
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
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </>
  );
}
