import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineYoutube } from "react-icons/ai"
import { AiOutlineFacebook } from "react-icons/ai"

const information = [
    {
        display: "About Us",
        path: "about"
    },
    {
        display: "Terms & Condition",
        path: "TermsAndCondition"
    },
    {
        display: "FAQs",
        path: "faqs"
    }
]
const Shop = [
    {
        display: "Fruits",
        path: "fruits"
    },
    {
        display: "Vegetabels",
        path: "vegetabels"
    },
]

const ConnectUs = [
    {
        display: "career.gg@gmail.com",
        path: "Facebook"
    },
    {
        display: "help.gg@gmail.com",
        path: "Twitter"
    },
    {
        display: "invester.gg@gmail.com",
        path: "Instagram"
    }
]

// const Shop = [
//     {
//         display: "Fruits",
//         path: "fruits"
//     },
//     {
//         display: "Vegetabels",
//         path: "egetabels"
//     },
// ]

const Footer = () => {
    return (
        <>
            <div className="border-t-[1px] border-[#eee]"></div>
            <footer className=" containerzz bg-white p-4 text-black text-center flex flex-row  pt-2">

                <div className=" mx-auto lg:w-2/5">
                    <div >&copy; {new Date().getFullYear()} GreenGrocery All rights reserved.</div>

                    <div className="flex items-center gap-2 justify-center">
                        <button className="bg-[transparent] rounded-[12px]  p-1">
                            <AiOutlineInstagram style={{ width: "2rem", height: "2rem" }} />
                        </button>
                        <button className="bg-[transparent] rounded-[12px] p-1">
                            <AiOutlineFacebook style={{ width: "2rem", height: "2rem" }} />
                        </button>
                        <button className="bg-[transparent] rounded-[12px]  p-1">
                            <AiOutlineTwitter style={{ width: "2rem", height: "2rem" }} />
                        </button>
                        <button className="bg-[transparent] rounded-[12px]  p-1">
                            <AiOutlineYoutube style={{ width: "2rem", height: "2rem" }} />
                        </button>



                    </div>
                </div>
                <div className="flex flex-col items-start lg:w-1/5">
                    <h2 className="text-[1.5rem] mb-2">Information</h2>
                    <ul className="flex flex-col items-start">
                        {information.map((item, index) => (
                            <li className="text-[15px]" key={index}><a href={item.path}>{item.display}</a></li>
                        ))}
                        <li></li>
                    </ul>
                </div>
                <div className="flex flex-col items-start lg:w-1/5">
                    <h2 className="text-[1.5rem] mb-2">Connect Us</h2>
                    <ul className="flex flex-col items-start">
                        {ConnectUs.map((item, index) => (
                            <li className="text-[15px]" key={index}><a href={item.path}>{item.display}</a></li>
                        ))}
                        <li></li>
                    </ul>
                </div>
                <div className="flex flex-col items-start lg:w-1/5">
                    <h2 className="text-[1.5rem] mb-2">Shop</h2>
                    <ul className="flex flex-col items-start">
                        {Shop.map((item, index) => (
                            <li className="text-[15px]" key={index}><a href={item.path}>{item.display}</a></li>
                        ))}
                        <li></li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default Footer



{/* <div className="  text-center flex flex-row  border-t-[1px] border-[#eee] pt-[2rem]"> */ }