import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  hidePassword = true;
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Check if user is already logged in
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/seller']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const { email, password } = this.form.value;

      this.auth.login(email, password)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (success: boolean) => {
            this.isLoading = false;
            if (success) {
              this.router.navigate(['/seller']);
            } else {
              this.showError('Invalid email or password. Please try again.');
            }
          },
          error: (error) => {
            this.isLoading = false;
            this.showError('Login failed. Please try again.');
            console.error('Login error:', error);
          }
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  private showError(message: string) {
    // You can replace this with a proper toast/snackbar service
    alert(message);
  }

  loginWithGoogle() {
    // Implement Google OAuth login
    console.log('Google login initiated');
  }
}