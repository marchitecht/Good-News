
const { tagForm } = document.forms;
const bad = document.getElementById('bad');
const good = document.getElementById('good');
const allTags = document.getElementById('allTags');


tagForm.addEventListener('click', async (e) => {
    const formTag = Object.fromEntries(new FormData(tagForm)); // получили данные с фронта
    if (formTag.tagName) {
        if (e.target.innerHTML === 'Белый список') {
            formTag.isGood = true;
            console.log(formTag);
            const response = await fetch('/', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(formTag),
            });
            if (response.ok) {
              console.log(good,formTag.tagName);
              // if (good.getElementById(`${formTag.tagName}`)) {
                good.insertAdjacentHTML('beforeend', `
                <div class="ps-2 pe-2 mt-1 ms-1 d-flex align-items-center bd-highlight rounded-pill bg-secondary text-white bg-opacity-50" id="${formTag.tagName}" >${formTag.tagName}<button type="button"  class="ms-2 btn-close" id="delete" aria-label="Close"></button></div>
                `)
              // }
              // console.log('Уже есть такой тег');
            }
        } else if (e.target.innerHTML === 'Чёрный список') {
            formTag.isGood = false;
            console.log(formTag);
            const response = await fetch('/', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(formTag),
            });
            if (response.ok) {
              bad.insertAdjacentHTML('beforeend', `
              <div class="ps-2 pe-2 mt-1 me-1 d-flex align-items-center bd-highlight rounded-pill bg-secondary text-white bg-opacity-90 bg-dark text-white" id="${formTag.tagName}">${formTag.tagName}<button type="button" class="ms-2 btn-close btn-close-white" id="delete" aria-label="Close"></button></div>
              `)
            }
        }
    }
});

good.addEventListener('click', async(e)=> {
  const div = e.target.closest('div')
  if (e.target.id === 'delete') {
    const response = await fetch (`/${div.id}1`, { method: 'delete' });
    if (response.ok) {
      div.remove()
    }
  }
})

bad.addEventListener('click', async(e)=> {
  const div = e.target.closest('div')
  if (e.target.id === 'delete') {
    const response = await fetch (`/${div.id}0`, { method: 'delete' });
    if (response.ok) {
      div.remove()
    }
  }
})


