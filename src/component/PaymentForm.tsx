import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  images?: string[];
}

interface PaymentFormProps {
  total: number;
  onClose: () => void;
  onSuccess: () => void;
  user: { username: string; email: string };
  address: string;
  country: string;
  phone: string;
  items: CartItem[];
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  total,
  onClose,
  address,
  country,
  phone,
  items,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) throw new Error("User not logged in");

      const parsedUser = JSON.parse(savedUser);

      const orderData = {
        userId: parsedUser._id,
        items: items.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.discountPrice,
        })),
        totalAmount: total,
        paymentMethod: "cash",
        shippingAddress: {
          address,
          country,
          phone,
        },
      };

      const res = await fetch("https://deploy-backend-production-f769.up.railway.app/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      alert("Payment successful! Order placed.");
      localStorage.removeItem("cart");
      onClose();
      navigate("/product");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
      </button>
    </div>
  );
};
