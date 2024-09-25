import { useState, useContext } from "react"
import { BiHide, BiShow } from "react-icons/bi"
// import { BiShow } from "react-icons/bi"
import { BASE_URL } from "../config"
import { NavLink, useNavigate } from "react-router-dom"
import { PulseLoader } from "react-spinners"
import { toast } from "react-toastify"
import uploadImageCloudinary from "../utils/cloudinary..js"
import { authContext } from "../context/Authcontext.jsx"


const SignUp = () => {
    // const [name,setName] = useState("");
    // const [email,setEmail] = useState("");
    // const [password,setPassword] = useState("");
    const { dispatch } = useContext(authContext)

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState("")

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photo: selectedFile,
    });

    const handelFileInputchange = async (e) => {
        const file = e.target.files[0]
        const data = await uploadImageCloudinary(file)
        setPreviewURL(data.url)
        setSelectedFile(data.url)
        setFormData({ ...formData, photo: data.url })
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const navigate = useNavigate()
    const submitData = async event => {
        event.preventDefault();
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const { message, user, token } = await res.json()

            if (!res.ok) {
                throw new Error(message)
            }

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    user: user,
                    token: token
                }
            })


            setLoading(false)
            toast.success(message)
            navigate('/')
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
            navigate('/')
        }
    };

    const togglePasswordVisibility = () => {
        setFormData({
            ...formData,
            showPassword: !formData.showPassword,
        });
    };

    return (
        <div className='py-[4rem]'>
            <div className="box flex justify-center h-[28rem] md:m-[4rem] md:border-[2px] border-[#329967] items-center">
                <div className='hidden md:flex flex-col jsutify-center h-full text-white bg-[#329967] px-6 py-auto pb-[5rem] w-1/2'>
                <h2 className='fw text-[3rem] '>Welcome to </h2>
                    <h2 className='fw text-[2rem]'> GreenGrocery Store</h2>
                    <p>Discover the freshest selection of hand-picked fruits and vegetables, delivered straight from the farm to your doorstep. We’re committed to providing you with top-quality produce, ensuring that every bite is as fresh and nutritious as it should be. Shop with us for the healthiest choices, sustainably sourced and always fresh.</p>
                </div>
                <div className='w-full md:w-1/2 m-[1rem]'>
                    <h2 className='fw bg-[#329967] text-[2rem] text-white rounded-[2rem] w-fit px-4'>Register</h2>
                    <div className="form-box mt-[1rem] login">
                        <form onSubmit={submitData} method="post">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">Name</label>
                                <input type="text" onChange={handleInputChange} value={formData.name} id="name" name="name" className=" text-black w-full px-3 py-2 bb-[2px] rounded-lg border-b-[1px] focus:outline-none focus-border-none border-[#329967]"
                                    placeholder='Enter Name' />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">Email</label>
                                <input type="email" onChange={handleInputChange} value={formData.email} id="email" name="email" className=" text-black w-full px-3 py-2 bb-[2px] rounded-lg border-b-[1px] focus:outline-none focus-border-none border-[#329967]"
                                    placeholder='Enter Email' />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={formData.showPassword ? "text" : "password"}
                                        onChange={handleInputChange}
                                        value={formData.password}
                                        id="password"
                                        name="password"
                                        className="text-black w-full px-3 py-2 bb-[2px] rounded-lg border-b-[1px] focus:outline-none focus-border-none border-[#329967]"
                                        placeholder='Enter Password'
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute top-0 right-0 h-full px-2 flex items-center cursor-pointer " style={{ boxShadow: "none", transform: "scale(1)" }}
                                    >
                                        {formData.showPassword ? <BiShow style={{ width: "1.5rem", height: "2rem", color: "#329967" }} /> : <BiHide style={{ width: "1.5rem", height: "2rem", color: "#329967" }} />}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4 flex justify-between">
                                <div className="flex items-center gap-2">
                                    {selectedFile && (
                                        <img src={previewURL} alt="" className='h-[3rem] w-[3rem] rounded-[2rem] border-[2px] border-[#329967]' />)}
                                    <div className="relative w-[110px] h-[40px]">
                                        <input type="file"
                                            name="photo"
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
                            {/* <div className='mb-2'>


                            </div> */}

                            <p className='text-black mt-[1rem] text-center'>Dont have a account? <NavLink to="/login" className='text-blue-500 hover:border-b-[1px] border-blue-500'>Login</NavLink></p>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp


