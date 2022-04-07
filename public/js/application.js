
const { tagForm } = document.forms;

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
            const result = response.json();
            console.log(result);
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
            const result = response.json();
            console.log(result);
        }
    }
});
