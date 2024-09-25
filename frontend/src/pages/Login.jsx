import { BASE_URL } from "../config";
import { useState, useContext, useEffect } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { authContext } from "../context/Authcontext";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        showPassword: false,
    });
    const [isGuest, setIsGuest] = useState(false);
    const { dispatch } = useContext(authContext);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setFormData((prevData) => ({
            ...prevData,
            showPassword: !prevData.showPassword,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitData = async (e) => {
        e.preventDefault();
        setLoading(true);

        const email = isGuest ? "Jhondoe@gmail.com" : formData.email;
        const password = isGuest ? "guestpassword" : formData.password;


        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const { message, user, token } = await res.json();

            if (!res.ok) {
                throw new Error(message);
            }

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    user: user,
                    token: token,
                },
            });

            toast.success(message);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginAsGuest = () => {
        setIsGuest(true);
    };

    useEffect(() => {
        if (isGuest) {

            submitData(new Event('submit'));
        }
    }, [isGuest]);

    return (
        <div className='py-[4rem]'>
            <div className="box flex justify-center h-[24rem] md:m-[4rem] md:border-[2px] border-[#329967] items-center">
                <div className='hidden md:flex flex-col justify-center h-full text-white bg-[#329967] px-6 py-auto pb-[5rem] w-1/2'>
                    <h2 className='fw text-[3rem] '>Welcome to </h2>
                    <h2 className='fw text-[2rem]'> GreenGrocery Store</h2>
                    <p>Discover the freshest selection of hand-picked fruits and vegetables, delivered straight from the farm to your doorstep. We’re committed to providing you with top-quality produce, ensuring that every bite is as fresh and nutritious as it should be. Shop with us for the healthiest choices, sustainably sourced and always fresh.</p>
                </div>
                <div className='w-full md:w-1/2 m-[1rem]'>
                    <h2 className='fw bg-[#329967] text-[2rem] text-white rounded-[2rem] w-fit px-4'>Login</h2>
                    <div className="form-box mt-[1rem] login">
                        <form onSubmit={submitData}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-[1.1rem] mb-2">Email</label>
                                <input
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="text-black w-full px-3 py-2 bb-[2px] rounded-lg border-b-[1px] focus:outline-none focus-border-none border-[#329967]"
                                    placeholder='Enter Email'
                                />
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
                                        className="absolute top-0 right-0 h-full px-2 flex items-center cursor-pointer transform-none shadow-none"
                                        style={{ boxShadow: "none", transform: "scale(1)" }}
                                    >
                                        {formData.showPassword ? <BiShow style={{ width: "1.5rem", height: "2rem", color: "#329967" }} /> : <BiHide style={{ width: "1.5rem", height: "2rem", color: "#329967" }} />}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-2 flex justify-end">
                                <button
                                    type="button" // Change to button to prevent form submission
                                    onClick={handleLoginAsGuest}
                                    disabled={loading}
                                    className="w-fit bg-[#329967] text-white font-semibold py-2 px-4 rounded-[2rem] mr-2"
                                >
                                    {loading ? <PulseLoader size={10} color="white" /> : 'Login as Guest'}
                                </button>
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-fit bg-[#329967] text-white font-semibold py-2 px-4 rounded-[2rem] "
                                >
                                    {loading && isGuest === false ? <PulseLoader size={10} color="white" /> : 'Login'}
                                </button>
                            </div>
                            <p className='text-black mt-[1rem] text-center'>Dont have an account? <NavLink to="/register" className='text-blue-500 hover:border-b-[1px] border-blue-500'>Register</NavLink></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
