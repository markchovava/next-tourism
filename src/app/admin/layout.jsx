import AdminContextProvider from "@/contexts/AdminContext";




export default async function Layout({ children }) {
  

    return (
      <>
      <AdminContextProvider>
      {children} 
      </AdminContextProvider>
      </>
    )
  }