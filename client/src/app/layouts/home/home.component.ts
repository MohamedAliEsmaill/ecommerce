import { Component, OnInit } from '@angular/core';
import Splide from '@splidejs/splide';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers:[HomeService],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent implements OnInit {
  featuredProducts: any;
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    let splide = new Splide('.splide', {
      type: 'loop',
      focus: 0,
      gap: '1rem',
      perPage: 4,
      breakpoints: {
        640: {
          perPage: 2,
        },
        480: {
          perPage: 1,
        },
      },
    });

    splide.mount();

    this.homeService.getData().subscribe((response) => {
      this.featuredProducts = response[0].products;
      console.log(this.featuredProducts);
    });
  }
}