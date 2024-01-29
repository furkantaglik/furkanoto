import PurchasedContainer from "@/container/PurchasedContainer";
import { getPurchasedCar, getUser } from "@/lib/actions";

export default async function page() {
  const user = await getUser();
  const purchasedData = await getPurchasedCar(user.id);
  return (
    <>
      <PurchasedContainer pursData={purchasedData} />
    </>
  );
}
