document.addEventListener("DOMContentLoaded", () => {
  const countryCodeSelect = document.getElementById("country-code");
  const flagSpan = document.querySelector(".flag");

  countryCodeSelect.addEventListener("change", () => {
    const selectedOption =
      countryCodeSelect.options[countryCodeSelect.selectedIndex];
    const flag = selectedOption.getAttribute("data-flag");
    flagSpan.textContent = flag;
  });
});
