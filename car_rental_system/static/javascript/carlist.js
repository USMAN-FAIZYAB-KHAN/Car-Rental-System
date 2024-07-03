const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".slider .progress");

minPrice = localStorage.getItem("minPrice");
maxPrice = localStorage.getItem("maxPrice");

if (minPrice && maxPrice) {
    rangeInput[0].value = minPrice;
    rangeInput[1].value = maxPrice;
    priceInput[0].value = minPrice;
    priceInput[1].value = maxPrice;
    range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
    range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
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

    localStorage.setItem("minPrice", minPrice);
    localStorage.setItem("maxPrice", maxPrice);
    localStorage.setItem("categories", categories.join(','));

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
        baseurl = window.location.href.split('?')[0];
        queryParams = window.location.href.split('?')[1];
        queryParams = queryParams.split('&');

        if (queryParams.length > 1) {
            window.location.href = `${generateURL()}&page=${link.dataset.page}`;
        } else {
            window.location.href = `${baseurl}?page=${link.dataset.page}`;
        }

    });
});

        // const AddChange = (minPrice, maxPrice, checkboxes) => {
        //     console.log(minPrice, maxPrice, checkboxes);
        //     min_input = document.querySelector(".input-min");
        //     max_input = document.querySelector(".input-max");
        
        //     min_input.value = minPrice
        //     max_input.value = maxPrice;
        //     checkboxes.forEach(checkbox => {
        //         checkbox.checked = true;
        //     });
           
        // }