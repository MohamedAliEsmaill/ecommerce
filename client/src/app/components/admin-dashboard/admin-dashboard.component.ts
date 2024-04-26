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
  chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [400, 450, 600, 550, 700],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
}
