import { OrderService } from './../../services/order/order.service';
import { Component, Input } from '@angular/core';
import { AddressComponent } from '../../components/address/address.component';
import { DeliveryComponent } from '../../components/delivery/delivery.component';
import { PaymentComponent } from '../../components/payment/payment.component';
import { ReviewComponent } from '../../components/review/review.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { UserServiceService } from '../../services/user/user-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CountService } from '../../services/count/count.service';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [
    CommonModule,
    AddressComponent,
    DeliveryComponent,
    PaymentComponent,
    ReviewComponent,
    FormsModule,
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
  providers: [UserServiceService],
})
export class CheckOutComponent {
  currentStep = 1;
  cart: any[] = [];
  order: {
    products: { [key: string]: number };
    totalPrice: number;
    address: { street: string; city: string; zip: string };
    date: Date;
    status: 'pending' | 'accepted' | 'rejected';
  };

  street: string = '';
  city: string = '';
  zip: string = '';
  cardNumber: string = '';
  cardHolder: string = '';
  expirationDate: string = '';
  cvv: string = '';
  isCheck: boolean = false;

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private orderService: OrderService,
    private countService: CountService
  ) {
    this.order = {
      products: {},
      totalPrice: 0,
      address: { street: '', city: '', zip: '' },
      date: new Date(),
      status: 'pending',
    };
  }

  ngOnInit() {
    this.userService.getCart().subscribe({
      next: (products) => {
        console.log(products);

        this.cart = products.data;
        this.order.products = this.cart.reduce(
          (acc: { [key: string]: number }, product: any) => {
            acc[product._id] = product.count;
            return acc;
          },
          {}
        );

        this.order.totalPrice = this.cart.reduce(
          (acc: number, product: Product) => acc + product.price,
          0
        );

        console.log(this.cart, this.order);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  nextStep() {
    if (this.currentStep <= 4) {
      if (
        this.currentStep === 1 &&
        (this.street === '' || this.city === '' || this.zip === '')
      ) {
        return;
      }

      if (this.currentStep === 2 && !this.isCheck) {
        return;
      }

      if (
        this.currentStep === 3 &&
        (this.cardNumber === '' ||
          this.cardHolder === '' ||
          this.expirationDate === '' ||
          this.cvv === '')
      ) {
        console.log(
          this.cardNumber,
          this.cardHolder,
          this.expirationDate,
          this.cvv
        );

        return;
      }

      this.currentStep++;
    }

    if (this.currentStep === 5) {
      this.order.address = {
        street: this.street,
        city: this.city,
        zip: this.zip,
      };

      this.orderService.createOrder(this.order).subscribe({
        next: () => {
          console.log('Order created successfully');
          Swal.fire({
            icon: 'success',
            title: 'Great!',
            text: 'Product Added To Your Cart Successfully'
          }).then(() => this.router.navigate(['/profile/history']))
          this.countService.setProduct();

        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {

        },
      });
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  setStreet(street: string) {
    this.street = street;
  }

  setCity(city: string) {
    this.city = city;
  }

  setZip(zip: string) {
    this.zip = zip;
  }

  setCardNumber(cardNumber: string) {
    this.cardNumber = cardNumber;
  }

  setCardHolder(cardHolder: string) {
    this.cardHolder = cardHolder;
  }

  setExpirationDate(expirationDate: string) {
    this.expirationDate = expirationDate;
  }

  setCvv(cvv: string) {
    this.cvv = cvv;
  }

  setIsCheck(isCheck: boolean) {
    this.isCheck = isCheck;
  }
}
