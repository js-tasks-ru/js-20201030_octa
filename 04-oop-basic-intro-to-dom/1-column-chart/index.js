export default class ColumnChart {
    chartHeight = 50;
  constructor({data, value, label, link} = {}) {
    this.data = data || [];
    this.value = value || 0;
    this.label = label || '';
    this.link = link || '';


    this.render();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
       <div class="${this.data.length === 0 ? 'column-chart column-chart_loading':'column-chart'}" style="'--chart-height: '${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
           <a href="${this.link}" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
         <div data-element="header" class="column-chart__header">${this.value}</div>
         <div data-element="body" class="column-chart__chart">
           ${this.data.map(val =>
            `<div style="--value: ${Math.floor(val * (this.chartHeight / Math.max(...this.data)))}" data-tooltip="${(val / Math.max(...this.data) * 100).toFixed(0)}%"></div>`).join('')}
        </div>
      </div>
       </div>
    `;

    this.element = element.firstElementChild;
  }


  update() {

  }

  remove () {
    this.element = null;
  }

  destroy() {
    this.remove();
  }
}

