import { useState } from "react";
import { register } from "../../utilities/UserUtils";
import "./RegistrationForm.styles.scss";

const RegistrationForm = () => {

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await register(newUsername, newPassword);
            console.log(response);
            console.log("Account Balance: registered as " + newUsername);

            setNewUsername("");
            setNewPassword("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleRegister} className='registration-form'>
            <input
            type="text"
            placeholder="Create New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-stone-950 leading-tight focus:outline-none focus:bg-white focus:border-green-800"'
            />

            <input
            type="text"
            placeholder="Create Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-stone-950 leading-tight focus:outline-none focus:bg-white focus:border-green-800"'
            />

            <button 
                type="submit"
                className='shadow bg-blue-700 hover:bg-blue-600 focus:shadow-outline focus:outline-none rounded-md text-white font-bold py-2 px-4'
            >
                Register
            </button>
        </form>
    )
}

export default RegistrationForm;