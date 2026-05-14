const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Optional: event wiring for the BOM Top 10 interface
button.addEventListener('click', () => {
    const chapter = input.value.trim();
    if (!chapter) {
        input.focus();
        return;
    }

    const li = document.createElement('li');
    li.textContent = chapter;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.setAttribute('aria-label', `Remove ${chapter}`);
    deleteButton.addEventListener('click', () => {
        li.remove();
    });

    li.append(deleteButton);
    list.append(li);

    input.value = '';
    input.focus();
});
