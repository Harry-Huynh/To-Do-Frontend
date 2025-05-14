import MainNav from "./MainNav";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <div className="mt-20">{children}</div>
      <Footer />
    </>
  );
}
