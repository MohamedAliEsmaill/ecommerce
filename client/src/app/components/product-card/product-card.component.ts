import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserServiceService } from '../../services/user/user-service.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule],
  providers: [UserServiceService],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(private userService: UserServiceService) { }

  addToCart() {
    console.log(this.product._id);
    this.userService.addCart(this.product._id).subscribe({
      next: (data) => { },
      error: (error) => console.error(error)
    });
  }

}
