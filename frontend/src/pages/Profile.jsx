import { useContext, useState, useEffect } from "react"
import { authContext } from "../context/Authcontext"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../config"
import uploadImageToCloudinary from "../utils/cloudinary."
import { toast } from "react-toastify"
import { BiShow, BiHide } from "react-icons/bi"
import { PulseLoader } from "react-spinners"


const Profile = () => {
    const { dispatch } = useContext(authContext)
    const { token } = useContext(authContext)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()

        dispatch({
            type: "LOGOUT",
            payload: {
                user: null,
                token: null
            }
        })

        navigate('/')
    }

    const deleteAccount = async () => {
        if (user?._id === "66f3bbcfef244da6c308922e") {
            toast.error("This is a guest account")
            return
        }
        try {
            const res = await fetch(`${BASE_URL}/user/delete/${user?._id}`,
                {
                    method: "delete",
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            localStorage.clear()
            dispatch({
                type: "LOGOUT",
                payload: {
                    user: null,
                    token: null
                }
            })

            navigate('/')
        } catch (error) {

            console.log(error)
        }
    }

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
        const data = await uploadImageToCloudinary(file)
        setPreviewURL(data.url)
        setSelectedFile(data.url)
        setFormData({ ...formData, photo: data.url })
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //==============================================================

    useEffect(() => {
        getUserDetails()
    }, []);

    const getUserDetails = async () => {
        let result = await fetch(`${BASE_URL}/user/${user?._id}`)
        result = await result.json()
        setFormData({
            name: result.name || "",
            email: result.email || "",
            password: result.password || "",
            photo: result.photo || ""
        })
    }


    const updateData = async event => {
        event.preventDefault();
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/user/update/${user?._id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })



            const { message } = await res.json()

            if (!res.ok) {
                throw new Error(message)
            }

            // dispatch({
            //     type: "LOGIN_SUCCESS",
            //     payload: {
            //         user: user,
            //         token:token
            //     }
            // })
            setLoading(false)
            toast.success(message)
            navigate('/profile')
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

    //===================================
    const { user } = useContext(authContext)
    return (
        <div className='py-[4rem]'>
            <div className="box flex justify-center h-[28rem] mx-[4rem] border-[2px] border-[#329967] items-center">
                <div className='flex flex-col text-center items-center gap-1 h-full py-[4rem]  text-white bg-[#329967] w-1/2'>
                    <img src={user?.photo} alt="" className='h-[5rem] w-[5rem] rounded-[4rem] border-[2px] border-[#329967]' />
                    <h2 className='capitalize text-[1.2rem]'>{user?.name}</h2>
                    <p>{user?.email}</p>
                    <div className="mt-[4rem] flex flex-col gap-[2rem] text-[1.2rem] font-semibold ">
                        <button className="bg-red-600 text-white px-4 py-2 rounded-[5px]"
                            onClick={logout}>Logout</button>
                        <button onClick={deleteAccount} className="bg-black text-white px-4 py-2 rounded-[5px]" >Delete Acccount</button>
                    </div>
                </div>
                <div className=' w-1/2 m-[1rem] '>
                    <h2 className='fw bg-[#329967] text-[2rem] text-white rounded-[2rem] w-fit px-4'>Profile</h2>
                    <div className="form-box mt-[1rem] login">
                        <form onSubmit={updateData} method="post">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">Name</label>
                                <input type="text" onChange={handleInputChange} value={formData.name} id="name" name="name" className=" text-black w-full px-3 py-2 bb-[2px] rounded-lg border-b-[1px] focus:outline-none focus-border-none border-[#329967]"
                                    placeholder={user?.name} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">Email</label>
                                <input type="email" onChange={handleInputChange} value={formData.email} id="email" name="email" className=" text-black w-full px-3 py-2 bb-[2px] rounded-lg border-b-[1px] focus:outline-none focus-border-none border-[#329967]"
                                    placeholder={user?.email} />
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
                                        className="absolute top-0 right-0 h-full px-2 flex items-center cursor-pointer"
                                    >
                                        {formData.showPassword ? <BiShow style={{ width: "1.5rem", height: "2rem", color: "#329967" }} /> : <BiHide style={{ width: "1.5rem", height: "2rem", color: "#329967" }} />}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4 flex justify-between">
                                <div className="flex items-center gap-2">
                                    {selectedFile ? (
                                        <img src={previewURL} alt="" className='h-[3rem] w-[3rem] rounded-[2rem] border-[2px] border-[#329967]' />) : (
                                        <img src={user?.photo} alt="" className='h-[3rem] w-[3rem] rounded-[2rem] border-[2px] border-[#329967]' />)}
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
                                    {loading ? <PulseLoader color="white" size={10} /> : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
