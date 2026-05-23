import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Login from "@/pages/login/Login";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import Analitika from "@/pages/dashboard/analitika/Analitika";
import AroundStore from "@/pages/dashboard/around store/AroundStore";
import StoreHouse from "@/pages/warehouse/storehouse/StoreHouse";
import PaymentClient from "@/pages/finance/paymentclients/PaymentClient";
import ExpenseProduct from "@/pages/sale/expenseproduct/ExpenseProduct";
import Product from "@/pages/warehouse/product/Product";
import ProductAddEdit from "@/pages/warehouse/product/ProductAddEdit/ProductAddEdit";
import ClientView from "@/pages/finance/paymentclients/view/ClientView";
import InfoClient from "@/pages/finance/paymentclients/view/InfoClient";
import PaymentHistory from "@/pages/finance/paymentclients/view/PaymentHistory";
import Payment from "@/pages/finance/paymentclients/view/Payment";
import ReturnPayment from "@/pages/finance/paymentclients/view/ReturnPayment";
import ViewList from "@/pages/sale/expenseproduct/viewlist/ViewList";
import SaleClientAdd from "@/pages/sale/expenseproduct/add/SaleProductAdd";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/mainlayout",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        children: [
          {
            path: "around-store",
            element: <AroundStore />,
          },
          {
            path: "analitika",
            element: <Analitika />,
          },
        ],
      },
      {
        path: "warehouse",
        children: [
          {
            path: "store-house",
            element: <StoreHouse />,
          },
          {
            path: "product",
            children: [
              {
                index: true,
                element: <Product />,
              },
              {
                path: "add",
                element: <ProductAddEdit />,
              },
              {
                path: "edit/:id",
                element: <ProductAddEdit />,
              },
            ],
          },
        ],
      },
      {
        path: "finance",
        children: [
          {
            path: "payment-clients",
            children: [
              {
                index: true,
                element: <PaymentClient />,
              },
              {
                path: ":id/:fullName",
                element: <ClientView />,
                children: [
                  {
                    path: "infoclient",
                    element: <InfoClient />,
                  },
                  {
                    path: "payment-history",
                    element: <PaymentHistory />
                  },
                   {
                    path: "payment",
                    element: <Payment />
                  },
                   {
                    path: "return-payment",
                    element: <ReturnPayment />
                  }
                ],
              },
            ],
          },
        ],
      },
      {
        path: "sale",
        children: [
          {
            path: "expense-product",
            children:[
              {
                index: true,
                element:<ExpenseProduct />
              },
              {
                path: ":id/view-list",
                element:<ViewList/>
              },
              {
                path: "add-client",
                element:<SaleClientAdd/>
              }
            ]
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  future: {
    unstable_passThroughRequests: true,
  },
});
