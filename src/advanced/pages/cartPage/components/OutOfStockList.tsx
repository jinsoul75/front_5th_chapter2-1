import { Product } from '../../../types';

export default function OutOfStockList({ products }: { products: Product[] }) {
  const outOfStockProducts = products.filter((product) => product.stock === 0);

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2">
      {outOfStockProducts.map((product) => (
        <div key={product.id}>{`${product.name}: 품절`}</div>
      ))}
    </div>
  );
}
