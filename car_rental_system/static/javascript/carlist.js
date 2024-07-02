const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".slider .progress");

minPrice = sessionStorage.getItem("minPrice");
maxPrice = sessionStorage.getItem("maxPrice");
categories = sessionStorage.getItem("categories");

if (minPrice && maxPrice) {
    rangeInput[0].value = minPrice;
    rangeInput[1].value = maxPrice;
    priceInput[0].value = minPrice;
    priceInput[1].value = maxPrice;
    range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
    range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
}

if (categories) {
    categories = categories.split(",");
    categories.forEach((category) => {
        checkbox = document.querySelector(`input[value="${category}"]`);
        checkbox.checked = true;
    })
}

let priceGap = 0;

priceInput.forEach(input => {
    input.addEventListener("input", e => {
        let minPrice = parseInt(priceInput[0].value),
            maxPrice = parseInt(priceInput[1].value);

        if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
            if (e.target.className === "input-min") {
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            } else {
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if ((maxVal - minVal) < priceGap) {
            if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - priceGap
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

const applyfilter = document.querySelector("#addfilter");
const removeFilter = document.querySelector("#removeFilter");


removeFilter.addEventListener("click", (e) => {
    sessionStorage.removeItem("minPrice");
    sessionStorage.removeItem("maxPrice");
    sessionStorage.removeItem("categories");
    const baseurl = window.location.href.split('?')[0];
    window.location.href = baseurl;
});


const generateURL = () => {

    const minPrice = parseInt(priceInput[0].value),
    maxPrice = parseInt(priceInput[1].value);

    const checkboxes = document.querySelectorAll('input[name="car-category"]:checked');

    let queryParams = [];
    let categories = [];

    checkboxes.forEach(checkbox => {
        categories.push(checkbox.value);
    });

    queryParams.push(`minPrice=${minPrice}`);
    queryParams.push(`maxPrice=${maxPrice}`);

    sessionStorage.setItem("minPrice", minPrice);
    sessionStorage.setItem("maxPrice", maxPrice);
    sessionStorage.setItem("categories", categories.join(','));

    if (categories.length > 0) {
        queryParams.push(`categories=${categories.join(',')}`);
    }

    const queryString = queryParams.join('&');
    const baseurl = window.location.href.split('?')[0];
    const finalUrl = `${baseurl}?${queryString}`;
    return  finalUrl;
}


applyfilter.addEventListener("click", (e) => {
    window.location.href = generateURL();
});


const pagination_links = document.querySelectorAll(".pagination-link");

pagination_links.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        
        const baseurl = window.location.href.split('?')[0];
        let queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', link.dataset.page);
        window.location.href = `${baseurl}?${queryParams.toString()}`;
    });
});
