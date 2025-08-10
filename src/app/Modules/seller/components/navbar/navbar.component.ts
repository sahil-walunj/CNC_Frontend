import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: true }) drawer!: MatSidenav;

  private destroy$ = new Subject<void>();

  currentUser = { username: 'John Doe' };
  companyName = 'VendorHub';
  sidebarOpened = true;

  showNotifications = false;
  notifications = [
    { id: 1, type: 'order', message: 'New order received from Amazon store', time: '2h ago' },
    { id: 2, type: 'product', message: 'Low stock alert for Product XYZ', time: '4h ago' },
    { id: 3, type: 'sync', message: 'Shopify sync completed successfully', time: '1d ago' }
  ];

  expandedSections = {
    orders: false
  };

  constructor(private cdr: ChangeDetectorRef, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    // Initialize sidebar as opened
    this.sidebarOpened = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  clearNotifications(): void {
    this.notifications = [];
    this.showNotifications = false;
  }

  toggleSection(section: string): void {
    this.expandedSections = {
      ...this.expandedSections,
      [section]: !this.expandedSections[section as keyof typeof this.expandedSections]
    };
  }

  logOut(): void {
    this.auth.logout();
    this.router.navigate(['']);
  }

  navigateToProfile(): void {
    // Implement navigation to profile
    console.log('Navigate to profile');
  }

  navigateToSettings(): void {
    // Implement navigation to settings
    console.log('Navigate to settings');
  }
}
