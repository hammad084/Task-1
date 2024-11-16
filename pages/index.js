import Link from 'next/link';

const HomePage = ({ products }) => {
  return (
    <>
      <div>
        <h1>Products</h1>

        <div className="product-container">
          {products.map((product) => {
            return (
              <div className="product-card" key={product.id}>
                <Link href={`/products/${product.id}`}>
                  <img
                    className='product-image'
                    src={product.image}
                    alt={product.title}
                  />
                  <p>${product.title}</p>
                  <p className="text-gray-700">${product.price}</p>
                </Link>
              </div>
            );
          })}
        </div>

        <style jsx>{`
          .product-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between; 
            padding: 1rem; 
          }

          .product-card {
            flex: 0 1 calc(33.33% - 1rem); 
            margin-bottom: 1rem; 
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
            padding: 1rem; 
            border: 1px solid #eaeaea; 
            border-radius: 4px; 
          }

          .product-image {
            width: 100%;
            height: auto; 
          }
        `}</style>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}

export default HomePage;