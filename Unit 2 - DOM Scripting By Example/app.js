document.addEventListener('DOMContentLoaded', () => { // Wait for HTML to load

  const form = document.getElementById('registrar');
  const input = form.querySelector('input');

  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');

  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckbox = document.createElement('input');

  filterLabel.textContent = "Hide unconfirmed";
  filterCheckbox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckbox);

  mainDiv.insertBefore(div, ul);

  filterCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked; // boolean
    const lis = ul.children;
    if (isChecked) {
      // hide unconfirmed
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        let label = li.querySelector('label');
        if (li.className === 'responded') {
          li.style.display = '';
          label.style.display = 'none';
        } else {
          li.style.display = 'none';
          label.style.display = '';
        }
      }

    } else {
      // unhide
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        let label = li.querySelector('label');
        li.style.display = '';
        label.style.display = '';
      }
    }
  });

  function createLI(text) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }

    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }

    const li = document.createElement('li');
    appendToLI('span', 'textContent', text);
    appendToLI('label', 'textContent', 'Confirm')
      .appendChild(createElement('input', 'type', 'checkbox'));    
    appendToLI('button', 'textContent', 'Edit');
    appendToLI('button', 'textContent', 'Remove');

    // Notes textarea
    appendToLI('div', 'style', 'clear: both');
    const notes = createElement('textarea', 'placeholder', 'Notes');
    notes.style = `margin: 1rem 0; padding: .25rem; width: 100%; height: 30%; max-height: 8rem;`;
    li.appendChild(notes);
    
    return li;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    const lis = ul.children;

    if (text) { // Input is not blank
      // Check for duplicates
      for (let i = 0; i < lis.length; i++) {
        if (text.toUpperCase() === lis[i].firstElementChild.textContent.toUpperCase()) {
          alert(text + ' is already invited.');
          input.value = '';
          return;
        }
      }
      
      input.value = '';      
      const li = createLI(text);      
      ul.appendChild(li);
    } else { // Input is blank
      alert('Please enter a name.');
    }
  });

  ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    // My added code
    const label = e.target.parentNode;

    const checked = checkbox.checked; // Boolean
    const listItem = checkbox.parentNode.parentNode;
    if (checked) {
      listItem.className = 'responded';

      // My added code
      const newLabel = document.createTextNode('Confirmed');
      label.replaceChild(newLabel, label.childNodes[0]);

    } else {
      listItem.className = '';
      
      // My added code
      const newLabel = document.createTextNode('Confirm');
      label.replaceChild(newLabel, label.childNodes[0]);
    }
  });

  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.value = span.textContent;
          input.type = 'text';
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'Save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          if (input.value) {
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            button.textContent = 'Edit';
          } else {
            alert('Please enter a name.');
          }
        }
      }

      // Execute the action in button's name
      nameActions[button.textContent.toLowerCase()]();
    }
  });

});