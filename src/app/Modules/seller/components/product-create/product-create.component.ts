import { Component } from '@angular/core';
import { environment } from '../../../../../enviorenments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  baseUrl = environment.baseUrl
  productForm!: FormGroup
  token = localStorage.getItem('token')
  retailerOptions: string[] = ['Amazon', 'Flipkart'];
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      fulfillmentChannel: ['', Validators.required],
      createFor: ['', Validators.required],
      selectedStores: [[], Validators.required],
      storeSkuPairs: this.fb.array([])
    })
  }

  get storeSkuPairs(): FormArray {
    return this.productForm.get('storeSkuPairs') as FormArray;
  }
  onStoresChange(selectedStores: string[]) {
    this.storeSkuPairs.clear();

    selectedStores.forEach(store => {
      this.storeSkuPairs.push(
        this.fb.group({
          store: [store],
          sku: ['']
        })
      );
    });
  }
  createProduct() {
    const createFor = this.productForm.get('selectedStores')?.value.join(', ');

    const productData = {
      title: this.productForm.get('title')?.value,
      category: this.productForm.get('category')?.value,
      price: this.productForm.get('price')?.value,
      fulfillmentChannel: this.productForm.get('fulfillmentChannel')?.value,
      createFor: createFor,
      amazonQuantityAvailable: this.productForm.get('storeSkuPairs')?.value[0].sku,
      flipkartQuantityAvailable: this.productForm.get('storeSkuPairs')?.value[1].sku
    };
    this.http.post(
      `${this.baseUrl}/api/seller/new/product`,
      productData,
      { headers: { Authorization: this.token?.toString() ?? '' } }
    ).subscribe(
      (response) => {
        console.log('Product created successfully:', response);
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }
}
