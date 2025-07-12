/* probAndStat.js */


// 問2
class MyChart {
  constructor(id, inputY) {
    this.id = id;
    this.inputY = inputY;

    this.createChart();
  }

  createConfig(inputData) {
    const config = {
      type: 'bar',
      data: inputData,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: '値 (X)'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: '確率'
            },
            min: 0,
            max: 1,
            ticks: {
              stepSize: 1/8,
              callback: function(value) {
                const denominator = 8;
                const numerator = Math.round(value * denominator);

                if (numerator === 0) return '0';
                if (numerator === denominator) return '1';
                return `${numerator}/${denominator}`;
              }
            },
          },  
        },
        responsive: false,
      }
    };
    return config;
  }

  createData() {
    const data = {
      labels: ['-3', '-2', '-1', '0', '1', '2', '3'],
      datasets: [{
          label: 'P(X = x)',
          data: this.inputY,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          barThickness: 10,
      }]
    }
    return data;
  }

  createChart() {
    const data = this.createData()
    const config = this.createConfig(data);
    const ctx = document.getElementById(this.id).getContext('2d');
    new Chart(ctx, config);
  }
}

const c1 = new MyChart('pmfChart1', [0, 0, 0, 1/8, 3/8, 3/8, 1/8]);
const c2 = new MyChart('pmfChart2', [1/8, 0, 3/8, 0, 3/8, 0, 1/8]);
const c3 = new MyChart('pmfChart3', [2/8, 0, 2/8, 0, 2/8, 0, 2/8]);
const c4 = new MyChart('pmfChart4', [0, 1/16, 4/16, 6/16, 4/16, 1/16, 0]);

