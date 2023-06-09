import React, { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { IProduct, SProduct } from "../../lib/types/products";
import SubmenuCategory from "./SubmenuCategory";
import Card from "../UI/card/Card";
import Breadcrumb from "../UI/Breadcrumb";
import Sort from "./Sort";
import { useDispatch, useSelector } from "react-redux";
import { SortedProductsListActions } from "../../store/sortedProductList-slice";
import { useRouter } from "next/router";
import { IProductListRootState } from "../../lib/types/productList";

interface Props {
  productList: SProduct[];
}
const ProductList: React.FC<Props> = ({ productList }) => {
  const router = useRouter();
  const { t } = useLanguage();
  // let isInNewestProductsPage =
  //   router.pathname === "/newestProducts" ? true : false;

  // const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>("all");
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     SortedProductsListActions.sortProductsList({
  //       productsList: productList,
  //       sortBasedOn: selectedRadioBtn,
  //     })
  //   );
  // }, [dispatch, productList, selectedRadioBtn]);

  // const sortedProductList = useSelector(
  //   (state: IProductListRootState) => state.sortedProductsList.productsList
  // );

  // function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
  //   setSelectedRadioBtn(e.currentTarget.id);
  // }

  return (
    <div>
      {/* <Breadcrumb /> */}
      <SubmenuCategory />
      <div className="w-full xl:max-w-[2100px] mx-auto">
        <Sort />
        {productList && productList.length ? (
          <div>
            <div className="grid gap-4 md:gap-2 grid-cols-6 md:grid-cols-12">
              {productList.map((product: any, index) => {
                return <Card key={`index-${index}`} product={product} />;
              })}
            </div>
          </div>
        ) : (
          <p className="text-palette-mute text-center mt-8">{t.noProduct}</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
