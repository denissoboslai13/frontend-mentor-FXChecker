export const UserScreen = ({ navigate, user }) => {
    return (
        <div className="bg-black h-[100vh] text-white flex flex-row justify-center items-center">
            <div className="bg-[#202022] rounded-2xl border border-[#2E2E2E] px-6 py-4 flex flex-row gap-6">
                <button onClick={() => user ? navigate('/logout') : navigate('/login')} className="border border-white px-4 rounded-lg py-1 cursor-pointer">Login / logout</button>
                {!(user) && (
                    <button onClick={() => navigate('/register')} className="border border-white px-4 rounded-lg py-1 cursor-pointer">Register</button>
                )}
                <button onClick={() => navigate('/')} className="border border-white px-4 rounded-lg py-1 cursor-pointer">Back</button>
            </div>
        </div>
    )
}