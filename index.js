const arrayOfInputs = [];
const addButton = document.querySelector("#plus_button");
const switchButton = document.querySelector("#switch");
const saveButton = document.querySelector("#saveInfo");
const saveEditedInfo = document.querySelector("#saveEditedInfo");
const txtarea = document.querySelector(".input");
const list_box = document.querySelector(".list_box");
const doc = document;



function createNoteElement(data, index) {
  const newDiv = doc.createElement("div");
  const txtdiv = doc.createElement("div");
  const newContent = doc.createTextNode(data);
  const deleteButton = doc.createElement("button");
  const deleteContent = doc.createTextNode("x");
  const editButton = doc.createElement("button");
  const editContent = doc.createTextNode("edit");
  const buttons = doc.createElement("div");

  txtdiv.appendChild(newContent);
  newDiv.appendChild(txtdiv);
  buttons.appendChild(deleteButton);
  buttons.appendChild(editButton);
  newDiv.appendChild(buttons);
  deleteButton.appendChild(deleteContent);
  editButton.appendChild(editContent);
  txtdiv.classList.add("noter");
  newDiv.classList.add("note");
  deleteButton.classList.add("deleteButton");
  editButton.classList.add("editButton");
  buttons.classList.add("btns");
  deleteButton.addEventListener("click", () => {
    arrayOfInputs.splice(index, 1);
    localStorage.setItem("userInput", JSON.stringify(arrayOfInputs));
    newDiv.remove();
  });
  

  editButton.addEventListener("click" ,()=>{
    showNoteInput();
    txtarea.value = data;
    saveButton.classList.add("hidden");
    saveEditedInfo.classList.remove("hidden");
    saveEditedInfo.addEventListener("click" , ()=>{
      const userInput = txtarea.value;
      if (userInput.length === 0) return;
      let indec = arrayOfInputs.indexOf(data);
      arrayOfInputs[indec]=userInput;
      localStorage.setItem("userInput", JSON.stringify(arrayOfInputs));
      txtarea.value ="";
      showNoteInput2();
      location.reload();
    })

  })

  return newDiv;
}


function createNotes() {
  arrayOfInputs.map((data, index) => {
    const newNote = createNoteElement(data, index);
    list_box.appendChild(newNote);
  });
}

function showNoteInput() {
  txtarea.classList.toggle("hidden");
  switchButton.classList.toggle("hidden");
  saveButton.classList.toggle("hidden");
  saveEditedInfo.classList.add("hidden");
  txtarea.value="";
}
function showNoteInput2() {
  txtarea.classList.toggle("hidden");
  switchButton.classList.toggle("hidden");
  saveButton.classList.add("hidden");
  saveEditedInfo.classList.add("hidden");
}
function createNewNote() {
  const userInput = txtarea.value;
  if (userInput.length === 0) return;

  arrayOfInputs.push(userInput);
  localStorage.setItem("userInput", JSON.stringify(arrayOfInputs));

  const newNote = createNoteElement(userInput, arrayOfInputs.length - 1);
  list_box.appendChild(newNote);
  txtarea.value = "";
  showNoteInput();
}

window.addEventListener("load", () => {
  const loadedData = JSON.parse(localStorage.getItem("userInput"));
  if (loadedData !== null) {
    arrayOfInputs.push(...loadedData);
    createNotes();
  }
});



addButton.addEventListener("click", showNoteInput);
switchButton.addEventListener("click", showNoteInput2);
saveButton.addEventListener("click", createNewNote);


