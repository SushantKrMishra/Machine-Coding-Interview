import React, { useEffect, useState } from "react";
import "./styles.css";

const BASE_URL = "https://dummyjson.com/products/?limit=500";
const PAGE_SIZE = 10;

const ProductCard = ({ title, price, image }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <div>{title}</div>
      <div>{price}</div>
    </div>
  );
};

const PaginationView = ({
  totalNoPages,
  goToPage,
  goToNextPage,
  goToPrevPage,
  currentPage,
}) => {
  return (
    <div className="pagination-container">
      <button onClick={goToPrevPage} disabled={currentPage === 0}>
        ◀️
      </button>
      {[...Array(totalNoPages).keys()].map((i) => (
        <button
          onClick={() => goToPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      ))}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalNoPages - 1}
      >
        ▶️
      </button>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    try {
      const data = await fetch(BASE_URL);
      const json = await data.json();
      setProducts(json.products);
    } catch (e) {
      alert("Failed to fetch Data");
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalNoPages = Math.ceil(products.length / PAGE_SIZE);

  const goToPage = (index) => {
    setCurrentPage(index);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const start = currentPage * PAGE_SIZE;

  return (
    <>
      <PaginationView
        totalNoPages={totalNoPages}
        goToPage={goToPage}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        currentPage={currentPage}
      />
      <div className="App">
        {products.slice(start, start + PAGE_SIZE).map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.thumbnail}
          />
        ))}
      </div>
    </>
  );
}

export default App;
