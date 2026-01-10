import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <img 
            src="404_NotFound.png" 
            alt="Not Found"
            className="max-w-full mb-6 w-96" 
        />

        <p className="text-lg font-semibold">Page Not Found</p>


        <a href="/" className='inline-block px-6 py-3 font-medium text-white transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark'>
        Quay về trang chủ 
        </a>

    </div>
  )
}

export default NotFound