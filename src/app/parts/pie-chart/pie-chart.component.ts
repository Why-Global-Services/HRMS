import { Component, Input, OnInit, input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
@Component({
  selector: 'pie-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: any;
  @Input ('datas')Chartdata:any={
    present:0,
    absent:0,
    Cl:0,
    Sl:0,
    Wo:0
  }

 constructor(){
  
 }
  ngOnInit(): void {
    if(this.Chartdata){
       this.loadchart()
      console.log(this.Chartdata)

    }
    
   
  }
 loadchart(){
  this.chartOptions =  {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Over All Attendance '
    },
    tooltip: {
        valueSuffix: '%'
    },
    // subtitle: {
    //     text:
    //     'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
    // },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: "Present",
                    y : this.Chartdata.present ,
                    color:"#22C55E"
                },
                {
                    name: 'Absent',
                    // sliced: true,
                    // selected: true,
                    color:"#F87171",
                    y : this.Chartdata.absent
                },
                {
                    name: 'Casual leave',
                    y : this.Chartdata.Cl,
                    color:'#60A5FA'
                },
                {
                    name: 'Sick Leave',
                    y : this.Chartdata.SL,
                    color:'blue'
                },
                {
                  name:'week off',
                  y : this.Chartdata.Wo,
                  color:'yellow'
                }
                
            ]
        }
    ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 800 // Adjust the maximum width for responsiveness
            },
            chartOptions: {
              chart: {
                height:450 ,  // Adjust height for smaller screens
                width:450     // Adjust width for smaller screens
              }
            }
          }
          // Add more rules as needed
        ]
      },
      credits: {
        enabled: false
      },
}
  // this.chartOptions = {
  //   chart: {
  //     type: 'pie',
   
  //    backgroundColor: 'rgba(0, 0, 0, 0)',
  //    height:400,
  //    width:400,
  
  //   },
  //   title: {
  //     text: '',
  //     align: 'center'
  // },
  // //   subtitle: {
  // //     useHTML: true,
  // //     text:'75 % attendance',
  // //     floating: true,
  // //     verticalAlign: 'middle',
  // //     y: 30
  // // },
  //   legend: {
  //       floating: true,
  //       align: 'left',
  //       layout: 'vertical',
  //       verticalAlign: 'top',
  //       width: 400,
  //       x: 400,
  //       y: 0
  //   },
  //   tooltip: {
  //     valueDecimals: 2,
  //     valueSuffix: '%'
  // },
  //   plotOptions: {
  //     pie: {
  //       allowPointSelect: true,
  //       cursor: 'pointer',
  //       dataLabels: {
  //         enabled: false
  //       },
  //       showInLegend: true,
  //       innerSize: '80%', // Set innerSize to create a donut chart
  //     }
  //   },
  //   colors: ['#0366fc', '#fc0328', '#fc7b03'],
  //   series: [
  //     {
  //       type: "pie",
        
  //       data: [
  //         { name: 'Present', y:30 },
  //         { name: 'Absent', y: 5 },
  //         { name: 'On-Duty', y:3},
  //         // Add more data points as needed
  //       ] // Ini
  //     }
  //   ],
  //   responsive: {
  //     rules: [
  //       {
  //         condition: {
  //           maxWidth: 500 // Adjust the maximum width for responsiveness
  //         },
  //         chartOptions: {
  //           chart: {
  //             height: 250,  // Adjust height for smaller screens
  //             width: 250    // Adjust width for smaller screens
  //           }
  //         }
  //       }
  //       // Add more rules as needed
  //     ]
  //   },
  //   credits: {
  //     enabled: false
  //   },
  
  // }
}

}