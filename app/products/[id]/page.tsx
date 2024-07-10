import Modals from "@/components/Modals";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { id: string };
};
const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) redirect("/");

  const similarProducts = await getSimilarProducts(id);

  return (
    <div className="product-container ">
      <div className="flex gap-28 xl:flex-row flex-col ">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            height={100}
            width={680}
            
            className="mx-auto "
          />
        </div>

        <div className="flex-1 flex flex-col ">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold ">
                {product.title}
              </p>

              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50 "
              >
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  height={20}
                  width={20}
                />

                <p className="text-base font-semibold text-[#D46F77]  ">
                  {product.reviewsCount}
                </p>
              </div>

              <div className="p-2 bg-white-200 rounded-10 cursor-pointer">
                <Image
                  src="/assets/icons/bookmark.svg"
                  width={20}
                  height={20}
                  alt="bookmark"
                />
              </div>

              <div className="p-2 bg-white-200 rounded-10 cursor-pointer">
                <Image
                  src="/assets/icons/share.svg"
                  width={20}
                  height={20}
                  alt="share"
                />
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-secondary text-[20px] font-bold ">
                {product.currency}
                {formatNumber(product.currentPrice)}
              </p>

              <p className="text-secondary text-[15px] opacity-50 line-through ">
                {product.currency}
                {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || "20"}
                  </p>
                </div>

                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    height={16}
                    width={16}
                  />

                  <p className="text-sm text-secondary font-semibold">
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div>

              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold  ">93%</span>{" "}
                of buyers have recommended this.
              </p>
            </div>
          </div>

          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
              />

              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
              />

              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
              />

              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
              />
            </div>
          </div>

          <Modals productId={id} />

          <div className="flex flex-col gap-16 ">
            <div className="flex flex-col gap-5 ">
              <h3 className=" text-2xl font-semibold text-secondary pt-6">
                Product Details
              </h3>

              <div className=" flex flex-col gap-4  ">
                {product?.description?.split("/n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line.split(" ").slice(0, 150).join(" ")}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>

            <button className=" btn w-fit mx-auto flex item-center justify-center min-w-[200px] gap-3">
              <Image
                src="/assets/icons/bag.svg"
                alt="cart-bag"
                height={22}
                width={22}
              />

              <Link href="/" className="text-base text-white">
                Buy Now
              </Link>
            </button>
          </div>

         
        </div>


      
      </div>

      <div className="flex justify-center items-center text-center">
 {similarProducts && similarProducts?.length > 0 && (
            <div className="py-4 flex md:flex-col flow-row w-full ">
              <p className=" section-text">Similar Products</p>

              <div
                className="flex flex-col md:flex-row  gap-10
                mt-7 max-w-[15rem]  items-center"
              >
                {similarProducts.map((product) => (
                  <div className="">
                    <ProductCard key={product._id} product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default ProductDetails;
