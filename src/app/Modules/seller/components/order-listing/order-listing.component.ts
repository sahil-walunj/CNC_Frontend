import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../../enviorenments/environment';
@Component({
  selector: 'app-order-listing',
  standalone: false,
  templateUrl: './order-listing.component.html',
  styleUrl: './order-listing.component.css'
})
export class OrderListingComponent implements OnInit {
  baseUrl = environment.baseUrl
  ordersList: any
  productsList: any
  amazonList: any
  flipkartList: any
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.fetchOrders()
  }
  fetchOrders() {
    this.http.get(this.baseUrl + '/api/seller/orders').subscribe((res) => {

      this.ordersList = res
      console.log(this.ordersList);
      this.fetchProducts();
    })

  }
  fetchProducts() {
    this.http.get(this.baseUrl + '/api/seller/products').subscribe((res) => {
      console.log(res);
      this.productsList = res
      this.connectProductstoOrders();
    })

  }
  connectProductstoOrders() {


    let mapOfasintoProduct = new Map();
    let mapofFIdtoProduct = new Map();
    this.productsList.forEach((product: any) => {
      mapOfasintoProduct.set(product.amazonList?.ASIN, product.title);
      mapofFIdtoProduct.set(product.flipkartList?.flipkartId, product.title);
    });

    this.amazonList = this.ordersList[0].amazonOrders?.orders;
    this.flipkartList = this.ordersList[1].flipkartOrders?.orders;
    // console.log(this.amazonList);
    // console.log(this.flipkartList);
    this.amazonList.forEach((order: any) => {
      order.productTitle = mapOfasintoProduct.get(order.ProductASIN);
    })
    this.flipkartList.forEach((order: any) => {
      if (order.productTitle == undefined) {
        order.productTitle = mapofFIdtoProduct.get(order.ProductFlipkartId);
      }
    })
    console.log("amazonList",this.amazonList);
    console.log("flipkartList",this.flipkartList);
    for( let order in this.amazonList) {
      console.log(order);
    }
  }

}
