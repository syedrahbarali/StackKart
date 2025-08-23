import { Button } from "@/components/ui/button"
import { logoutUser } from "../services/authServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutUser().then((res) => {
            toast.success(res.message);

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        });
    };

    return (
        <Button variant="destructive" className="w-full" onClick={handleLogout}>Log out</Button>
    )
}

export default Logout
