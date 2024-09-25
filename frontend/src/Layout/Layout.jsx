import Header from "../components/Header/Header"
import Routers from "../Routes/Router"
import Footer from "../components/Footer/Footer"

const Layout = () => {
    return (
        <>
            <Header />
            <main className="bg-white min-h-[100vh]">
                <Routers />
            </main>
            <Footer />
        </>
    )
}

export default Layout

