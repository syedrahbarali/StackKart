import { IoCartOutline } from "react-icons/io5";
import Dropdown from "./Dropdown";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const CartPopover = ({ navItems }) => {
    const cart = useSelector((state) => state.cart);
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const latestItems = cart.slice(-3).reverse();
    return (
        <div className="flex items-center gap-4 sm:gap-3">
            {/* Cart with hover dropdown */}
            <Popover>
                <PopoverTrigger asChild>
                    <span className="relative flex items-center cursor-pointer">
                        <IoCartOutline size={22} className="sm:size-[20px]" />

                        {cartItemCount > 0 && (
                            <Badge
                                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-2 flex items-center justify-center"
                                variant="destructive"
                            >
                                {cartItemCount}
                            </Badge>
                        )}
                    </span>
                </PopoverTrigger>

                <PopoverContent
                    align="end"
                    className="w-64 p-3 shadow-lg"
                    sideOffset={5}
                >
                    <h4 className="font-semibold text-sm mb-2">Latest Items</h4>

                    {latestItems.length > 0 ? (
                        <ul className="space-y-2">
                            {latestItems.map(({ product }, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <img
                                        src={product.images[0].path}
                                        alt={product.name}
                                        className="w-10 h-10 rounded-md object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{product.name}</p>
                                        <p className="text-xs text-gray-500">₹{product.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">No items in cart</p>
                    )}

                    <div className="mt-3">
                        <Link
                            to="/cart"
                            className="text-sm text-purple-600 font-medium hover:underline"
                        >
                            View all items →
                        </Link>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Avatar + Menu */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>

                <Dropdown items={navItems} />
            </DropdownMenu>
        </div>
    )
}

export default CartPopover
