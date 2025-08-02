import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from '../app/Modules/auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('../app/Modules/auth/auth.module').then(x => x.AuthModule) },
  { path: 'seller', loadChildren: () => import('../app/Modules/seller/seller.module').then(x => x.SellerModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
