// Sidebar.js
import { Box, IconButton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, Inventory } from "@mui/icons-material";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import StyleIcon from "@mui/icons-material/Style";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternate";
//import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import { SidebarSection } from "./SideBarSelection";
import { LogoContainer, SidebarContainer } from "./SidebarContainer";
import { COLORS } from "./SidebarContainer";

export const Sidebar = ({
  isCollapsed,
  onToggleCollapse,
  isMobile = false,
}) => {
  const DashBoard = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin/Dashboard/home",
    },
  ];

  const Product = [
    {
      name: "Banner",
      icon: <AddPhotoIcon />,
      path: "/admin/banner",
    },
    {
      name: "Offer",
      icon: <AddPhotoIcon />,
      path: "/admin/Offer",
    },
    {
      name: "Brand",
      icon: <StyleIcon />,
      path: "/admin/brand",
    },
    {
      name: "Category",
      path: "/admin/Category",
      icon: <CategoryIcon />,
      children: [
        {
          name: " Category",
          icon: <CategoryIcon />,
          path: "/admin/Category/Add/main",
        },
        {
          name: "Sub Category",
          icon: <CategoryIcon />,
          path: "/admin/category/Add/sub",
        },
        {
          name: "Child Category",
          icon: <CategoryIcon />,
          path: "/admin/category/Add/subsub",
        },
      ],
    },
    {
      name: "Attribute",
      icon: "➕",
      path: "/admin/Attribute",
    },
    // {
    //   name: "Product",
    //   icon: "🛠️",
    //   path: "/admin/Product",

    //   children: [
    //     {
    //       name: "See Product",
    //       icon: <ListIcon />,
    //       path: "/admin/Product/View",
    //     },
    //     { name: "Add Product", icon: <AddIcon />, path: "/admin/Product/Add" },
    //   ],
    // },
  ];

  const accountMenuItems = [
    {
      name: "Team",
      path: "/admin/seller",
      icon: "👤",

      children: [
        {
          name: "Seller List",
          icon: <ListIcon />,
          path: "/admin/seller/seller-list",
        },
        {
          name: "User List",
          icon: <ListIcon />,
          path: "/admin/team/team-list",
        },
      ],
    },
  ];

  const Payment = [
    { name: "PaymentType List", icon: "👤", path: "/admin/Payment" },
    { name: "Promocode List", icon: "👤", path: "/admin/Promocode" },
    {
      name: "CancleOrderReason List",
      icon: "👤",
      path: "/admin/CancleOrderReason",
    },
    {
      name: "SortOption List",
      icon: "👤",
      path: "/admin/SortOption",
    },
  ];

  const Setting = [
    { name: "Site Information", icon: "👤", path: "/admin/Setting/Info" },
    { name: "Site Chossen", icon: "🛠️", path: "/admin/Setting/Choosen" },
  ];

  return (
    <SidebarContainer isCollapsed={isCollapsed} isMobile={isMobile}>
      {/* Header with logo and toggle */}
      <Box>
        <LogoContainer>
          {!isCollapsed && (
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Inventory sx={{ color: COLORS.textPrimary, mr: 1 }} />
              <Typography
                variant="h6"
                sx={{ color: COLORS.textPrimary, fontWeight: "bold" }}
              >
                KAMAIKART
              </Typography>
            </Box>
          )}
          {!isMobile && (
            <IconButton
              onClick={onToggleCollapse}
              sx={{ color: COLORS.textPrimary }}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          )}
        </LogoContainer>
      </Box>

      {/* Navigation sections */}
      <Box component="nav">
        <SidebarSection
          title="DASHBOARD"
          items={DashBoard}
          isCollapsed={isCollapsed}
        />

        <SidebarSection
          title="PRODUCT MANAGEMENT"
          items={Product}
          isCollapsed={isCollapsed}
        />

        <SidebarSection
          title="E-COMMERCE MANAGEMENT"
          items={accountMenuItems}
          isCollapsed={isCollapsed}
        />
        <SidebarSection
          title="PAYMENT"
          items={Payment}
          isCollapsed={isCollapsed}
        />

        <SidebarSection
          title="ACCOUNT"
          items={Setting}
          isCollapsed={isCollapsed}
        />
      </Box>

      {/* Footer with version info */}
      {!isCollapsed && (
        <Box
          sx={{
            p: 2,
            mt: "auto",
            borderTop: `1px solid ${COLORS.border}`,
            color: COLORS.textSecondary,
            fontSize: "0.75rem",
            textAlign: "center",
          }}
        >
          Admin Portal
        </Box>
      )}
    </SidebarContainer>
  );
};

// import { Box, IconButton, Typography, Drawer } from "@mui/material";
// import { ChevronLeft, ChevronRight, Inventory } from "@mui/icons-material";

// Icons
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import CategoryIcon from "@mui/icons-material/Category";
// import StyleIcon from "@mui/icons-material/Style";
// import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternate";
// import ListIcon from "@mui/icons-material/List";
// import PeopleIcon from "@mui/icons-material/People";
// import SettingsIcon from "@mui/icons-material/Settings";

// import { SidebarSection } from "./SideBarSelection";
// import { LogoContainer, SidebarContainer, COLORS } from "./SidebarContainer";

