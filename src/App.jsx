import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./Pages/Login";
import { Layout } from "./Layout";
import { Homepage } from "./Pages/Dashboard";
import { MainCategory } from "./Pages/Category/MainCategory";
import { SubCategory } from "./Pages/Category/SubCategory";
import { SubSubCategory } from "./Pages/Category/SubSubCategory";
import { AddProduct } from "./Pages/AddProduct";
import { ProductData } from "./Pages/ProductData";
import { BannerSetup } from "./Pages/Banner/Banner";
import { TokenDashboard } from "./Pages/Token_Managment/TokenScreen";
import { CouponDashboard } from "./Pages/Coupen/Coupen";
import { BehaviorDisputes } from "./Pages/Behavior/Behavior";
import { TokenAccount } from "./Pages/Token_Managment/TokenAccount";
import { Siteinfo } from "./Pages/Settings/SIteInfo";
import { Role } from "./Pages/Settings/Rolemanagment";
import { Chossen } from "./Pages/Settings/Choose/Choose";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./Component/Route_Protect/Protected_Route";
import { VariantAttributeManager } from "./Pages/Attributes";
import Seller from "./Pages/team/Seller/Seller";
import User from "./Pages/team/User/User";
import { BrandSetup } from "./Pages/Brand/Brand";
import { OfferSetup } from "./Pages/Offer/Offer";
import { PaymentPage } from "./Pages/Payment/Payment";
import { PromoCode } from "./Pages/Promocode";
import { CancleOrderReason } from "./Pages/CancleOrderReason/CancleOrderReason";

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin/",
      children: [
        {
          index: true,
          element: <LoginForm />,
          //   element: <KamaiKart />,
        },
      ],
    },

    {
      path: "/admin",
      element: <ProtectedRoute />, // 👈 protect everything inside
      children: [
        {
          path: "Dashboard",
          element: <Layout />,
          children: [{ path: "home", element: <Homepage /> }],
        },
        {
          path: "Category",
          element: <Layout />,
          children: [
            { path: "Add/main", element: <MainCategory /> },
            { path: "Add/sub", element: <SubCategory /> },
            { path: "Add/subsub", element: <SubSubCategory /> },
          ],
        },
        {
          path: "Product",
          element: <Layout />,
          children: [
            { path: "Add", element: <AddProduct /> },
            { path: "View", element: <ProductData /> },
            // { path: "banner", element: <BannerPage /> },
          ],
        },
        {
          path: "Team",
          element: <Layout />,
          children: [
            { path: "team-list", element: <User /> },
            { path: "seller-list", element: <Seller /> },
          ],
        },
        {
          path: "Seller",
          element: <Layout />,
          children: [
            { path: "seller-list", element: <Seller /> },
            { path: "user-list", element: <User /> },
          ],
        },
        {
          path: "Token",
          element: <Layout />,
          children: [
            { path: "", element: <TokenDashboard /> },
            { path: "Account", element: <TokenAccount /> },
          ],
        },
        {
          path: "Coupen",
          element: <Layout />,
          children: [{ path: "", element: <CouponDashboard /> }],
        },
        {
          path: "Behave",
          element: <Layout />,
          children: [{ path: "", element: <BehaviorDisputes /> }],
        },
        {
          path: "Setting",
          element: <Layout />,
          children: [
            { path: "Info", element: <Siteinfo /> },
            { path: "Role", element: <Role /> },
            { path: "Choosen", element: <Chossen /> },
          ],
        },
        {
          path: "Attribute",
          element: <Layout />,
          children: [{ path: "", element: <VariantAttributeManager /> }],
        },
        {
          path: "Brand",
          element: <Layout />,
          children: [{ path: "", element: <BrandSetup /> }],
        },
        {
          path: "Banner",
          element: <Layout />,
          children: [{ path: "", element: <BannerSetup /> }],
        },
        {
          path: "Offer",
          element: <Layout />,
          children: [{ path: "", element: <OfferSetup /> }],
        },
        {
          path: "Payment",
          element: <Layout />,
          children: [{ path: "", element: <PaymentPage /> }],
        },
        {
          path: "Promocode",
          element: <Layout />,
          children: [{ path: "", element: <PromoCode /> }],
        },
        {
          path: "CancleOrderReason",
          element: <Layout />,
          children: [{ path: "", element: <CancleOrderReason /> }],
        },
      ],
    },
    // {
    //   path: "/admin/Dashboard",
    //   element: <Layout />,

    //   children: [
    //     {
    //       path: "home",
    //       element: <Homepage />,
    //     },
    //   ],
    // },

    // {
    //   path: "/admin/Category",
    //   element: <Layout />,
    //   children: [
    //     {
    //       path: "Add/main",
    //       element: <MainCategory />,
    //     },

    //     {
    //       path: "Add/sub",
    //       element: <SubCategory />,
    //     },

    //     {
    //       path: "Add/subsub",
    //       element: <SubSubCategory />,
    //     },
    //   ],
    // },

    // {
    //   path: "/admin/Product",
    //   element: <Layout />,

    //   children: [
    //     {
    //       path: "Add",
    //       element: <AddProduct />,
    //     },
    //     {
    //       path: "View",
    //       element: <ProductData />,
    //     },
    //     {
    //       path: "banner",
    //       element: <BannerPage />,
    //     },
    //   ],
    // },
    // {
    //   path: "/admin/Team",
    //   element: <Layout />,

    //   children: [
    //     {
    //       path: "team-list",
    //       element: <Team />,
    //     },
    //   ],
    // },
    // {
    //   path: "/admin/Token",
    //   element: <Layout />,

    //   children: [
    //     {
    //       path: "",
    //       element: <TokenDashboard />,
    //     },
    //     {
    //       path: "Account",
    //       element: <TokenAccount />,
    //     },
    //   ],
    // },

    // {
    //   path: "/admin/Coupen",
    //   element: <Layout />,

    //   children: [
    //     {
    //       path: "",
    //       element: <CouponDashboard />,
    //     },
    //   ],
    // },

    // {
    //   path: "/admin/Behave",
    //   element: <Layout />,

    //   children: [
    //     {
    //       path: "",
    //       element: <BehaviorDisputes />,
    //     },
    //   ],
    // },

    // {
    //   path: "/admin/Setting",
    //   element: <Layout />,

    //   children: [
    //     {
    //       path: "Info",
    //       element: <Siteinfo />,
    //     },
    //     {
    //       path: "Role",
    //       element: <Role />,
    //     },
    //     {
    //       path: "Choosen",
    //       element: <Chossen />,
    //     },
    //   ],
    // },
  ]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
