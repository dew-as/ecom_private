import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";

export default async function ProductDetails({ params }) {
  const ProductDetailsData = await productById(params.details);

  console.log(ProductDetailsData);

  return <CommonDetails item={ProductDetailsData && ProductDetailsData.data}/>;
}