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
const routes: RouteObject[] = [
    {
        path:"/",
        element: <AuthLayout/>,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
              path: "login",
              element: <Login />
            }         
        ]   
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
              element: <AroundStore />
            },
            {
              path: "analitika",
              element: <Analitika />
            },
            
          ]
            },
            {
              path: "warehouse",
              children: [
                {
                  path: "store-house",
                  element: <StoreHouse />
                },
                  {
                  path: "product",
                  children:[
                    {
                      index:true,
                      element: <Product />
                    },
                    {
                      path: "add",
                      element: <ProductAddEdit />
                    },
                    {
                      path: "edit/:id",
                      element: <ProductAddEdit />
                    }
                  ]
                }
              ]
            },
            {
              path: "finance",
              children: [
                {
                  path: "payment-clients",
                  element: <PaymentClient />
                }
              ]
            },
            {
              path: "sale",
              children: [
                {
                  path: "expense-product",
                  element: <ExpenseProduct />
                }
              ]
            }
      ]
    }
]

export const router = createBrowserRouter(routes, {
  future: {
    unstable_passThroughRequests:true
  },
})
