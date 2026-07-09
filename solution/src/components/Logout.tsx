export const Logout = ({ handleLogout }) => {
    return (
        <div className="bg-black h-[100vh] flex flex-row items-center justify-center">
            <div className="bg-[#202022] rounded-2xl border border-[#2E2E2E] px-6 py-4">
                <button className="border border-white px-4 rounded-lg py-1 cursor-pointer text-white" onClick={() => handleLogout()}>Logout</button>
            </div>
        </div>
    )
}