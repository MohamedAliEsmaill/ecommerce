import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user/user-service.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-accounts-overview',
  standalone: true,
  imports: [CommonModule],
  providers: [UserServiceService],
  templateUrl: './accounts-overview.component.html',
})
export class AccountsOverviewComponent implements OnInit {
  allUsers: any[] = [];
  displayedUsers: any[] = [];
  currentPage = 0;
  pageSize = 5;
  selectedUser: any = null;
  constructor(
    private accountService: UserServiceService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadUsers();
  }
  openDialog(user: any) {
    this.selectedUser = user; // Store selected user
    const dialogRef = this.dialog.open(UserFormComponent, {
      panelClass: 'mat-dialog-container-large',
      data: { user: this.selectedUser }, // Pass user data to dialog
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'User Profile Updated Successfully',
        });
        this.loadUsers(); // Reload users to reflect changes
      } else {
        this.loadUsers(); // Reload users to reflect changes
      }
    });
  }
  loadUsers(): void {
    this.accountService.getAllUsers().subscribe({
      next: (response: any) => {
        this.allUsers = response.data;
        // console.log('Total Users:', this.allUsers.length); // Check total users
        this.updateDisplayedProducts();
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  updateDisplayedProducts(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // console.log('Start Index:', startIndex);
    // console.log('End Index:', endIndex);
    this.displayedUsers = this.allUsers.slice(startIndex, endIndex);
    // console.log('Displayed Users:', this.displayedUsers.length); // Check displayed users
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.allUsers.length) {
      this.currentPage++;
      console.log('Next Page:', this.currentPage);
      this.updateDisplayedProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      console.log('Previous Page:', this.currentPage);
      this.updateDisplayedProducts();
    }
  }

  // totalPages(): number {
  //   return Math.ceil(this.allUsers.length / this.pageSize);
  // }
}
