(() => {
    const selects = [...document.querySelectorAll('div[data-custom-select]')]
    for(let select of selects) {
        for (let option of select.children) {
            option.addEventListener("click", (e) => {
                for (let option of select.children) {
                    option.classList.remove("custom-option-selected");
                    option.dataset.selected = "false";
                }
                option.classList.add("custom-option-selected");
                option.dataset.selected = "true";
            });
        }
    }
})();