import React, { useEffect, useState } from 'react';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  thumbnail: string;
  status: string;
  featured?: string;
  position: number;
  deleted: boolean;
  product_category_id?: string;
  slug: string;
  accountFullName?: string;
}

interface ApiResponse {
  pageTitle: string;
  products: Product[];
}

export const get = async (url: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
};

function ProductAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = 'http://localhost:5000/admin/products';

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: ApiResponse = await get(url);
        setProducts(data.products);
        setPageTitle(data.pageTitle);
      } catch (error) {
        console.log(error)
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{pageTitle}</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Discount: {product.discountPercentage}%</p>
            <p>Stock: {product.stock}</p>
            <p>Status: {product.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductAdmin;
