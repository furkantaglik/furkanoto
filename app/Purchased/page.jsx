import PurchasedContainer from "@/container/PurchasedContainer";
import { getPurchasedCar, getUserId } from "@/lib/actions";

export default async function page() {
  const userId = await getUserId();
  const purchasedData = await getPurchasedCar(userId);
  return (
    <>
      <PurchasedContainer pursData={purchasedData} />
    </>
  );
}
