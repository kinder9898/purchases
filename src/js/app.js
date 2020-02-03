class Purchases {
    constructor(value, category) {
        this.value = value;
        this.category = category;
    }
};

const rootEl = document.getElementById('root');

rootEl.innerHTML = `
<form data-id="add-data">
    <label for="price-input">Введите сумму</label>
    <input id="price-input" data-id="price" placeholder="Сумма">
    <label for="category-input">Введите категорию</label>
    <input id="category-input" data-id="category" placeholder="Категория"1gi>
    <button data-action="add">Добавить</button>
</form>
<div>
    <button data-action="no-sort">Нет сортировки</button>
    <button data-action="sort-by-price-desc">По цене (убывание)</button>
    <button data-action="sort-by-price-asc">По цене (возрастание)</button>
</div>
<ul data-id="purchases-list"></ul>
<div data-id="show-sum">
    <br> 
    <b><label for="total-sum">Общяя сумма:</label></b>
    <span id="total-sum" data-id="sum">0</span>
</div>
`;

let totalSum = 0;

const formEl = rootEl.querySelector('[data-id=add-data');

const showSumEl = rootEl.querySelector('[data-id=show-sum]');

const purchasesListEl = rootEl.querySelector('[data-id=purchases-list]');

const sumEl = showSumEl.querySelector('[data-id=sum]');

const priceEl = formEl.querySelector('[data-id=price]');

const addInputCategoryEl = formEl.querySelector('[data-id=category]');

const buttonEl = formEl.querySelector('[data-action=add]');

const purchases = [];

buttonEl.onclick = evt => {
    evt.preventDefault();

    const value = priceEl.value;
    const category = addInputCategoryEl.value;

    const purchase = new Purchases(value, category);
    purchases.push(purchase);

    totalSum += parseInt(value, 10);
    sumEl.textContent = `${totalSum}`;

    const purchaseEl = document.createElement('li')
    purchaseEl.innerHTML = `
    Покупка на сумму ${value} в категории ${category}
    <button data-action="remove">x</button>
    <button data-action="up">↑</button>
    <button data-action="down">↓</button>
    `;

    purchaseEl._purchase = purchase;
    
    purchasesListEl.insertBefore(purchaseEl, purchasesListEl.firstChild);

    priceEl.value = '';
    addInputCategoryEl.value = '';

    priceEl.focus();

    const addRemoveButtonEl = purchaseEl.querySelector('[data-action=remove]');

    addRemoveButtonEl.onclick = () => {
        purchaseEl.remove();
        totalSum-=value;

        sumEl.textContent = `${totalSum}`;  
    }

    const addUpButtonEl = purchaseEl.querySelector('[data-action=up]');

    addUpButtonEl.onclick = () => {
        if (purchaseEl === purchasesListEl.firstElementChild) {
            purchasesListEl.insertBefore(purchaseEl, null)
        } else {
            purchasesListEl.insertBefore(purchaseEl, purchaseEl.previousElementSibling)
        }
    }

    const addDownButtonEl = purchaseEl.querySelector('[data-action=down]');

    addDownButtonEl.onclick = () => {
        if (purchaseEl === purchasesListEl.lastElementChild) {
            purchasesListEl.insertBefore(purchaseEl, purchasesListEl.firstElementChild)
        } else {
            purchasesListEl.insertBefore(purchaseEl.nextElementSibling, purchaseEl)
        }
    }
}

const noSortButtonEl = document.querySelector('[data-action=no-sort]');
const sortByPriceDescButtonEl = rootEl.querySelector('[data-action=sort-by-price-desc]');
const sortByPriceAscButtonEl = rootEl.querySelector('[data-action=sort-by-price-asc]');

sortByPriceDescButtonEl.onclick = () => {
    const purchases = Array.from(purchasesListEl.children);
    purchases.sort((a, b) => a._purchase.value - b._purchase.value);
    for (const purchase of purchases) {
        purchasesListEl.appendChild(purchase);
    }
}

sortByPriceAscButtonEl.onclick = () => {
    const purchases = Array.from(purchasesListEl.children);
    purchases.sort((a, b) => -(a._purchase.value - b._purchase.value));
    for (const purchase of purchases) {
        purchasesListEl.appendChild(purchase);
    }
}

noSortButtonEl.onclick = () => {
    const purchases = Array.from(purchasesListEl.children);
    for (const purchase of purchases) {
        purchasesListEl.appendChild(purchase);
    }
}