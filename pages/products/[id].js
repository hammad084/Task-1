import { useRouter } from 'next/router';

const ProductDetail = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ width: '200px', height: 'auto' }}
        />
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-700">${product.price}</p>
        <p className="mt-4">{product.description}</p>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() }, 
  }));

  return { paths, fallback: true }; 
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}

export default ProductDetail;