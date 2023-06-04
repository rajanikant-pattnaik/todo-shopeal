const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

document.querySelector("#create-btn").addEventListener("click", () => {
  const item = document.querySelector("#create");
  console.log(item);
  createItem(item);
});

document.querySelector("#create").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const item = document.querySelector("#create");
    console.log(item);
    createItem(item);
  }
});

const displayItems = () => {
  let items = "";
  let n=itemsArray.length;
  for (let i = 0; i < n; i++) {
    items += `<div class="item">
                  <div class="input-ctrl">
                    <textarea disabled>${itemsArray[i]}</textarea>
                      <button class="fa fa-trash delete-btn" aria-hidden="true"></button>
                      <button class="fa-solid fa-pen-to-square edit-btn"></button>
                    
                  </div>
                  <div class="update-ctrl" style="display:none">
                    <button class="save-btn">Save</button>
                    <button class="cancel-btn">Cancel</button>
                  </div>
                </div>`;
    console.log(itemsArray[i]);
  }
  document.querySelector("#display-todo").innerHTML = n==0?"NO ITEMS ARE THERE":items;

  deleteFunctions();
  editFunctions();
  saveFunctions();
  cancelFunctions();
};

const deleteFunctions = () => {
  let deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      deleteItem(i);
    });
  });
};

const editFunctions = () => {
  const editBtn = document.querySelectorAll(".edit-btn");
  const updateController = document.querySelectorAll(".update-ctrl");
  const inputs = document.querySelectorAll(".input-ctrl textarea");
  
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => {
      updateController[i].style.display = "block";
      
      inputs[i].readonly = false;
    });
  });
};

const saveFunctions = () => {
  const saveBtn = document.querySelectorAll(".save-btn");
  const inputs = document.querySelectorAll(".input-ctrl textarea");
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
};

const cancelFunctions = () => {
  const cancelBtn = document.querySelectorAll(".cancel-btn");
  const updateController = document.querySelectorAll(".update-ctrl");
  const inputs = document.querySelectorAll(".input-ctrl textarea");
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = false;
      inputs[i].style.border = "none";
    });
  });
};

const createItem = (item) => {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
};

const deleteItem = (i) => {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
};

const updateItem = (text, i) => {
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
};
function updateInputValue(event) {
  var input = event.target;
  var newValue = input.value;
  input.setAttribute('value', newValue);
}

window.onload = () => {
  displayItems();
};
