import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Address = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/checkout", { state: { address, totalAmount: location.state.totalAmount } });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Shipping Address
                </h2>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={address.fullName}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded-lg"
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={address.phone}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded-lg"
                    required
                />

                <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={address.street}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded-lg"
                    required
                />

                <div className="flex gap-2">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={address.city}
                        onChange={handleChange}
                        className="w-1/2 mb-3 p-2 border rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={address.state}
                        onChange={handleChange}
                        className="w-1/2 mb-3 p-2 border rounded-lg"
                        required
                    />
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={address.postalCode}
                        onChange={handleChange}
                        className="w-1/2 mb-3 p-2 border rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={address.country}
                        onChange={handleChange}
                        className="w-1/2 mb-3 p-2 border rounded-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Continue to Payment
                </button>
            </form>
        </div>
    );
};

export default Address;
