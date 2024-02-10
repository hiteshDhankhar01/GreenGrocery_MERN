import { useState, useContext } from "react"
import { BASE_URL } from "../config"
import { PulseLoader } from "react-spinners"
import { toast } from "react-toastify"
import uploadImageCloudinary from "../utils/cloudinary..js"
import { authContext } from "../context/Authcontext.jsx"


const AddProduct = () => {
    // const [name,setName] = useState("");
    // const [email,setEmail] = useState("");
    // const [password,setPassword] = useState("");
    const { token } = useContext(authContext)

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState("")

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        oldPrice: "",
        price: "",
        quantity: "",
        categories: "",
        image: selectedFile,
    });

    const handelFileInputchange = async (e) => {
        const file = e.target.files[0]
        const data = await uploadImageCloudinary(file)
        setPreviewURL(data.url)
        setSelectedFile(data.url)
        setFormData({ ...formData, image: data.url })
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

  

    const submitData = async event => {
        
        event.preventDefault();
        console.log(formData)
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/product/addProduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            const { message } = await res.json()
            console.log( message)

            if (!res.ok) {
                throw new Error(message)
                
            }



            setLoading(false)
            toast.success(message)

        } catch (error) {
            toast.error(error.message)
            setLoading(false)

        }
    };

    return (
        <div className='py-[4rem]'>
            <div className="box flex justify-center h-fit mx-[4rem] border-[2px] border-[#329967] items-center">
                <div className=' w-1/2 m-[1rem]'>
                    <h2 className='fw bg-[#329967] text-[2rem] text-white rounded-[2rem] w-fit px-4'>Add Product</h2>
                    <div className="form-box mt-[1rem] login">
                        <form onSubmit={submitData} method="post">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">Name</label>
                                <input type="text" onChange={handleInputChange} value={formData.name} id="name" name="name" className=" text-black w-full px-3 py-2 bb-[2px] rounded-lg border-b-[1px] focus:outline-none focus-border-none border-[#329967]"
                                    placeholder='Enter Name' />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">oldPrice</label>
                                <input type="number" onChange={handleInputChange} value={formData.oldPrice} id="oldPrice" name="oldPrice" className=" text-black w-full px-3 py-2 bb-[2px] rounded-lg border-b-[1px] focus:outline-none focus-border-none border-[#329967]"
                                    placeholder='Enter Old price' />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">price</label>
                                <input type="number" onChange={handleInputChange} value={formData.price} id="price" name="price" className=" text-black w-full px-3 py-2 bb-[2px] rounded-lg border-b-[1px] focus:outline-none focus-border-none border-[#329967]"
                                    placeholder='Enter price' />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">quantity</label>
                                <input type="text" onChange={handleInputChange} value={formData.quantity} id="quantity" name="quantity" className=" text-black w-full px-3 py-2 bb-[2px] rounded-lg border-b-[1px] focus:outline-none focus-border-none border-[#329967]"
                                    placeholder='Enter quantity' />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">categories</label>
                                <input type="text" onChange={handleInputChange} value={formData.categories} id="categories" name="categories" className=" text-black w-full px-3 py-2 bb-[2px] rounded-lg border-b-[1px] focus:outline-none focus-border-none border-[#329967]"
                                    placeholder='Enter categories' />
                            </div>

                            <div className="mb-4 flex justify-between">
                                <div className="flex items-center gap-2">
                                    {selectedFile && (
                                        <img src={previewURL} alt="" className='h-[3rem] w-[3rem] rounded-[2rem] border-[2px] border-[#329967]' />)}
                                    <div className="relative w-[110px] h-[40px]">
                                        <input type="file"
                                            name="image"
                                            id="customFile"
                                            accept=".jpg, .png"
                                            onChange={handelFileInputchange}
                                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                                        <label htmlFor="customFile" className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#329967] text-white rounded-lg truncate cursor-pointer">Upload File</label>
                                    </div>
                                </div>

                                <button disabled={loading} type="submit" className="w-fit bg-[#329967] text-white font-semibold py-2 px-4 rounded-[2rem] " >
                                    {loading ? <PulseLoader color="white" size={10} /> : 'Submit'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct




