import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserServiceService } from '../../services/user/user-service.service';
import { CountService } from '../../services/count/count.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule],
  providers: [UserServiceService],
  templateUrl: './product-card.component.html',
  styles: ``,
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  data: string = '';

  constructor(
    private userService: UserServiceService,
    private countService: CountService
  ) {}

  ngOnInit(): void {}

  addToCart() {

    this.userService.addCart(this.product._id).subscribe({
      next: (data) => {this.countService.setProduct();},
      error: (error) => console.error(error),
    });
  }
}
