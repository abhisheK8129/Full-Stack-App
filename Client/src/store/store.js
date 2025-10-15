import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../store/auth-slice'
import adminProductsSlice from '../store/admin/Product-Slice'
import shoppingProductSlice from '../store/Shopping/Products-Slice'
import shoppingCartSlice from '../store/Shopping/Cart-Slice'
import addressSlice from '../store/Shopping/Address-Slice'
import shoppingOrderSlice from '../store/Shopping/Order-Slice'
import adminOrderSlice  from '../store/admin/Order-slice'
import searchProductSlice from '../store/Shopping/Search-Slice'
import productReviewSlice from '../store/Shopping/Review-Slice'
import commonFeatureSlice from '../store/Common-Feature-Slice'



const store = configureStore({
    reducer: {
        authenticationSlice: authSlice,
        adminSlice: adminProductsSlice,
        adminOrder: adminOrderSlice,
        shopSlice: shoppingProductSlice,        
        cartSlice: shoppingCartSlice,
        shoppingAddressSlice: addressSlice,
        shopOrder: shoppingOrderSlice,
        searchSlice: searchProductSlice,
        shopReview: productReviewSlice,
        features: commonFeatureSlice,
    },
    
})


export default  store