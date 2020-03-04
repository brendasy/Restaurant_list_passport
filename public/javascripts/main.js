
//add confirm for delete action
const forms = document.forms
for (let element of forms) {
  element.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      if (!confirm("確定要刪除這間餐廳嗎?")) {
        e.preventDefault()
        e.target.blur()
      }
    }
  })
}

//sort action
const sort = document.querySelector('.sort')

sort.addEventListener('change', function () {
  if (event.target.id === 'sort' && event.target.value !== '') {
    this.submit()
  }

})