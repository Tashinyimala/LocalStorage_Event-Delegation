const addItems = document.querySelector('.add-items');
const itemList = document.querySelector('.plates');
const items    = JSON.parse(localStorage.getItem('items')) ||[];

function populateList(items = [], htmlList) {
    htmlList.innerHTML = items.map((item, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''}/>
                <label for="item${i}">${item.text}</label>
            </li>
        `;
    }).join('');
}

function addItem(event) {
    event.preventDefault() // prevent refreshing the page
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };

    items.push(item);
    populateList(items, itemList);

    // adding to local Storage
    localStorage.setItem('items',JSON.stringify(items));

    this.reset(); // clear the input
}

function toggleDone(event) {
    if (!event.target.matches('input')) return;

    const element = event.target;
    const index   = element.dataset.index;

    items[index].done = !items[index].done; // toggle b/w true and false

    // Store on locall Storage
    localStorage.setItem('items',JSON.stringify(items));
    populateList(items, itemList);
}

addItems.addEventListener('submit', addItem);
itemList.addEventListener('click', toggleDone); // Event Delegation

populateList(items, itemList);