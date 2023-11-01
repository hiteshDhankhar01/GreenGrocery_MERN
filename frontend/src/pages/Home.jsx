//import DiscoundCard from "../components/Discound/DiscoundCard"
// import Fruits from "../components/Fruits/Fruits"
import SliderCard from "../components/SliderCard/SliderCard"
// import Vegetabels from "../components/Vegetables/Vegetabels"
import gif from "../assets/image/fruitGIF.gif"
// import Fruit2 from "../components/Fruit2/Fruit2"
// import FruitsAll from "./FruitsAll"
import Slider from "../components/Slider/Slider"

const buttonNames = [
    {
        name: "Fruits",
        link: "/fruits"
    },
    {
        name: "Vegitabels",
        link: "/vegetabels"
    },
    {
        name: "Preamiam ",
        link: "/asd"
    },
    {
        name: "Seasonal",
        link: "/asdf"
    },
]

const home = () => {
    return (
        <>
            <SliderCard />


            <div className="px-[1.5rem] ">
                <div className="mt-4 bacgrounImage flex gap-8 mt-[3rem] mb-[1.6rem]">
                    {buttonNames.map((item, index) => (
                        <button key={index} className="border-2 text-[2rem] border-[#329967] rounded-[1.2rem] h-[4rem] w-fit px-4 bg-green-50 shadow-none text-[#329967] hover:bg-[#329967] hover:text-white" style={{ boxShadow: "none", transform: "scale(1)" }}>
                            <a href={item.link}>
                                {item.name}
                            </a>
                        </button>
                    ))}
                </div>

                {/* Fruits*/}
                <div className="mt-4 bacgrounImage bg-gray-100  rounded-[2px]">
                    <div className="flex flex-row items-center justify-between pt-2 mx-4 border-b-[2px]">
                        <h1 className="text-[2rem]">Fruits</h1>
                        <a className="text-[1rem] hover:text-[#329967]" href="/fruits">View All</a>
                    </div>
                    <Slider productCategory="fruit" />
                </div>

                {/* Vegetabeles */}
                <div className="mt-4 bacgrounImage bg-gray-100  rounded-[2px]">
                    <div className="flex flex-row items-center justify-between pt-2 mx-4 border-b-[2px]">
                        <h1 className="text-[2rem]">Vegetabeles</h1>
                        <a className="text-[1rem] hover:text-[#329967]" href="/fruits">View All</a>
                    </div>
                    <Slider productCategory="vegetable" />
                </div>

                {/* <div className="mt-4 bacgrounImage">
                    <FruitsAll />
                </div> */}

                {/* <div className="mt-4">
                    <Fruits />
                </div>
                <div className="mt-4">
                    <Vegetabels />
                </div> */}
                <div className="p-4">
                    <div className="  lg:flex lg:space-x-8 border-4 border-[#329967] rounded-[2px]">
                        <div className="lg:w-1/2">
                            <img className="h-[32rem]" src={gif} alt="" />
                        </div>
                        <div style={{ margin: "0 2rem" }} className="lg:w-1/2 py-2">
                            <h1 className="text-[1.5rem]">Benifits of Fruits</h1>
                            <p className="text-justify">
                                Fruits are {`nature's`} sweet and nutritious gifts. They are rich in essential vitamins, minerals, and antioxidants, making them a crucial part of a healthy diet. Consuming a variety of fruits can provide numerous benefits, including improved digestion, enhanced skin health, and a stronger immune system. The fiber in fruits aids in maintaining a healthy weight and can reduce the risk of chronic diseases like heart disease and certain types of cancer. Moreover, their natural sweetness makes them a delightful and healthy alternative to sugary snacks.</p>
                            <h1 className="text-[1.5rem]">Vegetables</h1>
                            <p className="text-justify" >Vegetables are nutritional powerhouses that offer an array of health benefits. Packed with vitamins and minerals, they are essential for maintaining good health. Regular consumption of vegetables can lead to better heart health, lower blood pressure, and improved weight management. Additionally, the high fiber content in vegetables promotes healthy digestion and helps prevent constipation. By incorporating a variety of colorful vegetables into your diet, you can enhance your overall well-being and reduce the risk of chronic illnesses. Plus, vegetables are versatile and can be prepared in a multitude of delicious ways, making it easy to enjoy their benefits in various dishes.</p>
                        </div>
                    </div>
                </div>

                {/* <Fruit2 /> */}
            </div>
        </>
    )
}

export default home
