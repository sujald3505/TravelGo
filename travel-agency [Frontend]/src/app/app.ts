import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('travel-agency');

  private router = inject(Router);

  isAdminRoute = false;

  constructor() {
    // Check current route
    this.isAdminRoute = this.router.url.startsWith('/admin');

    // Check whenever route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigation = event as NavigationEnd;

        this.isAdminRoute = navigation.urlAfterRedirects.startsWith('/admin');
      });
  }
}
