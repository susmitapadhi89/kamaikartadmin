import { configureStore } from "@reduxjs/toolkit";
import { RoleService } from "../Features/RoleServicesSlice";
import { AuthService } from "../Features/AuthenticationServicesSlice";
import { WhychooseServices } from "../Features/WhyChooseServicesSlice";
import { CategoryServices } from "../Features/CategoryServicesSlice";
import { AttributeServices } from "../Features/AttributeServicesSlice";
import { BannerServices } from "../Features/BannerServicesSlice";
import { BrandServices } from "../Features/BrandServicesSlice";
import { SellerServices } from "../Features/SellerServicesSlice";
import { UserServices } from "../Features/UserServicesSlice";
import { SiteConfigurationSerivces } from "../Features/SiteConfigurationSlice";
import { OfferServices } from "../Features/OfferServicesSlice";
import { PaymentServices } from "../Features/PaymentServicesSlice";
import { PromoCodeServices } from "../Features/PromoServicesSlice";
import { CancelOrderReasonServices } from "../Features/CancleOrderReasonServicesSlice";
import { sortOptionServices } from "../Features/SortOptionServicesSlice";

export const Store = configureStore({
  reducer: {
    RoleOpration: RoleService.reducer,
    AuthOpration: AuthService.reducer,
    WhychooseOpration: WhychooseServices.reducer,
    CategoryOpration: CategoryServices.reducer,
    AttributeOpration: AttributeServices.reducer,
    BannerOperation: BannerServices.reducer,
    OfferOperation: OfferServices.reducer,
    BrandOperation: BrandServices.reducer,
    SellerOperation: SellerServices.reducer,
    UserOperation: UserServices.reducer,
    SiteConfigurationOpraion: SiteConfigurationSerivces.reducer,
    PaymentOperation: PaymentServices.reducer,
    PromoCodeOperation: PromoCodeServices.reducer,
    CancelOrderReasonOpration: CancelOrderReasonServices.reducer,
    sortOptionOperation: sortOptionServices.reducer,
  },
});
