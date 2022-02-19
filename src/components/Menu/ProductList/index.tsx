import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IProduct, useOrder } from "../../../contexts/OrderContext";
import ProductItem from "./ProductItem";
import Logo from '../../../assets/logo.png'
import './style.css'
import { CategoryService } from "../../../services/category";

const ProductList = ({ category }: { category: number }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const order = useOrder();

  useEffect(() => {
    setProducts([]);
    setLoading(true);
    (async () => {
      // await (new Promise((resolve, reject) => {
      //   setTimeout(resolve, 1500);
      // }))
      const response = await CategoryService.getProductByCategory(category)
      // [
      //   {
      //     id: 1,
      //     name: 'Product X',
      //     image_url: "https://api.lorem.space/image/burger?w=250&h=250",
      //     price: 45.45,
      //     category_id: 1
      //   },
      //   {
      //     id: 1,
      //     name: 'Product Y',
      //     image_url: "https://api.lorem.space/image/burger?w=250&h=250",
      //     price: 445.565,
      //     category_id: 2
      //   }
      // ]
      setProducts([...response.products])
      setLoading(false)
    })();
  }, [category])


  if (loading) {
    return <div className="loading" >
      <div className="flex">
        <div className="animate-bounce">
          <img src={Logo} width={100} alt="carregando"/>
        </div>
      </div>
    </div>
  }

  return <>
    <div className="ml-24 md:ml-40 overflow-y-auto flex-1 grid xl:grid-cols-4 md:grid-cols-4 p-8 gap-4">
      {products.map((product) => {
        return <ProductItem key={product.id} product={product} />
      })}
    </div>
  </>
}

export default ProductList;