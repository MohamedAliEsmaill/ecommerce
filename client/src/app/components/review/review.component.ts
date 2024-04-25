import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user/user-service.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  public cart: any = [];

  ngOnInit(): void {
    this.cart = this.userService.getCart().subscribe({
      next: (data: any) => {
        this.cart = data.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  constructor(private userService: UserServiceService) {}
}
