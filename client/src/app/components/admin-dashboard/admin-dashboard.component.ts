import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  // styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
  }
}
