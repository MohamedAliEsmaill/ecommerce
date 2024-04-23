import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  styles: ``
})
export class CatalogComponent {

}
