import { Segmented } from "antd";
import { Link, useLocation } from "react-router";
import { Outlet } from "react-router";
import { Card } from "antd";

function ClientView() {
  const location = useLocation();
  const activeTab = location.pathname.split("/").pop();

  return (
    <>
      <div className="mb-3">
        <Card >
          <Segmented<string>
            options={[
              {
                value: "info",
                label: <Link to="infoclient">Ma'lumot</Link>,
              },
              {
                value: "payment-history",
                label: <Link to="payment-history">To'lov tarixi</Link>,
              },
              {
                value: "payment",
                label: <Link to="payment">To'lov</Link>,
              },
              {
                value: "returnpayment",
                label: <Link to="return-payment">Qaytim</Link>,
              },
            ]}
            value={activeTab}
          />
        </Card>
      </div>
        <Outlet />
    </> 
  );
}
export default ClientView;
