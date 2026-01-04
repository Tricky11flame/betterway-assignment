import { useMemo, useState } from "react";
// import { useParams } from "react-router";
import { searchProducts } from "../utils/searchProducts";
import { filterByCategory } from "../utils/filterProducts";
import { sortProducts } from "../utils/sortProducts";
import { useCart } from "../hooks/useCart";
import ProductCard from "../components/ProductCard";
import type { ProductMap } from "../models/productType";
import { useFetchProducts } from "../hooks/useFetch";
// import { navigate } from "react-router";
import { useNavigate } from "react-router";
const Home = () => {
  // const { productId } = useParams<{ productId: string }>(); 
  const navigate = useNavigate();
  const { 
    products: products, // Renaming products to INITIAL_DATA
    loading: loading,
    error: error 
  }: { 
    products: ProductMap; 
    loading: boolean; 
    error: string | null 
  } = useFetchProducts();
  // const [products] = useState(INITIAL_DATA); 
  const [filters, setFilters] = useState({ search: "", category: "All", sort: "asc" });
  const { cart, handleUpdate } = useCart();
  const visibleIds = useMemo(() => {
  let ids = Object.keys(products);
    ids = filterByCategory(ids, products, filters.category);
    ids = searchProducts(ids, products, filters.search);
    ids = sortProducts(ids, products, filters.sort === "asc");
    return ids;
  }, [products, filters]);

  // 1. Define constants and state
  const PRODUCTS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // 2. Calculate indices
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;

  // 3. Slice the filtered IDs
  const currentIds = visibleIds.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(visibleIds.length / PRODUCTS_PER_PAGE);

  // 4. Update the map function in JSX
  // Change visibleIds.map to currentIds.map

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }
  return (
  <main>
    <section className="controls">
      <input 
        type="text" 
        placeholder="Search products..." 
        value={filters.search}
        onChange={(e) => {
          setFilters(prev => ({ ...prev, search: e.target.value }));
          setCurrentPage(1); // Reset to page 1 on search
        }}
      />

      <select 
        value={filters.category}
        onChange={(e) => {
          setFilters(prev => ({ ...prev, category: e.target.value }));
          setCurrentPage(1); // Reset to page 1 on category change
        }}
      >
        <option value="All">All Categories</option>
        {/* Dynamic options */}
      </select>

      <button 
        className="sort-btn"
        onClick={() => setFilters(prev => ({ ...prev, sort: prev.sort === "asc" ? "desc" : "asc" }))}
      >
        Price: {filters.sort === "asc" ? "↑ Low to High" : "↓ High to Low"}
      </button>

      <div className="nav-brand" onClick={() => navigate("/")}>ShopMax</div>
      <button className="cart-btn" onClick={() => navigate("/cart")}>
        <span>🛒 Cart</span>
        {/* {cartCount > 0 && <span className="cart-badge">{cartCount}</span>} */}
      </button>
    </section>

    <div className="product-grid">
      {currentIds.map(id => (
        <ProductCard 
          key={id} 
          product={products[id]} 
          cartQty={cart[id] || 0}
          onUpdate={(delta) => handleUpdate(id, delta)} 
        />
      ))}
    </div>

    {totalPages > 1 && (
      <nav className="pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          &laquo;
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          &raquo;
        </button>
      </nav>
    )}
  </main>
);
};
export default Home;