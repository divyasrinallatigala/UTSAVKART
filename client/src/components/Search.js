// src/components/Search.js
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar, FaFilter } from "react-icons/fa";
import "./Search.css";

// Mock product data - replace with API calls
const mockProducts = [
  // Diwali Items
  { id: 1, name: "Diwali Diyas Set", price: 299, image: "🪔", category: "diwali", rating: 4.5, description: "Traditional clay diyas for Diwali celebration", festival: "hindu" },
  { id: 2, name: "LED String Lights", price: 599, image: "💡", category: "diwali", rating: 4.2, description: "Colorful LED lights for decoration", festival: "hindu" },
  { id: 3, name: "Rangoli Stencils", price: 199, image: "🎨", category: "diwali", rating: 4.3, description: "Beautiful rangoli making stencils", festival: "hindu" },
  { id: 4, name: "Diwali Gift Hamper", price: 1299, image: "🎁", category: "diwali", rating: 4.7, description: "Premium Diwali gift collection", festival: "hindu" },
  
  // Eid Items
  { id: 5, name: "Eid Lanterns", price: 799, image: "🏮", category: "eid", rating: 4.4, description: "Beautiful lanterns for Eid decoration", festival: "muslim" },
  { id: 6, name: "Prayer Mat", price: 499, image: "🕌", category: "eid", rating: 4.6, description: "High quality prayer mat", festival: "muslim" },
  { id: 7, name: "Dates Gift Box", price: 699, image: "🌴", category: "eid", rating: 4.5, description: "Premium dates collection", festival: "muslim" },
  
  // Christmas Items
  { id: 8, name: "Christmas Tree", price: 1999, image: "🎄", category: "christmas", rating: 4.8, description: "Artificial Christmas tree with lights", festival: "christian" },
  { id: 9, name: "Christmas Ornaments", price: 899, image: "🎄", category: "christmas", rating: 4.3, description: "Set of beautiful Christmas decorations", festival: "christian" },
  { id: 10, name: "Santa Costume", price: 1499, image: "🎅", category: "christmas", rating: 4.1, description: "Complete Santa Claus costume", festival: "christian" },
  
  // Birthday Items
  { id: 11, name: "Birthday Balloon Set", price: 199, image: "🎈", category: "birthday", rating: 4.2, description: "Colorful birthday balloons", festival: "birthday" },
  { id: 12, name: "Party Hats", price: 149, image: "🎩", category: "birthday", rating: 4.0, description: "Fun party hats for celebration", festival: "birthday" },
  { id: 13, name: "Birthday Cake Candles", price: 99, image: "🕯️", category: "birthday", rating: 4.4, description: "Number candles for birthday cake", festival: "birthday" },
  
  // Wedding Items
  { id: 14, name: "Wedding Garland", price: 599, image: "🌸", category: "wedding", rating: 4.6, description: "Fresh flower garland for wedding", festival: "wedding" },
  { id: 15, name: "Mandap Decorations", price: 2999, image: "🏛️", category: "wedding", rating: 4.7, description: "Complete mandap decoration set", festival: "wedding" },
  { id: 16, name: "Wedding Lights", price: 1299, image: "✨", category: "wedding", rating: 4.5, description: "Elegant lighting for wedding venue", festival: "wedding" },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "diwali", label: "Diwali" },
    { value: "eid", label: "Eid" },
    { value: "christmas", label: "Christmas" },
    { value: "birthday", label: "Birthday" },
    { value: "wedding", label: "Wedding" },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);

    // Get search query from URL
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }

    // Load wishlist and cart from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setWishlist(savedWishlist);
    setCart(savedCart);
  }, [searchParams]);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory, sortBy, priceRange]);

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    let newWishlist;
    
    if (isInWishlist) {
      newWishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      newWishlist = [...wishlist, product];
    }
    
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  if (loading) {
    return (
      <div className="search-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Search Products</h2>
        {searchQuery && (
          <p>Showing results for: "<strong>{searchQuery}</strong>"</p>
        )}
      </div>

      <div className="search-filters">
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-filter"
          />
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="price-range"
          />
        </div>
      </div>

      <div className="search-results">
        <div className="results-header">
          <h3>Products ({filteredProducts.length})</h3>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <span className="product-emoji">{product.image}</span>
                <button
                  className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <FaHeart />
                </button>
              </div>

              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-description">{product.description}</p>
                
                <div className="product-rating">
                  <FaStar className="star-icon" />
                  <span>{product.rating}</span>
                </div>

                <div className="product-price">
                  <span className="price">₹{product.price}</span>
                </div>

                <button
                  className={`add-to-cart-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                  onClick={() => addToCart(product)}
                >
                  <FaShoppingCart />
                  {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search criteria or browse our categories.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;