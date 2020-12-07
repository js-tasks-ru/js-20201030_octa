export default class SortableTable {
  element;
  subElements = {};

  constructor(headersConfig = [], { data = [] } = {}) {
    this.headersConfig = headersConfig;
    this.data = data;

    this.render();
  }

  getTableHeader() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headersConfig.map((item) => this.getHeaderRow(item)).join("")}
    </div>`;
  }

  getHeaderRow({ id, title, sortable }) {
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
        <span>${title}</span>
        ${this.getHeaderSortingArrow()}
      </div>
    `;
  }

  getHeaderSortingArrow() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`;
  }

  getTableBody() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.getTableRows(this.data)}
      </div>`;
  }

  getTableRows(data) {
    return data
      .map((item) => {
        return `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${this.getTableRow(item)}
      </a>`;
      })
      .join("");
  }

  getTableRow(item) {
    const cells = this.headersConfig.map(({ id, template }) => {
      //в cells присваиваем массив объектов, в которых запоминаем id и template
      return {
        id,
        template,
      };
    });

    return cells
      .map(({ id, template }) => {
        return template //проверяем, есть ли template(). Если да, то передаём массив .url фото в template()
          ? template(item[id])
          : `<div class="sortable-table__cell">${item[id]}</div>`; //если нет, то получаем данные из data ({price,quantity,sales})
      })
      .join("");
  }

  getTable() {
    return `
      <div class="sortable-table">
        ${this.getTableHeader()}
        ${this.getTableBody()}
      </div>`;
  }

  render() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.getTable();

    const element = wrapper.firstElementChild;

    this.element = element;
    this.subElements = this.getSubElements(element);
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);

    const allColumns = this.element.querySelectorAll(
      ".sortable-table__cell[data-id]" //выбираем колонки
    );
    const currentColumn = this.element.querySelector(
      `.sortable-table__cell[data-id="${field}"]` //выбираем колонки, которые могут быть отсортированы
    );

    // NOTE: Remove sorting arrow from other columns
    allColumns.forEach((column) => {
      column.dataset.order = ""; //убираем порядок сортировки со всех, кроме активной
    });

    currentColumn.dataset.order = order; //устанавливаем порядок сортировки в колонку

    this.subElements.body.innerHTML = this.getTableRows(sortedData);
  }

  sortData(field, order) {
    const arr = [...this.data]; //разварачиваем в массив
    const column = this.headersConfig.find((item) => item.id === field); //оставляем те колонки, которые будем сортировать по field
    const { sortType, customSorting } = column;
    const direction = order === "asc" ? 1 : -1; //определяем направление сортировки

    return arr.sort((a, b) => {
      switch (sortType) {
        case "number":
          return direction * (a[field] - b[field]);
        case "string":
          return direction * a[field].localeCompare(b[field], "ru");
        case "custom":
          return direction * customSorting(a, b);
        default:
          return direction * (a[field] - b[field]);
      }
    });
  }

  getSubElements(element) {
    const elements = element.querySelectorAll("[data-element]");

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}
