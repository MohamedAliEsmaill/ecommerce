import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css',
})
export class DeliveryComponent {
  @Output() isChecked: EventEmitter<any> = new EventEmitter();
}
