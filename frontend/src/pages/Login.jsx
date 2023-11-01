import { BASE_URL } from "../config"
import { useState, useContext } from "react"
import { BiHide, BiShow } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { PulseLoader } from "react-spinners"
import { toast } from "react-toastify"
import { authContext } from "../context/Authcontext"


const Login = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { dispatch } = useContext(authContext)

    const togglePasswordVisibility = () => {
        setFormData({
            ...formData,
            showPassword: !formData.showPassword,
        });
    };

    const handleInpuChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const navigate = useNavigate()

    const submitData = async (e) => {
        e.preventDefault()
        setLoading(true)
        // console.log(formData)

        try {
            const res = await fetch(`${BASE_URL}/auth/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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

            console.log(res, "login done")
            setLoading(false)
            toast.success(message)
            navigate('/')
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.message)
            navigate('/')
        }
    }
    return (
        <div className='py-[4rem]'>
            <div className="box flex justify-center h-[24rem] mx-[4rem] border-[2px] border-[#329967] items-center">
                <div className='flex flex-col jsutify-center h-full text-white bg-[#329967] px-6 py-auto pb-[5rem] w-1/2'>
                    <h2 className='fw text-[4rem] '>Welcome to </h2>
                    <h2 className='fw text-[4rem]'> Online Store</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut laborum id nesciunt ducimus atque exercitationem earum molestias, quod sapiente quam cupiditate rem omnis aliquam quas dolores beatae quibusdam voluptatem quasi ad laudantium optio.</p>
                </div>
                <div className=' w-1/2 m-[1rem]'>
                    <h2 className='fw bg-[#329967] text-[2rem] text-white rounded-[2rem] w-fit px-4'>Login</h2>
                    <div className="form-box mt-[1rem] login">
                        <form onSubmit={submitData}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">Email</label>
                                <input value={formData.email} onChange={handleInpuChange} type="email" id="email" name="email" className=" text-black w-full px-3 py-2 bb-[2px] rounded-lg border-b-[1px] focus:outline-none focus-border-none border-[#329967]"
                                    placeholder='Enter Email' />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={formData.showPassword ? "text" : "password"}
                                        onChange={handleInpuChange}
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
                            <div className="mb-2 flex justify-end">
                                <button disabled={loading} type="submit" className="w-fit bg-[#329967] text-white font-semibold py-2 px-4 rounded-[2rem] ">{loading ? <PulseLoader size={10} color="white" /> : 'Login'}</button>
                            </div>

                            <p className='text-black mt-[1rem] text-center'>Dont have a account? <a href="/register" className='text-blue-500'>Register</a></p>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
