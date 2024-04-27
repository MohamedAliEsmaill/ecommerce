import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserServiceService } from '../../services/user/user-service.service';
import Swal from 'sweetalert2';


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
    if (!this.product.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There is no enough quantity in the stock!',
      });
      return;
    }
    this.userService.addCart(this.product._id).subscribe({
      next: (data) => { },
      error: (error) => console.error(error)
    });
    Swal.fire({
      icon: 'success',
      title: 'Great!',
      text: 'Product Added To Your Cart Successfully'
    })
  }

}
