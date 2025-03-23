import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import axios from "axios";

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/foods")
      .then(response => setFoodItems(response.data))
      .catch(error => console.error("Error fetching food items:", error));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Food Delivery</h1>
        <div className="relative">
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {cart.length}
          </span>
        </div>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {foodItems.map((item) => (
          <Card key={item._id} className="p-2 shadow-md">
            <CardContent className="flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <h2 className="mt-2 font-semibold">{item.name}</h2>
              <p className="text-gray-500">${item.price}</p>
              <Button onClick={() => addToCart(item)} className="mt-2">Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 