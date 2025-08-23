import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

import { Link } from "react-router-dom"
import Logout from "./Logout"

const Dropdown = ({ items }) => {
    return <DropdownMenuContent className="w-56 border-2 border-gray-400 rounded-lg p-2" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        {
            items?.map(({ name, path }, index) => (
                <DropdownMenuItem key={index}>
                    <Link to={path}>{name}</Link>
                </DropdownMenuItem>
            ))
        }
        <Logout />
    </DropdownMenuContent>
}

export default Dropdown
