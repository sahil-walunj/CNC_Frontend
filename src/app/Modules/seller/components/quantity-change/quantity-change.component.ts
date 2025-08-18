import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../enviorenments/environment';
@Component({
  selector: 'app-quantity-change',
  standalone: false,
  templateUrl: './quantity-change.component.html',
  styleUrl: './quantity-change.component.css'
})
export class QuantityChangeComponent implements OnInit {
  myForm: FormGroup;

  baseUrl = environment.baseUrl
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<QuantityChangeComponent>,
    private http: HttpClient
  ) {
    this.myForm = this.fb.group({
      flipkartId: ['', Validators.required],
      asin: ['', [Validators.required]],
      flipkartQuantity: ['', [Validators.required]],
      amazonQuantity: ['', [Validators.required]],
      tochangeQuantity: ['Amazon & Flipkart', [Validators.required]]
    });
  }

  ngOnInit() {
    const product = JSON.parse(localStorage.getItem('editProduct') || '{}');
    let flipkartId = product.flipkartList?.flipkartId || '';
    let asin = product.amazonList?.ASIN || '';
    let flipkartQuantity = product.flipkartList?.quantityAvailable || '';
    let amazonQuantity = product.amazonList?.QuantityAvailable || '';

    this.myForm.patchValue({
      flipkartId: flipkartId,
      asin: asin,
      flipkartQuantity: flipkartQuantity,
      amazonQuantity: amazonQuantity
    });
  }

  submitForm() {
    this.http.post(this.baseUrl + '/api/seller/quantityChange', this.myForm.value).subscribe(
      response => {
        console.log('Product created successfully:', response);
        this.dialogRef.close();
      }
      ,
      error => {
        console.error('Error creating product:', error);
      }
    )
  }

  closePopup() {
    this.dialogRef.close();
  }
}
