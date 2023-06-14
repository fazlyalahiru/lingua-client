import { Link, useRouteError } from 'react-router-dom'
import errorImg from '../../public/images/error.jpg'


const ErrorPage = () => {
    const { error, status } = useRouteError()
    return (
        <>
        
            <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>

                <div className='max-w-md text-center'>

                    <img className='w-72' src={errorImg} alt="" />
                    <p className='text-2xl font-semibold md:text-xl text-[#4285f4] mb-8'>
                        {error?.message}
                    </p>
                    <Link to='/' className='btn btn-solid hover:bg-[#4285f4] hover:border-[#4285f4] hover:text-white'>
                        Back to homepage
                    </Link>
                </div>
            </div>
            
        </>

    )
}

export default ErrorPage