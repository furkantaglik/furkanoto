import HighForm from "@/components/admin/HighForm";
import { getAllHighlights } from "@/lib/actions";

export const metadata = {
  title: "Admin Sayfası",
};

const AdminPage = async () => {
  const highData = await getAllHighlights();
  return (
    <>
      <HighForm highData={highData} />
      {/* <div className="h-screen flex justify-center items-center">
        <h1>Doğrulanıyor Lütfen Bekleyin...</h1>
      </div> */}
    </>
  );
};

export default AdminPage;