// export const Sidebar = ({
//   isCollapsed,
//   onToggleCollapse,
//   isMobile = false,
//   mobileOpen = false,
//   onMobileClose = () => {},
// }) => {
//   const DashBoard = [
//     {
//       name: "Dashboard",
//       icon: <DashboardIcon sx={{ fontSize: 20 }} />,
//       path: "/admin/home",
//     },
//   ];

//   const Product = [
//     {
//       name: "Banner",
//       icon: <AddPhotoIcon sx={{ fontSize: 20 }} />,
//       path: "/admin/banner",
//     },
//     {
//       name: "Brand",
//       icon: <StyleIcon sx={{ fontSize: 20 }} />,
//       path: "/admin/brand",
//     },
//     {
//       name: "Category",
//       path: "/admin/category",
//       icon: <CategoryIcon sx={{ fontSize: 20 }} />,
//       children: [
//         {
//           name: "Main Category",
//           icon: <ChevronRight sx={{ fontSize: 16 }} />,
//           path: "/admin/Category/Add/main",
//         },
//         {
//           name: "Sub Category",
//           icon: <ChevronRight sx={{ fontSize: 16 }} />,
//           path: "/admin/Category/Add/sub",
//         },
//         {
//           name: "Child Category",
//           icon: <ChevronRight sx={{ fontSize: 16 }} />,
//           path: "/admin/Category/Add/subsub",
//         },
//       ],
//     },
//     {
//       name: "Attribute",
//       icon: <span style={{ fontSize: 20 }}>➕</span>,
//       path: "/admin/attribute",
//     },
//   ];

//   const accountMenuItems = [
//     {
//       name: "Team",
//       path: "/admin/team",
//       icon: <PeopleIcon sx={{ fontSize: 20 }} />,
//       children: [
//         {
//           name: "Seller List",
//           icon: <ChevronRight sx={{ fontSize: 16 }} />,
//           path: "/admin/seller/seller-list",
//         },
//         {
//           name: "Users List",
//           icon: <ChevronRight sx={{ fontSize: 16 }} />,
//           path: "/admin/seller/user-list",
//         },
//       ],
//     },
//   ];

//   const Setting = [
//     {
//       name: "Site Information",
//       icon: <SettingsIcon sx={{ fontSize: 20 }} />,
//       path: "/admin/Setting/Info",
//     },
//     {
//       name: "Site Choices",
//       icon: <SettingsIcon sx={{ fontSize: 20 }} />,
//       path: "/admin/Setting/Choosen",
//     },
//   ];

//   const sidebarContent = (
//     <SidebarContainer isCollapsed={isCollapsed} isMobile={isMobile}>
//       {/* Header with logo and toggle */}
//       <Box>
//         <LogoContainer>
//           {!isCollapsed && (
//             <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
//               <Inventory sx={{ color: COLORS.primary, mr: 1 }} />
//               <Typography
//                 variant="h6"
//                 sx={{
//                   color: COLORS.primary,
//                   fontWeight: "bold",
//                   background: "linear-gradient(45deg, #344767, #1A73E8)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 KAMAIKART
//               </Typography>
//             </Box>
//           )}
//           {!isMobile && (
//             <IconButton
//               onClick={onToggleCollapse}
//               sx={{
//                 color: COLORS.textSecondary,
//                 "&:hover": {
//                   backgroundColor: COLORS.hoverBg,
//                 },
//               }}
//               size="small"
//             >
//               {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
//             </IconButton>
//           )}
//         </LogoContainer>
//       </Box>

//       {/* Navigation sections */}
//       <Box component="nav" sx={{ mt: 2, flex: 1, overflowY: "auto" }}>
//         <SidebarSection title="" items={DashBoard} isCollapsed={isCollapsed} />

//         <SidebarSection
//           title="PRODUCT MANAGEMENT"
//           items={Product}
//           isCollapsed={isCollapsed}
//         />

//         <SidebarSection
//           title="TEAM MANAGEMENT"
//           items={accountMenuItems}
//           isCollapsed={isCollapsed}
//         />

//         <SidebarSection
//           title="SETTINGS"
//           items={Setting}
//           isCollapsed={isCollapsed}
//         />
//       </Box>

//       {/* Footer with version info */}
//       {!isCollapsed && (
//         <Box
//           sx={{
//             p: 2,
//             borderTop: `1px solid ${COLORS.border}`,
//             color: COLORS.textSecondary,
//             fontSize: "0.75rem",
//             textAlign: "center",
//           }}
//         >
//           Seller Portal v1.0
//         </Box>
//       )}
//     </SidebarContainer>
//   );

//   if (isMobile) {
//     return (
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={onMobileClose}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           display: { xs: "block", lg: "none" },
//           "& .MuiDrawer-paper": {
//             boxSizing: "border-box",
//             width: 256,
//             boxShadow:
//               "0 10px 20px -10px rgba(0,0,0,0.2), 0 4px 6px -2px rgba(0,0,0,0.1)",
//           },
//         }}
//       >
//         {/* Always expanded version for mobile */}
//         <SidebarContainer isCollapsed={false} isMobile={true}>
//           {sidebarContent.props.children}
//         </SidebarContainer>
//       </Drawer>
//     );
//   }

//   return sidebarContent;
// };
