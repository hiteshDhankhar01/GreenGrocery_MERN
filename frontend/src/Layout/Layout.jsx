import Header from "../components/Header/header"
import Routers from "../Routes/Router"
import Footer from "../components/Footer/Footer"

const Layout = () => {
    return (
        <>
            <Header />
            <main className="bg-white container">
                <Routers />
            </main>
            <Footer />
        </>
    )
}

export default Layout

