import React from 'react'
const MessageForm = () => {
    function handleSubmit(e) {
        e.preventDefault()
    }
    return (
        <div>
            <div className="container overflow-y-scroll rounded-lg bg-gray-100 px-2 font-medium border border-gray-200" style={{ height: '720px' }}>
                Hello
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-col-5 grid-flow-col gap-3">
                    <input type="text" placeholder='Enter Message....'
                        className='w-full lg:col-span-4 md:col-span-4 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm overflow-y-scroll focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    />
                    <button type="submit"
                        className='mt-5 tracking-wide lg:w-9/12 font-semibold bg-green-800 text-gray-100 w-full rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out items-center justify-center focus:shadow-outline focus:outline-none'
                    >
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessageForm