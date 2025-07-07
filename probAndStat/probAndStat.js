function normalPDF(x, mu = 0, sigma = 1) {
  const coeff = 1 / (sigma * Math.sqrt(2 * Math.PI));
  const exponent = -0.5 * Math.pow((x - mu) / sigma, 2);
  return coeff * Math.exp(exponent);
}

// データ生成（x軸 -5〜5、ステップ0.1）
const labels = [];
const data = [];
for (let x = -5; x <= 5; x += 0.1) {
  labels.push(x.toFixed(1));
  data.push(normalPDF(x));
}

// Chart.js で描画
const ctx = document.getElementById('pdfChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: '標準正規分布',
      data: data,
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
