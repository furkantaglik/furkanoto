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
    </>
  );
};

export default AdminPage;
