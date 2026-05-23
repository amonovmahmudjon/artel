import ClientSearch from "@/components/filters/Search/Input";
import ChoosedDate from "@/components/filters/Date/ChoosedDate";
import PaymentClientTable from "@/pages/finance/paymentclients/components/PaymentClientTable";

function PaymentClient() {
  return (
    <div>
      <div className="flex gap-5 bg-white p-4 rounded-xl border border-gray-100 mb-3">
        <ChoosedDate />
        <ClientSearch />
      </div>
      <PaymentClientTable />
    </div>
  );
}
export default PaymentClient;
