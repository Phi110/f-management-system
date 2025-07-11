function normalPDF(x, mu = 0, sigma = 1) {
  const coeff = 1 / (sigma * Math.sqrt(2 * Math.PI));
  const exponent = -0.5 * Math.pow((x - mu) / sigma, 2);
  return coeff * Math.exp(exponent);
}

// データ生成（x軸 -5〜5、ステップ0.1）
const labels = [];
const data1 = [];
for (let x = -5; x <= 5; x += 0.1) {
  labels.push(x.toFixed(1));
  data1.push(normalPDF(x));
}

// Chart.js で描画
const ctx1 = document.getElementById('pdfChart').getContext('2d');
new Chart(ctx1, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: '標準正規分布',
      data: data1,
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'x' }},
      y: { title: { display: true, text: 'f(x)' }}
    }
  }
});



const data2_1 = {
  labels: ['1', '2', '3', '4', '5', '6'],  // x軸: 離散値
  datasets: [{
    label: 'P(X = x)',
    data: [1/6, 1/6, 1/6, 1/6, 1/6, 1/6],  // y軸: 確率
    backgroundColor: 'rgba(54, 162, 235, 0.7)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  }]
};

const config2_1 = {
  type: 'bar',
  data: data2_1,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '確率'
        }
      },
      x: {
        title: {
          display: true,
          text: '値 (X)'
        }
      }
    },
    responsive: false,
  }
};

const data2_2 = {
  labels: ['1', '2', '3', '4', '5', '6'],  // x軸: 離散値
  datasets: [{
    label: 'P(X = x)',
    data: [1/6, 1/6, 1/6, 1/6, 1/6, 1/6],  // y軸: 確率
    backgroundColor: 'rgba(54, 162, 235, 0.7)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  }]
};

const config2_2 = {
  type: 'bar',
  data: data2_2,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '確率'
        }
      },
      x: {
        title: {
          display: true,
          text: '値 (X)'
        }
      }
    },
    responsive: false,
  }
};

const ctx2_1 = document.getElementById('pmfChart1').getContext('2d');
const ctx2_2 = document.getElementById('pmfChart2').getContext('2d');
new Chart(ctx2_1, config2_1);
new Chart(ctx2_2, config2_2);