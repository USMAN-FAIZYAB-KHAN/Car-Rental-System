function countUp(counter, targetNumber, duration) {
    let startNumber = 0;
    const increment = targetNumber / (duration / 10);

    function updateCounter() {
        startNumber += increment;
        if (startNumber < targetNumber) {
            counter.innerText = Math.ceil(startNumber);
            setTimeout(updateCounter, 10);
        } else {
            counter.innerText = targetNumber;
        }
    }

    updateCounter();
}

const counters = document.getElementsByClassName("counter");
for (let i = 0; i < counters.length; i++) {
    const targetNumber = counters[i].innerText;
    countUp(counters[i], targetNumber, 2000);
}



const observer = new IntersectionObserver((entries)=> {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show')       
        }else {
            entry.target.classList.remove('show')
        }
    })
})
const observer2 = new IntersectionObserver((entries)=> {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show')       
        }else {
            entry.target.classList.remove('show')
        }
    })
})
const observer3 = new IntersectionObserver((entries)=> {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show-down')       
        }else {
            entry.target.classList.remove('show-down')
        }
    })
})




const hiddenElements = document.querySelectorAll('.hidden-left')
hiddenElements.forEach((el) => observer.observe(el))
const hiddenElements2 = document.querySelectorAll('.hidden-right')
hiddenElements2.forEach((el) => observer2.observe(el))
const hiddenElements3 = document.querySelectorAll('.hidden-down')
hiddenElements3.forEach((el) => observer3.observe(el))




const content__about = [
    {
    'para1' : `We offer a meticulously curated collection of the most sought-after luxury vehicles on the market.
                Whether you prefer the sporty allure of a high-performance sports car, the sophistication of a sleek
                and luxurious sedan, or the versatility of a premium SUV, we have the perfect car to match your
                discerning taste.`
    },
    {
    'para2' : `We understand that prestige goes beyond luxury. It's about making a statement, embracing sophistication, 
                and indulging in the finer things in life. That's why we offer an exclusive selection of prestigious cars 
                that exude elegance, style, and status.`
    },
    {
    'para3' : `We prioritize your comfort and convenience throughout your journey. We understand that a comfortable ride 
                can make a world of difference, whether you're embarking on a business trip or enjoying a leisurely vacation. 
                That's why we offer a wide range of well-maintained, comfortable cars that cater to your specific needs.`
    },

]


const btn = document.querySelectorAll('.btn');

const removeClass = ()=>{
    btn.forEach((val)=>{
        val.classList.remove("lux");
});
};

btn.forEach(link => {
    link.addEventListener('click',(e)=>{

        removeClass();

        let parentTarget = e.target.parentNode.nextSibling.nextSibling;
        parentTarget.innerHTML = ''
        
        if(e.target.innerHTML == 'LUXURY'){
            parentTarget.innerHTML = content__about[0].para1;
        }
        else if(e.target.innerHTML == 'PRESTIGE'){
            parentTarget.innerHTML = content__about[1].para2;
        }
        else if(e.target.innerHTML == 'COMFORT'){
            parentTarget.innerHTML = content__about[2].para3;
        }
        e.target.classList.add('lux');
    });
});