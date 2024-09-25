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


            const { message } = await res.json()

            if (!res.ok) {
                throw new Error(message)
            }
            setLoading(false)
            toast.success(message)
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
        <div className="py-8 sm:py-12">
            <div className="box flex flex-col lg:flex-row justify-center h-auto lg:h-[28rem] mx-4 sm:mx-8 lg:mx-16 border-2 border-[#329967] items-center gap-2">
                {/* Left Section */}
                <div className="flex flex-col text-center items-center gap-4 p-4 sm:gap-2 sm:py-8 text-white bg-[#329967] w-full lg:w-1/2 h-full ">
                    <img src={user?.photo} alt="" className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-white" />
                    <h2 className="capitalize text-xl sm:text-2xl">{user?.name}</h2>
                    <p className="text-sm sm:text-base">{user?.email}</p>
                    <div className="mt-6 flex flex-col gap-4 text-base sm:text-lg font-semibold">
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg" onClick={logout}>
                            Logout
                        </button>
                        <button onClick={deleteAccount} className="bg-black text-white px-4 py-2 rounded-lg">
                            Delete Account
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/2 mt-4 lg:mt-0 p-2">
                    <h2 className="bg-[#329967] text-2xl sm:text-3xl text-white rounded-lg w-fit px-4 py-2">Profile</h2>
                    <div className="form-box mt-4 login">
                        <form onSubmit={updateData} method="post">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-base sm:text-lg mb-2">Name</label>
                                <input
                                    type="text"
                                    onChange={handleInputChange}
                                    value={formData.name}
                                    id="name"
                                    name="name"
                                    className="text-black w-full px-3 py-2 border-b-2 rounded-lg focus:outline-none focus:border-[#329967] border-gray-300"
                                    placeholder={user?.name}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-base sm:text-lg mb-2">Email</label>
                                <input
                                    type="email"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                    id="email"
                                    name="email"
                                    className="text-black w-full px-3 py-2 border-b-2 rounded-lg focus:outline-none focus:border-[#329967] border-gray-300"
                                    placeholder={user?.email}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-base sm:text-lg mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={formData.showPassword ? "text" : "password"}
                                        onChange={handleInputChange}
                                        value={formData.password}
                                        id="password"
                                        name="password"
                                        className="text-black w-full px-3 py-2 border-b-2 rounded-lg focus:outline-none focus:border-[#329967] border-gray-300"
                                        placeholder="Enter Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute top-0 right-0 h-full px-2 flex items-center cursor-pointer"
                                    >
                                        {formData.showPassword ? <BiShow className="w-6 h-6 text-[#329967]" /> : <BiHide className="w-6 h-6 text-[#329967]" />}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    {selectedFile ? (
                                        <img src={previewURL} alt="" className="h-12 w-12 rounded-full border-2 border-[#329967]" />
                                    ) : (
                                        <img src={user?.photo} alt="" className="h-12 w-12 rounded-full border-2 border-[#329967]" />
                                    )}
                                    <div className="relative">
                                        <input
                                            type="file"
                                            name="photo"
                                            id="customFile"
                                            accept=".jpg, .png"
                                            onChange={handelFileInputchange}
                                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <label htmlFor="customFile" className="  bg-[#329967] text-white text-md px-3 py-2 rounded-lg text-center cursor-pointer">
                                            Upload File
                                        </label>
                                    </div>
                                </div>

                                <button disabled={loading} type="submit" className="bg-[#329967] text-white font-semibold py-2 px-4 rounded-lg">
                                    {loading ? <PulseLoader color="white" size={10} /> : "Update"}
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
