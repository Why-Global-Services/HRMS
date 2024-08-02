import { Component, OnInit, inject } from '@angular/core';
import { AttenServiceService } from '../../services/atten-service.service';
import { RouterModule } from '@angular/router';
import { roles } from '../../environtment';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from '../../parts/pie-chart/pie-chart.component';
@Component({
  selector: 'app-main-home',
  standalone: true,
  imports: [RouterModule,HighchartsChartModule,CommonModule,PieChartComponent],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})
export class MainHomeComponent implements OnInit {
  service = inject(AttenServiceService)
  data:any = []
  name: any = '';
  dep: any = '';
  atten:any=''
  date: any =''
  roles = roles.all;
  today: any;
  chartData:any
  attenArr = [
    'Late',
    'Week off',
    'Casual Leave',
    'Sick Leave',
    'Absent',
    'Half day',
    'Present',
  ];
  allEmp: any = [];
  absentCount:any=0
  clCount:any=0
  slCount:any=0
  wO:any=0
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;
  ngOnInit(): void {
    const currentDate = new Date();
    var nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    let newDate = currentDate.toLocaleDateString().split("/")
  
    this.today = newDate[2] + '-'+ this.addZero( newDate[0]) + '-'+ this.addZero( newDate[1])
    console.log(this.today,'',currentDate,'' ,nextDate);
    
   this.getAll()
   this.getEmpAll()
 
  }
  getAll(){
    this.service.getHomeDash().subscribe((res:any)=>{
      this.data = res
      console.log(res)
      res.values.forEach((v:any)=>{

        if(v.name.includes('Absent')){
          this.absentCount = v.counts
        }
        if(v.name.includes('Casual Leave')){
          this.clCount = v.counts
        }
        if(v.name.includes('Sick Leave')){
          this.slCount = v.counts
        }
        if(v.name.includes('Week off')){
          this.wO = v.counts
        }
      })
      this.chartData={
        present:Number( res.present),
        absent:Number(this.absentCount),
        Cl:Number(this.clCount),
        Sl:Number(this.slCount),
        Wo:Number(this.wO)
      }
      this.loadchart()
      console.log(this.absentCount)
    })
    
  }
  depChange(v: any) {
    this.dep = v.target.value;
    this.getEmpAll();
  }
  attenChange(v: any) {
    this.atten = v.target.value;
    this.getEmpAll();
  }
  dateChange(v: any) {
    // let cDate = new Date(v.value,'dd-MM-yyyy')
    // let date = this.datePipe.transform(v.value,'dd-MM-yyyy')
    console.log(v.value);
    this.date = v.value;
    this.getEmpAll();
  }
  getEmpAll() {
    this.service
      .getAllEmployeesAtten(this.dep, this.name, this.date,this.atten)
      .subscribe((res: any) => {
        console.log(res);
        this.allEmp = res;
      });
  }
  addZero(num: string): string {
    // Check if the number is below 10
    let newNum = Number(num)
    if (newNum < 10) {
      // If yes, add a leading zero and return as string
      return '0' + newNum;
    } else {
      // If not, just return the number as string
      return num.toString();
    }
  }
  loadchart(){
    this.chartOptions =  {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'OverAll Attendance '
      },
      tooltip: {
          valueSuffix: ''
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
                  format: '{point.percentage:.1f}',
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
              name: 'persons',
              colorByPoint: true,
              data: [
                  {
                      name: "Present",
                      y : this.chartData.present ,
                      color:"#22C55E"
                  },
                  {
                      name: 'Absent',
                      // sliced: true,
                      // selected: true,
                      color:"#F87171",
                      y : this.chartData.absent
                  },
                  {
                      name: 'Casual leave',
                      y : this.chartData.Cl,
                      color:'#60A5FA'
                  },
                  {
                      name: 'Sick Leave',
                      y : this.slCount,
                      color:'#c3d7fa'
                  },
                  {
                    name:'week off',
                    y : this.chartData.Wo,
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
                  height:420 ,  // Adjust height for smaller screens
                  width:420     // Adjust width for smaller screens
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
