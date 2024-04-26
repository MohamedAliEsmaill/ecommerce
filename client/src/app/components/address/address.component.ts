import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent {
  street: string = '';
  city: string = '';
  zip: string = '';

  @Output() streetChange = new EventEmitter<string>();
  @Output() cityChange = new EventEmitter<string>();
  @Output() zipChange = new EventEmitter<string>();

  setStreet(event: any) {
    this.street = event.target.value;
    this.streetChange.emit(event.target.value);
  }

  setCity(event: any) {
    this.city = event.target.value;
    this.cityChange.emit(event.target.value);
  }

  setZip(event: any) {
    this.zip = event.target.value;
    this.zipChange.emit(event.target.value);
  }
}
