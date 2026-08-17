import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../../core/services/user';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsersComponent
  implements OnInit {

  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  users: User[] = [];
  filteredUsers: User[] = [];

  searchText = '';

  isLoading = false;

  errorMessage = '';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        console.log('Admin Users:', data);

        this.users = data;
        this.filteredUsers = data;

        this.isLoading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(
          'Users Load Error:',
          error
        );

        this.isLoading = false;

        this.errorMessage =
          'Unable to load users.';

        this.cdr.detectChanges();
      },
    });
  }

  searchUsers(): void {
    const search =
      this.searchText
        .trim()
        .toLowerCase();

    if (!search) {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers =
      this.users.filter((user) => {

        const fullName =
          `${user.firstName} ${user.lastName}`
            .toLowerCase();

        return (
          fullName.includes(search) ||
          user.email
            .toLowerCase()
            .includes(search) ||
          user.phoneNumber
            .toLowerCase()
            .includes(search) ||
          user.roleName
            .toLowerCase()
            .includes(search)
        );
      });
  }

  clearSearch(): void {
    this.searchText = '';
    this.filteredUsers = this.users;
  }

  toggleStatus(user: User): void {
    const updatedStatus =
      !user.isActive;

    const updateData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isActive: updatedStatus,
    };

    this.userService
      .updateUser(
        user.id,
        updateData
      )
      .subscribe({
        next: (updatedUser) => {

          user.isActive =
            updatedUser.isActive;

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(
            'Status Update Error:',
            error
          );
        },
      });
  }

  

  deleteUser(user: User): void {

    const confirmed =
      confirm(
        `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
      );

    if (!confirmed)
      return;

    this.userService
      .deleteUser(user.id)
      .subscribe({
        next: () => {

          this.users =
            this.users.filter(
              u => u.id !== user.id
            );

          this.filteredUsers =
            this.filteredUsers.filter(
              u => u.id !== user.id
            );

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(
            'Delete User Error:',
            error
          );
        },
      });
  }
}