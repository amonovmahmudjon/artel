import api from "@/api/axiosInstance";
import { BarcodeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { type ClientTableDataType } from "@/interface/interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDisableOrganization } from "@/store/features/disabledOrganizationSlice";
import { useSearchParams } from "react-router-dom";
import { numberSpacing } from "@/utils/utils";
import { notifySuccess, notifyWarning } from "@/utils/utils";
import SaleTable from "@/pages/sale/expenseproduct/tables/SaleTable";
import { type SaleTableData } from "@/interface/interface";
import useLocalStorage from "@/hooks/useLocaleStorage";
import SalePayment from "@/pages/sale/expenseproduct/add/SalePayment";

function SaleProductAdd() {
  const organizationId = useAppSelector(
    (state) => state.organization.selectedOrgId,
  );
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [tableData, setTableData] = useLocalStorage<any[]>("tableDate", []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [serchParams, setSearchParams] = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["ClientData", organizationId, searchValue],
    queryFn: async () => {
      const { data } = await api.get<ClientTableDataType>(
        `warehouse/searchproducttableinstore`,
        {
          params: {
            organizationId: organizationId,
            searchValue: searchValue,
          },
        },
      );
      return data;
    },
    enabled: !!searchValue,
  });
  useEffect(() => {
    dispatch(setDisableOrganization(true));
    return () => {
      dispatch(setDisableOrganization(false));
    };
  }, []);
  function handleAddProduct(prev: SaleTableData) {
    console.log(prev);

    const findProduct = tableData.find((product) => product.id === prev.id);
    if (!findProduct) {
      setTableData((current) => [...current, { ...prev }]);
      notifySuccess("Mahsulot savatga qo'shildi");
      console.log(prev);
    } else {
      notifyWarning("Mahsulot allaqachon qo'shilgan");
    }
  }
  function Deleted(item: any) {
    const deletedProduct = tableData.filter(
      (prev) => Number(item) !== Number(prev.id),
    );
    setTableData(deletedProduct);
  }
  useEffect(() => {
    const currentParams = new URLSearchParams(serchParams);
    if (organizationId) {
      currentParams.set("organizationId", organizationId.toString());
    }
    if (searchValue) {
      currentParams.set("searchValue", searchValue);
    } else {
      currentParams.delete("searchValue");
    }
    setSearchParams(currentParams, { replace: true });
  }, [organizationId, searchValue]);

  return (
    <div className="flex gap-4 h-[calc(100vh-80px)]">
      <div className="w-[65%] overflow-hidden relative bg-card-base h-full rounded-3xl py-5 bg-white shadow-sm">
        <div className="px-5">
          <div className="flex justify-between items-center">
            <h1 className="text-color-base text-lg font-semibold m-0">Sotuv</h1>
            <div>
              <Button icon={<BarcodeOutlined />} />
            </div>
          </div>

          <div className="relative w-full mt-6">
            <Input
              size="large"
              value={searchValue}
              onFocus={() => setIsDropdownOpen(true)}
              onChange={(e) => setSearchValue(e.target.value)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 400)}
              placeholder="Mahsulot nomi yoki barkod"
            />

            <div
              className="w-full max-h-80 overflow-y-auto top-[calc(100%+5px)] z-30 absolute bg-white border border-gray-200 shadow-lg "
              hidden={!isDropdownOpen}
            >
              {!searchValue ? (
                <div className="p-4 text-center text-ms text-gray-400">
                  Natija topilmadi
                </div>
              ) : isLoading ? (
                <div className="p-4 text-center text-ms text-gray-500">
                  Yuklanmoqda...
                </div>
              ) : data?.results && data.results.length > 0 ? (
                data?.results.map((item) => (
                  <div
                    className="hover:bg-blue-50 cursor-pointer transition-all justify-between rounded-lg"
                    key={item.id}
                    onClick={() => {
                      handleAddProduct(item);
                    }}
                    style={{
                      backgroundColor: tableData.some((p) => p.id === item.id)
                        ? "#ceebfd"
                        : "white",
                    }}
                  >
                    <div className="flex justify-between items-center border-b border-gray-100 px-2 py-2 space-y-1 rounded-md">
                      <div>
                        <h1 className="text-sm text-color-base font-semibold">
                          {item.name}
                        </h1>
                        <p className="text-xs text-color-base text-gray-400">
                          {item.serialNumber}
                        </p>
                      </div>

                      <div className="text-ms text-color-base">
                        {numberSpacing(item.salePrice)} UZS
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-ms text-gray-500">
                  Ma'lumot topilmadi
                </div>
              )}
            </div>
          </div>
          <div className="mt-10">
            <SaleTable dataSource={tableData} onDelete={Deleted} />
          </div>
        </div>
      </div>
      <SalePayment />
    </div>
  );
}

export default SaleProductAdd;
