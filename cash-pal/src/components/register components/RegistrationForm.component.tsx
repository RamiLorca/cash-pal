import { useState } from "react";
import { register } from "../../utilities/UserUtils";

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
        <form onSubmit={handleRegister}>
            <input
            type="text"
            placeholder="Create New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            />

            <input
            type="text"
            placeholder="Create Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            />

            <button type="submit">Register</button>
        </form>
    )
}

export default RegistrationForm;