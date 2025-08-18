import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SellerRoutingModule } from './seller-routing.module'
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { QuantityChangeComponent } from './components/quantity-change/quantity-change.component';
import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { OrderListingComponent } from './components/order-listing/order-listing.component';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  declarations: [
    NavbarComponent,
    ProductListingComponent,
    ProductCreateComponent,
    QuantityChangeComponent,
    OrderListingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SellerRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    HttpClientModule
  ]
})
export class SellerModule { }
