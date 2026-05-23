

export function numberSpacing(item: number) {
  return item
    ? item.toString().includes(".")
      ? item
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      : item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : 0;
}

export function customPhoneNumber(number: string) {
  if (!number) return "";
  const digits = number.replace(/\D/g, "");
  return digits.replace(
    /^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2}).*$/,
    "+$1 $2 $3 $4 $5",
  );
}

export function DateFormat(item: any) {
  return dayjs(item).format("DD.MM.YYYY, HH:mm")
}

import { notification } from "antd";
import dayjs from "dayjs";
import { string } from "yup";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const openNotification = (
  type: NotificationType,
  title: string,
  description?: string
) => {
  notification[type]({
    title: title,
    description: description,
    placement: 'topRight',
    duration: 2, 
  });
};

export const notifySuccess = (msg: string, desc?: string) => openNotification('success', msg, desc);
export const notifyError = (msg: string, desc?: string) => openNotification('error', msg, desc);
export const notifyWarning = (msg: string, desc?: string) => openNotification('warning', msg, desc);
