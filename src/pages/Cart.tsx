import { useState } from "react";
import type { ProductId, ProductMap } from "../models/productType";
function Cart() {
    // State structure
    const [products, setProducts] = useState<ProductMap>({
    "101": { productName: "Laptop", price: 1200, category: "Electronics", stock: 5, addedToCart: 0 },
    "102": { productName: "Desk Chair", price: 150, category: "Furniture", stock: 10, addedToCart: 0 }
    });

    const [visibleIds, setVisibleIds] = useState<ProductId[]>(["101", "102"]);
  return (
    <div>Cart is this </div>
  )
}

export default Cart