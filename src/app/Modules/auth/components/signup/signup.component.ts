// signup.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../enviorenments/environment';
@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  basicInfoForm: FormGroup;
  platformForm: FormGroup;

  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.basicInfoForm = new FormGroup({});
    this.platformForm = new FormGroup({});
    this.initializeForms();
  }

  ngOnInit(): void {
    // Initialize component
  }

  private initializeForms() {
    // Basic Information Form
    this.basicInfoForm = this.fb.group({
      sellerName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    // Platform Integration Form with acceptTerms included
    this.platformForm = this.fb.group({
      enableAmazon: [false],
      AmazonApiKey: [''],
      AmazonSecretKey: [''],
      enableFlipkart: [false],
      FlipkartApiKey: [''],
      FlipkartSecretKey: [''],
      acceptTerms: [false, Validators.requiredTrue] // Move acceptTerms here
    });

    // Add conditional validators for platform keys
    this.setupConditionalValidators();
  }

  private setupConditionalValidators() {
    // Amazon validators - only validate if enabled
    this.platformForm.get('enableAmazon')?.valueChanges.subscribe(enabled => {
      const amazonApiKey = this.platformForm.get('AmazonApiKey');
      const amazonSecretKey = this.platformForm.get('AmazonSecretKey');

      if (enabled) {
        amazonApiKey?.setValidators([Validators.required]);
        amazonSecretKey?.setValidators([Validators.required]);
      } else {
        amazonApiKey?.clearValidators();
        amazonSecretKey?.clearValidators();
        amazonApiKey?.setValue(''); // Clear value when disabled
        amazonSecretKey?.setValue(''); // Clear value when disabled
      }

      amazonApiKey?.updateValueAndValidity();
      amazonSecretKey?.updateValueAndValidity();
    });

    // Flipkart validators - only validate if enabled
    this.platformForm.get('enableFlipkart')?.valueChanges.subscribe(enabled => {
      const flipkartApiKey = this.platformForm.get('FlipkartApiKey');
      const flipkartSecretKey = this.platformForm.get('FlipkartSecretKey');

      if (enabled) {
        flipkartApiKey?.setValidators([Validators.required]);
        flipkartSecretKey?.setValidators([Validators.required]);
      } else {
        flipkartApiKey?.clearValidators();
        flipkartSecretKey?.clearValidators();
        flipkartApiKey?.setValue(''); // Clear value when disabled
        flipkartSecretKey?.setValue(''); // Clear value when disabled
      }

      flipkartApiKey?.updateValueAndValidity();
      flipkartSecretKey?.updateValueAndValidity();
    });
  }

  // Custom validator for password matching
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  // Get connected platforms for summary
  getConnectedPlatforms(): string {
    const platforms = [];
    if (this.platformForm.get('enableAmazon')?.value) {
      platforms.push('Amazon');
    }
    if (this.platformForm.get('enableFlipkart')?.value) {
      platforms.push('Flipkart');
    }
    return platforms.length > 0 ? platforms.join(', ') : 'None selected';
  }

  // Check if platform step is valid (excluding acceptTerms)
  isPlatformStepValid(): boolean {
    const enableAmazon = this.platformForm.get('enableAmazon')?.value;
    const enableFlipkart = this.platformForm.get('enableFlipkart')?.value;

    let amazonValid = true;
    let flipkartValid = true;

    if (enableAmazon) {
      amazonValid = this.platformForm.get('AmazonApiKey')?.valid === true &&
        this.platformForm.get('AmazonSecretKey')?.valid === true;
    }

    if (enableFlipkart) {
      flipkartValid = this.platformForm.get('FlipkartApiKey')?.valid === true &&
        this.platformForm.get('FlipkartSecretKey')?.valid === true;
    }

    return amazonValid && flipkartValid;
  }

  // Check if all forms are valid
  isFormValid(): boolean {
    return this.basicInfoForm.valid &&
      this.platformForm.valid;
  }

  // Handle form submission
  onSubmit() {
    if (this.isFormValid()) {
      this.isLoading = true;

      // Combine all form data
      const signupData = {
        ...this.basicInfoForm.value,
        ...this.platformForm.value
      };
      let url = environment.baseUrl + '/api/signup/new-seller';
      this.http.post(url, signupData).subscribe(
        (response) => {
          console.log('Signup successful:', response);
          this.isLoading = false;
          this.navigateToLogin();
        },
        (error) => {
          console.error('Signup failed:', error);
          this.isLoading = false;
        }
      )
    }
  }

  // Navigate to login page
  navigateToLogin() {
    this.router.navigate(['']);
  }

  // Mark all forms as touched to show validation errors
  private markAllFormsAsTouched() {
    this.basicInfoForm.markAllAsTouched();
    this.platformForm.markAllAsTouched();
  }

  // Helper methods for template
  get basicInfo() {
    return this.basicInfoForm.controls;
  }

  get platform() {
    return this.platformForm.controls;
  }
}