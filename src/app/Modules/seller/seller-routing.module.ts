import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { OrderListingComponent } from './components/order-listing/order-listing.component';


const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: 'products', component: ProductListingComponent },
      {path : 'create', component: ProductCreateComponent},
      {path : 'orders', component: OrderListingComponent},
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SellerRoutingModule { }