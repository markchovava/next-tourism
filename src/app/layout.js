import { getAppInfo } from "@/api/getAppInfo";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
/* ToastContainer */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const metadata = {
  title: "Enjoy Zimbabwe",
  description: "We are Enjoy Zimbabwe.",
};

export default async function RootLayout({ children }) {
    const appInfoData = await getAppInfo()
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer appInfoData={appInfoData} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
      </body>
    </html>
  );
}
