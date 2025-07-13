/* probAndStat.js */


// 問2
class MyPmfChart {
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


class MyCdfChart {
  constructor(id, inputY) {
    this.id = id;
    this.inputY = inputY;

    this.createChart();
  }

  createConfig(inputData) {
    const config = {
      type: 'scatter',
      data: inputData,
      options: {
        scales: {
          x: {
            type: 'linear',
            min: -2,
            max: 2,
            ticks: {
              stepSize: 1,
            },
            title: { display: true, text: '値 (X)' }
          },
          y: {
            min: -1,
            max: 2,
            ticks: {
              stepSize: 1/2,
              callback: function(value) {
                const denominator = 2;
                const numerator = Math.round(value * denominator);

                if (numerator === 0) return '0';
                if (numerator === denominator) return '1';
                return `${numerator}/${denominator}`;
              }
            },
            title: { display: true, text: '確率' }
          }
        },
        plugins: {
          legend: {
            display: false  // 凡例も消す場合はこちら
          }
        },

        responsive: false,
      }
    };
    return config;
  }

  createData() {
    const data = {
      datasets: [
        {
          label: 'P(X = x)',
          data: this.inputY[0],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          fill: false,
          showLine: true,
          pointRadius: 0
        },
        {
          label: 'P(X = x)',
          data: this.inputY[1],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          fill: false,
          showLine: true,
          pointRadius: 0
        },
        {
          label: 'P(X = x)',
          data: this.inputY[2],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          fill: false,
          showLine: true,
          pointRadius: 0
        },
      ]
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


const c1 = new MyPmfChart('pmfChart1', [0, 0, 0, 1/8, 3/8, 3/8, 1/8]);
const c2 = new MyPmfChart('pmfChart2', [1/8, 0, 3/8, 0, 3/8, 0, 1/8]);
const c3 = new MyPmfChart('pmfChart3', [2/8, 0, 2/8, 0, 2/8, 0, 2/8]);
const c4 = new MyPmfChart('pmfChart4', [0, 1/16, 4/16, 6/16, 4/16, 1/16, 0]);

const c5 = new MyCdfChart('cdfChart1', [[{x:-3, y:0}, {x:-1, y:0}], [{x:-1, y:1/2}, {x:1, y:1/2}], [{x:1, y:0}, {x:3, y:0}]]);
const c6 = new MyCdfChart('cdfChart2', [[{x:-3, y:-1/2}, {x:-1, y:-1/2}], [{x:-1, y:-1/2}, {x:1, y:1/2}], [{x:1, y:1/2}, {x:3, y:1/2}]]);
const c7 = new MyCdfChart('cdfChart3', [[{x:-3, y:0}, {x:-1, y:0}], [{x:-1, y:3/4}, {x:1, y:3/4}], [{x:1, y:0}, {x:3, y:0}]]);
const c8 = new MyCdfChart('cdfChart4', [[{x:-3, y:0}, {x:-1, y:0}], [{x:-1, y:0}, {x:1, y:1}], [{x:1, y:1}, {x:3, y:1}]]);

