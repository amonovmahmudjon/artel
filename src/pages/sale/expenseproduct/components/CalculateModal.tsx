import { Modal, Input, Select, Button } from "antd";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { BsBackspaceFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import { useAppSelector } from "@/store/hooks";
import type { FormikProps } from "formik";
import { notifySuccess, notifyWarning } from "@/utils/utils";

interface CalculateModalProps {
  open: boolean;
  paymentSystemTypeId: 1 | 2 | 3 | null;
  onCancel: () => void;
  formik: FormikProps<any>;
}
interface SelectItem {
  id: number;
  name: string;
}

function CalculateModal({
  open,
  paymentSystemTypeId,
  onCancel,
  formik,
}: CalculateModalProps) {
  const [inputValue, setInputValue] = useState<string>("");
    const organizationId = useAppSelector(
    (item) => item.organization.selectedOrgId,
  );

  const { data: Currencyselect, isLoading: isCurrencyLoading } = useQuery<
    SelectItem[]
  >({
    queryKey: ["Currencyselect"],
    queryFn: async () => {
      const { data } = await api.get("manual/currencyselectlist");
      return data;
    },
  });
  const { data: bankselectlist, isLoading: isBankLoading } = useQuery<
    SelectItem[]
  >({
    queryKey: ["bankselectlist", organizationId],
    queryFn: async () => {
      const { data } = await api.get("manual/bankselectlist", {
        params: {
          organizationId: organizationId,
        },
      });
      return data;
    },
    enabled: Boolean(organizationId),
  });

 
  const currentPayment = (formik.values.payments || []).find(
    (p: any) => p.paymentSystemTypeId === paymentSystemTypeId
  ) || {};

  const selectedBankId = paymentSystemTypeId !== 2 ? currentPayment.bankId ?? null : null;
  const selectedCurrencyId = paymentSystemTypeId === 2 ? currentPayment.currencyId ?? 1 : 1;

  const handleBankChange = (val: number) => {
    const payments = [...(formik.values.payments || [])];
    const idx = payments.findIndex((p: any) => p.paymentSystemTypeId === paymentSystemTypeId);
    if (idx !== -1) {
      payments[idx] = { ...payments[idx], bankId: val };
    } else {
      payments.push({ paymentSystemTypeId, bankId: val });
    }
    formik.setFieldValue("payments", payments);
  };

  const handleCurrencyChange = (val: number) => {
    const payments = [...(formik.values.payments || [])];
    const idx = payments.findIndex((p: any) => p.paymentSystemTypeId === paymentSystemTypeId);
    if (idx !== -1) {
      payments[idx] = { ...payments[idx], currencyId: val };
    } else {
      payments.push({ paymentSystemTypeId, currencyId: val });
    }
    formik.setFieldValue("payments", payments);
  };

  React.useEffect(() => {
    setInputValue("");
  }, [open, paymentSystemTypeId]);

  const handleKeyClick = (key: string) => {
    if (key === "C") {
      setInputValue("");
    } else if (key === "delete") {
      setInputValue((value = "") =>
        value.length > 1 ? value.slice(0, value.length - 1) : "",
      );
    } else if (key === "000" || key === "00") {
      setInputValue((value = "") => (value === "0" ? value : value + key));
    } else {
      setInputValue((value = "") => (value === "0" ? value : value + key));
    }
  };

  const handleFinish = () => {
    const amount = Number(String(inputValue).replace(/\s/g, ""));
    if (isNaN(amount) || amount <= 0) {
      notifyWarning("Iltimos, to'g'ri summani kiriting!");
      return;
    }
    if (paymentSystemTypeId !== 2 && !selectedBankId) {
      notifyWarning("Iltimos bankni tanlang!");   
      return;
    }

    const paymentData = {
      paymentSystemTypeId: paymentSystemTypeId,
      amount: amount,
      currencyId: paymentSystemTypeId === 2 ? selectedCurrencyId : 1,
      bankId: paymentSystemTypeId === 2 ? null : selectedBankId,
      name:
        paymentSystemTypeId === 1
          ? "Ko'chirma"
          : paymentSystemTypeId === 2
            ? "Naqd"
            : "Terminal",
    };

    const payments = [...(formik.values.payments || [])];
    const idx = payments.findIndex((p: any) => p.paymentSystemTypeId === paymentSystemTypeId);
    if (idx !== -1) {
      payments[idx] = { ...payments[idx], ...paymentData };
    } else {
      payments.push(paymentData);
    }
    formik.setFieldValue("payments", payments);
    setInputValue("");
    onCancel();
    notifySuccess("To'lov qo'shildi");
    console.log(formik.values);
    
  };

  const getTitle = () => {
    switch (paymentSystemTypeId) {
      case 1:
        return "Ko'chirma";
      case 2:
        return "Naqd";
      case 3:
        return "Terminal";
      default:
        return "";
    }
  };
  const keys = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    ".",
    "delete",
    "000",
    "00",
    "C",
  ];

  return (
    <Modal
      title={getTitle()}
      open={open}
      onCancel={onCancel}
      footer={false}
      width={380}
    >
      <div>
        <div className="flex gap-5">
          <NumericFormat
            customInput={Input}
            size="large"
            placeholder={"Summani kiriting"}
            value={inputValue}
            thousandSeparator=" "
          />

          <Select
            style={{
              backgroundColor: "transparent",
              width: 90,
            }}
            loading={isCurrencyLoading}
            options={Currencyselect?.map((item: SelectItem) => ({
              label: item.name,
              value: item.id,
            }))}
            disabled={paymentSystemTypeId !== 2}
            onChange={handleCurrencyChange}
            value={selectedCurrencyId}
          />
        </div>
        {paymentSystemTypeId !== 2 && (
          <Select
            loading={isBankLoading}
            placeholder={"Bankni tanlang"}
            options={bankselectlist?.map((item: SelectItem) => ({
              label: item.name,
              value: item.id,
            }))}
            style={{ width: "100%", marginTop: "10px" }}
            size="large"
            onChange={handleBankChange}
            value={selectedBankId}
          />
        )}

        <div className="grid grid-cols-3 gap-2 pt-2">
          {keys.map((key) => (
            <div key={key}>
              <Button
                style={{
                  height: "50px",
                  width: "100%",
                  alignItems: "center",
                  fontSize: "15px",
                }}
                size="large"
                onClick={() => handleKeyClick(key)}
              >
                {key === "delete" ? (
                  <BsBackspaceFill className="text-blue-600 " />
                ) : (
                  key
                )}
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button
            key="submit"
            block /*To'liq kenglik uchun*/
            size="large"
            color="blue"
            variant="solid"
            onClick={() => handleFinish()}
          >
            Yakunlash
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default CalculateModal;
