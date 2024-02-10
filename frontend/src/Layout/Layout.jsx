import Header from "../components/Header/Header"
import Routers from "../Routes/Router"
import Footer from "../components/Footer/Footer"

const Layout = () => {
    return (
        <>
            {/* <Header /> */}
            <Header />
            <main className="bg-white containerzz min-h-[100vh] mt-[4rem]">
                <Routers />
            </main>
            <Footer />
        </>
    )
}

export default Layout

