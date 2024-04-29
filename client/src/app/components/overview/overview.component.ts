import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [BaseChartDirective],
  providers: [ProfileService],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  users: any[] = [];
  labels: string[] = [];
  data: number[] = [];

  // user overview
  UserChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to adjust its aspect ratio
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          color: '#4B5563', // Customize axis title color
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'User Count',
          color: '#4B5563', // Customize axis title color
        },
      },
    },
  };

  UserChartData: ChartData<'line'> = {
    labels: this.labels,
    datasets: [
      {
        data: this.data,
        label: 'User Count',
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Set a transparent background color
        borderColor: 'rgba(75, 192, 192, 1)', // Set a solid border color
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Set the background color of data points
        pointBorderColor: '#fff', // Set the border color of data points
        pointHoverBackgroundColor: '#fff', // Set the hover background color of data points
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)', // Set the hover border color of data points
      },
    ],
  };

  getUsersCharts() {
    this.profileService.getUsersCharts().subscribe((data: any) => {
      this.users = data.data;
      this.labels = this.users.map((user) => user.date);
      this.data = this.users.map((user) => user.count);
      this.UserChartData = {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            label: 'User registered',
            backgroundColor: 'rgba(251, 191, 36, 0.2)', // 20% opacity
            borderColor: '#FBBF24',
            pointBackgroundColor: '#FBBF24',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#FBBF24',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
          },
        ],
      };
    });
  }

  // -------------------------------------------------------------------------
  // orders overview
  orders = [
    { count: 2, status: 'Reject' },
    { count: 4, status: 'Accept' },
    { count: 5, status: 'Pending' },
  ];

  OrderChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to stretch to fill the space
    plugins: {
      legend: {
        position: 'right', // Position the legend on the right side
        labels: {
          usePointStyle: true, // Use circles instead of rectangles for legend markers
          pointStyle: 'circle', // Set the point style to circle
          boxWidth: 10, // Width of the colored boxes
          padding: 10, // Padding between labels
          font: {
            size: 12, // Font size for labels
          },
        },
      },
    },
  };

  // Extract counts and statuses from the data array
  countsOrders = this.orders.map((item) => item.count);
  statusOrders = this.orders.map((item) => item.status);
  OrdersChartData = {
    labels: this.statusOrders,
    datasets: [
      {
        data: this.countsOrders,
        label: 'Orders',
        backgroundColor: ['#FF0000', '#28A745', '#FFCE56'], // Optional: colors for each segment
      },
    ],
  };

  // -------------------------------------------------------------------------------------
  products = [
    { count: 2, brand: 'Fornighte' },
    { count: 4, brand: 'Call of SOFA' },
    { count: 5, brand: 'APEX' },
    { count: 10, brand: 'OLAX' },
  ];

  productChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
  };

  // Extract counts and statuses from the data array
  countsProducts = this.products.map((item) => item.count);
  brandProducts = this.products.map((item) => item.brand);
  ProductsChartData = {
    labels: this.brandProducts, // Array of brand names
    datasets: [
      {
        data: this.countsProducts, // Array of counts
        label: 'Products',
        backgroundColor: ['#7047EE',  '#0D6EFD' ,'#00BAFF' ,'#28AD9B'], // Colors for each segment
      },
    ],
  };

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getUsersCharts();
  }
}
