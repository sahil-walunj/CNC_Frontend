import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../enviorenments/environment';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(this.baseUrl + '/api/seller/products', { headers: { Authorization: token } }).subscribe((res) => {
        console.log(res);
        this.productsList = res
        console.log(this.productsList);
      })
    } else {
      console.error('Token is null or undefined');
      // Handle the case where the token is null or undefined
    }
  }
}
