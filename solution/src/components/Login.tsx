export const Login = ({ username, password, setUsername, setPassword, handleLogin, user }) => {
    return (
        <div className="bg-black h-[100vh] text-white flex flex-row items-center justify-center">
            <div className="bg-[#202022] rounded-2xl border border-[#2E2E2E] px-6 py-4">
                <form onSubmit={handleLogin} className="flex flex-col items-center gap-6">
                    <div>
                        <label className="flex flex-row gap-2">
                            Username:
                            <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} className="outline-white outline-1 rounded-lg px-2 py-1"/>
                        </label>
                    </div>
                    <div>
                        <label className="flex flex-row gap-2">
                            Password:
                            <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} className="outline-white outline-1 rounded-lg px-2 py-1"/>
                        </label>
                    </div>
                    <button type="submit" className="border border-white px-4 rounded-lg py-1 cursor-pointer">Login</button>
                </form>
            </div>
        </div>
    )
}