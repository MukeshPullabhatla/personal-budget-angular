import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [{
          data:[],
          backgroundColor: [
          'Blue',
          'Red',
          'Yellow',
          'green',
          'orange',
          'black',
          'purple',
          'grey',
          'white'

          ]
      }],
  labels: []
};



  constructor(private http: HttpClient) {}
  ngOnInit(): void {

     this.http.get('http://localhost:3000/budget')
      // tslint:disable-next-line: align
      .subscribe((res: any) => {
        console.log(res);
        for(let i = 0; i < res.myBudget.length; i++){
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
          this.createChart();
        }
      });

}
// tslint:disable-next-line: typedef
createChart(){
  const ctx = document.getElementById('myChart');
  const myChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
  });
}
}
