// get element

const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const itemList = document.querySelector('.item-list');
const clearBtn = document.getElementById('clear-list');
const feedback = document.querySelector('.feedback');

// let itemData = [];
let itemData  = JSON.parse(localStorage.getItem('list')) || [];


if (itemData.length > 0) {
    itemData.forEach(function(singleItem) {
        itemList.insertAdjacentHTML(
        'beforeend',

        `
        <div class='item my-3>
        <h5 class="item-name text-capitalize">${singleItem}</h5>
      <div class="item-icons">
       <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
       <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
       <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
      </div>
      </div>
      `
    );
    handleItem(singleItem)
    })
}


// form submition

itemForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let textValue = itemInput.value;
    // console.log(textValue);

    if (textValue === '') {
        showFeedBack('please enter valid value', 'danger');
    }
    // additem
    else {
        addItem(textValue);
        // clear the form
        itemInput.value = ''
        // add to item array
        itemData.push(textValue)
        // console.log(itemData);
        // local storage
        localStorage.setItem('list', JSON.stringify(itemData));

        // add event listener to local icon
        handleItem(textValue)
    }

});

function showFeedBack (text, action) {
    feedback.classList.add('showItem', `alert-${action}`);
    feedback.innerHTML = `<p>${text}</p>`
   

    setTimeout(function () {
    feedback.classList.remove('showItem', `alart-${action}`);

    },3000)
};


// add item
function addItem(value) {
  const div = document.createElement("div");
  div.classList.add("item", "my-3");
  div.innerHTML = `<h5 class="item-name text-capitalize">${value}</h5>
      <div class="item-icons">
       <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
       <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
       <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
      </div>`;
  itemList.appendChild(div);

};

function handleItem (textValue ) {
    const items = itemList.querySelectorAll('.item');
    items.forEach(function (item) {
        if (item.querySelector('.item-name').textContent === textValue) {
            // complete event listener
            item.querySelector('.complete-item').addEventListener('click', function () {
                item.querySelector('.item-name').classList.toggle('completed');
                this/*item*/.classList.toggle('visibility')
            });
            // add even listerners
            item.querySelector('.edit-item').addEventListener('click', function() {
                itemInput.value = textValue;
                itemList.removeChild(item);
                // console.log(itemData);;

                itemData = itemData.filter(function(item) {
                    return item !== textValue;
                })
                 localStorage.setItem('list', JSON.stringify(itemData));

                // console.log(itemData);
            })
            // delete even listerners
            item.querySelector('.delete-item').addEventListener('click', function() {
            
                itemList.removeChild(item);
                // console.log(itemData);

                itemData = itemData.filter(function(item) {
                    return item !== textValue;
                })
                // console.log(itemData);
                showFeedBack('item delete', 'success')
            })


        }
    });
}

clearBtn.addEventListener('click', function () {
    itemData = [];
    localStorage.removeItem('list');
    const items = itemList.querySelectorAll('.item');
    if (items.length > 0) {
        items.forEach(function (item) {
            itemList.removeChild(item)
        })
    }
})



