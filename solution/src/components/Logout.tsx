export const Logout = ({ handleLogout, navigate }) => {
    return (
        <div className="bg-black h-[100vh] flex flex-row items-center justify-center">
            <div className="bg-[#202022] rounded-2xl border border-[#2E2E2E] px-6 py-4 flex flex-row gap-4 text-white">
                <button className="border border-white px-4 rounded-lg py-1 cursor-pointer" onClick={() => handleLogout()}>Logout</button>
                <button onClick={() => navigate('/')} className="border border-white px-4 rounded-lg py-1 cursor-pointer">Back</button>
            </div>
        </div>
    )
}