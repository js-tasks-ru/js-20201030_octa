export default class ColumnChart {
  chartHeight = 50;
  subElements = {};

  constructor({ data = [], value = 0, label = "", link = "" } = {}) {
    this.data = data;
    this.value = value;
    this.label = label;
    this.link = link;

    this.render();
  }

  getLink() {
    return this.link
      ? `<a href="${this.link}" class="column-chart__link">View all</a>` //если адрес ссылки передан, то рендерим
      : "";
  }

  getColumnBody(data) {
    //отдельно рендерим столбцы
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue; //вычисляем отношение

    return data
      .map((val) => {
        const percent = ((val / maxValue) * 100).toFixed(0);

        return `<div style="--value: ${Math.floor(
          val * scale
        )}" data-tooltip="${percent}%"></div>`;
      })
      .join("");
  }

  get template() {
    return `
       <div class="${
         this.data.length === 0 //условное присвоение класса
           ? "column-chart column-chart_loading"
           : "column-chart"
       }" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
         <div data-element="header" class="column-chart__header">${
           this.value
         }</div>
         <div data-element="body" class="column-chart__chart">
           ${this.getColumnBody(this.data)}
        </div>
      </div>
       </div>
    `;
  }

  render() {
    const element = document.createElement("div"); //создаём контейнер, который потом удалим (можно использовать fragment)
    element.innerHTML = this.template; //прсваивем шаблон из псевдо-свойства template в element
    this.element = element.firstElementChild; //избавляемся от div
    this.subElements = this.getSubElements(this.element); //получаем составные части шаблона(header и body) и присваиваем объекту subElements

    // this.data.length === 0 ? this.element.classList.add('column-chart_loading'):this.element.classList.remove('column-chart_loading');
  }

  getSubElements(element) {
    const elements = element.querySelectorAll("[data-element]"); //выбираем все элеиенты с data-фтрибутами (header и body)

    return [...elements].reduce((acc, subElement) => {
      acc[subElement.dataset.element] = subElement; //свойство объекта = HTML-элементу с соответсвующим data-атрибутом
      console.log(acc);
      return acc;
    }, {});
  }

  update(data) {
    this.subElements.body.innerHTML = this.getColumnBody(data); //обновляем данные в HTML-разметке
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}
