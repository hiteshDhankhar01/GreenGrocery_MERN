import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className='flex justify-center items-center h-screen '>

            <div className='h-[8rem] w-[18rem] flex flex-col items-center justify-center gap-4'>
                <h2 className='text-[2rem]'>Error 404</h2>
                <h2 className='text-[1.8rem]'>Page Not Found</h2>
                <button className='text-[2rem] bg-[#329967] p-2 px-8 rounded-lg text-white'><NavLink to="/">Back to Home</NavLink></button>
            </div>

        </div>
    )
}

export default PageNotFound
