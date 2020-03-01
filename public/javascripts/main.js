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
