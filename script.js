function addTodo() {
  const input = document.getElementById('todo-input');
  const newTodo = input.value.trim();
  if (newTodo) {
      const list = document.getElementById('todo-list');
      
      const listItem = document.createElement('li');
      listItem.textContent = newTodo;

      listItem.style.display = 'flex';
      listItem.style.alignItems = 'center';
      listItem.style.justifyContent = 'space-between';
      listItem.style.padding = '5px 10px';
      listItem.style.borderBottom = '1px solid #ccc';

      // click item, change to finish status
      listItem.addEventListener('click', function(){
        listItem.classList.toggle('completed');
      });

      // create an edit button
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.style.marginLeft = '10px'; // space between button & word
      editButton.onclick = function(event) {
          event.stopPropagation();

          const currentText = listItem.firstChild.textContent;

          const editInput = document.createElement('input');
          editInput.type = 'text';
          editInput.value = currentText;
          editInput.style.marginRight = '10px';

          function saveEdit() {
            const newText = editInput.value.trim();
            if (newText) {
                const newTextNode = document.createTextNode(newText);
                editInput.replaceWith(newTextNode);
            } else {
                // if input is empty, delete the item
                list.removeChild(listItem);
            }
          }

          editInput.onkeydown = function(e) {
            if(e.key === 'Enter') {
              saveEdit();
            }
          };
          editInput.onblur = saveEdit;

          // Replace the text with input box
          listItem.firstChild.replaceWith(editInput);
          editInput.focus();
      };

      // create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Del';
      deleteButton.style.marginLeft = '10px'; // space between button & word
      deleteButton.onclick = function(event) {
          event.stopPropagation();
          list.removeChild(listItem); // delete this list item
      };

      // add buttons to todo list item
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
      list.appendChild(listItem);

      input.value = '';
  }
}

// track keyboard button "Enter"
document.getElementById('todo-input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      addTodo();
  }
});