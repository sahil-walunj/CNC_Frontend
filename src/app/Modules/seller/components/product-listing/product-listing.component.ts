import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../enviorenments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { QuantityChangeComponent } from '../quantity-change/quantity-change.component';


@Component({
  selector: 'app-product-listing',
  standalone: false,
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.css'
})
export class ProductListingComponent implements OnInit {
  productsList: any
  baseUrl = environment.baseUrl
  token = localStorage.getItem('token')
  constructor(private http: HttpClient, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.fetchProducts()
  }
  fetchProducts() {
    this.http.get(this.baseUrl + '/api/seller/products').subscribe((res) => {
      console.log(res);
      this.productsList = res
      console.log(this.productsList);
    })
  }
  editProduct(product: any) {
    localStorage.setItem('editProduct', JSON.stringify(product));
    const dialogRef = this.dialog.open(QuantityChangeComponent, {
      data: product,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.fetchProducts();
    });
  }

}
