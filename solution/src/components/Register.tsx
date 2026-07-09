export const Register = ({ name, username, password, setName, setUsername, setPassword, handleRegister, navigate }) => {
    return (
        <div className="bg-black h-[100vh] text-white flex flex-row items-center justify-center">
            <div className="bg-[#202022] rounded-2xl border border-[#2E2E2E] px-6 py-4">
                <form onSubmit={handleRegister} className="flex flex-col items-center gap-6">
                    <div>
                        <label className="flex flex-row gap-2">
                            Name:
                            <input type="text" value={name} onChange={({ target }) => setName(target.value)} className="outline-white outline-1 rounded-lg px-2 py-1"/>
                        </label>
                    </div>
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
                    <div className="flex flex-row gap-4">
                        <button type="submit" className="border border-white px-4 rounded-lg py-1 cursor-pointer">Login</button>
                        <button onClick={() => navigate('/user')} className="border border-white px-4 rounded-lg py-1 cursor-pointer">Back</button>
                    </div>
                </form>
            </div>
        </div>
    )
}