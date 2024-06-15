import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '@bluebits/products';
import { Chart } from 'angular-highcharts';
import { ordersService } from '@bluebits/orders';
import { Module } from '../../allModasl/ImportedModes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [...Module],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  pieChartlineChart?: Chart;
  ordersCahrt?: Chart;
  categoriesCapacity: any = [];
  ordersOrigin: any = [];
  constructor(
    private categoriesService: CategoriesService,
    private ordersServices: ordersService
  ) {}
  ngOnInit(): void {
    this.categoriesService.numberOfProductsInCategory().subscribe((obs) => {
      this.categoriesCapacity = obs;
      console.log(obs, 'from the cat capacity');
      const { data } = this.categoriesCapacity;

      return (this.pieChartlineChart = new Chart({
        chart: {
          type: 'pie',
          backgroundColor: 'transparent',
          borderWidth: 0,
        },

        title: { text: 'Products per Category' },
        xAxis: {
          categories: [],
        },

        yAxis: {
          title: {
            text: 'All sold products',
          },
        },
        credits: { enabled: false },
        series: [
          {
            size: '80%',
            innerSize: '75%',

            name: 'products',
            type: 'pie',
            data: data.map((el: any) => {
              return [el.name, el.count];
            }),
          },
        ],
      }));
    });
    this.ordersServices.ordersPerCountry().subscribe((obs) => {
      this.ordersOrigin = obs;
      const { data } = this.ordersOrigin;

      return (this.ordersCahrt = new Chart({
        chart: {
          type: 'pie',
          backgroundColor: 'transparent',
          borderWidth: 0,
        },

        title: { text: 'Orders per Country' },
        xAxis: {
          categories: [],
        },

        yAxis: {
          title: {
            text: 'All sold products',
          },
        },
        colors: ['#731702', '#F27405', '#014040'],
        series: [
          {
            size: '80%',
            innerSize: '75%',

            name: 'Orders',
            type: 'pie',
            data: data.map((el: any) => {
              return [el._id, el.count];
            }),
          },
        ],
        credits: { enabled: false },
      }));
    });
  }
}
