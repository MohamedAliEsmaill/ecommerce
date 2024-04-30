import { Component, OnInit } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    let splide = new Splide(".splide", {
      type: "loop",
      focus: 0,
      gap: "1rem",
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
  }

}
