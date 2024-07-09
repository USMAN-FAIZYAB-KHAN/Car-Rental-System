function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}
  
const csrftoken = getCSRFToken();

const view_dashboard = (element) => {
    
    document.querySelector('.profile__main__header h1').innerHTML = element;

    let upcoming_orders = 0;
    let coupons = 0;
    let total_orders = 0;
    let cancel_orders = 0;
    let cars_rented = 0;

    fetch("/userDashboard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({"dashboard": "dashboard"})
    })
    .then(response => response.json())
    .then(data => {
        upcoming_orders = data.upcoming_orders;
        total_orders = data.completed_orders;
        cancel_orders = data.cancelled_orders;
        cars_rented = data.cars_rented;
    })


    let div = document.querySelector(".rentaly__dashboard");
    div.innerHTML = " ";

    let box1 = document.createElement("div");
    box1.classList.add("rentaly__dashboard__innerbox1");
    box1.innerHTML = `
                 <div class="rentaly__spec1fication__box">
                    <i class="fa-regular fa-calendar-check"></i>
                    <h1>${upcoming_orders}</h1>
                    <p>Upcoming Orders</p>
                </div>
                <div class="rentaly__spec1fication__box">
                <i class="fa-regular fa-calendar-days"></i>
                <h1>${total_orders}</h1>
                <p>Total Order</p>
                </div>
                <div class="rentaly__spec1fication__box">
                <i class="fa-regular fa-calendar-xmark"></i>
                <h1>${cancel_orders}</h1>
                <p>Cancel Orders</p>
                </div>
                <div class="rentaly__spec1fication__box">
                    <i class="fa-solid fa-tags"></i>
                    <h1>${cars_rented}</h1>
                    <p>Cars Rented</p>
                </div>`
    div.appendChild(box1);

    let box2 = document.createElement("div");
    box2.classList.add("rentaly__dashboard__innerbox2");
    box2.innerHTML = `<h4>My Recent Orders</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Car Name</th>
                            <th>Booking date</th>
                            <th>Pick Up Date</th>
                            <th>Return Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span class="order__id">#01236</span></td>
                            <td><p>Jeep Renegade</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 2, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td> <span class="status completed">completed</span></td>
                        </tr>
                        <tr>
                            <td><span class="order__id">#01263</span></td>
                            <td><p>Mini Cooper</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 8, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><span class="status cancelled">cancelled</span></td>
                        </tr>
                        <tr>
                            <td><span class="order__id">#01245</span></td>
                            <td><p>Ferrari Enzo</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 6, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><span class="status scheduled">scheduled</span></td>
                        </tr>
                        <tr>
                            <td><span class="order__id">#01287</span></td>
                            <td><p>Hyundai Staria</p></td>
                            <td><p>March 20, 2023</p></td>
                            <td><p>March 13, 2023</p></td>
                            <td><p>March 20, 2023</p></td>
                            <td><span class="status completed">completed</span></td>
                        </tr>
                        <tr>
                            <td><span class="order__id">#01216</span></td>
                            <td><p>Toyota Rav 4</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 7, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><span class="status scheduled">scheduled</span></td>
                        </tr>
                    </tbody>
                </table>`
    div.appendChild(box2);

    let box3 = document.createElement("div");
    box3.classList.add("rentaly__dashboard__innerbox3");
    box3.innerHTML = ``;
    div.appendChild(box3);
};

const view_order = (element) => {
    
    document.querySelector('.profile__main__header h1').innerHTML = element;

    let div = document.querySelector(".rentaly__dashboard");
    div.innerHTML = " ";

    let box1 = document.createElement("div");
    box1.classList.add('rentaly__dashboard__innerbox2');
    box1.innerHTML = `
    <h4>Scheduled Orders</h4>
    <table>
        <thead>
            <tr>
            <th>Order ID</th>
            <th>Car Name</th>
            <th>Booking date</th>
            <th>Pick Up Date</th>
            <th>Return Date</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
                        <tr>
                            <td><span class="order__id">#01236</span></td>
                            <td><p>Jeep Renegade</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 2, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td> <span class="status scheduled">scheduled</span></td>
                            </tr>
                        <tr>
                            <td><span class="order__id">#01263</span></td>
                            <td><p>Mini Cooper</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 8, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><span class="status scheduled">scheduled</span></td>
                            </tr>
                            <tr>
                            <td><span class="order__id">#01245</span></td>
                            <td><p>Ferrari Enzo</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 6, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><span class="status scheduled">scheduled</span></td>
                            </tr>
                            
        </tbody>
    </table>`;
    div.appendChild(box1);

    let box2 = document.createElement("div");
    box2.classList.add('rentaly__dashboard__innerbox2');
    box2.innerHTML = `
    <h4>Cancelled Orders</h4>
    <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Car Name</th>
                            <th>Booking date</th>
                            <th>Pick Up Date</th>
                            <th>Return Date</th>
                            <th>Status</th>
                            </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td><span class="order__id">#01236</span></td>
                            <td><p>Jeep Renegade</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 2, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td> <span class="status cancelled">cancelled</span></td>
                            </tr>
                            <tr>
                            <td><span class="order__id">#01263</span></td>
                            <td><p>Mini Cooper</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 8, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><span class="status cancelled">cancelled</span></td>
                        </tr>
                        <tr>
                        <td><span class="order__id">#01245</span></td>
                            <td><p>Ferrari Enzo</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 6, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><span class="status cancelled">cancelled</span></td>
                        </tr>
                        
                    </tbody>
    </table>`;
    div.appendChild(box2);

    let box3 = document.createElement('div');
    box3.classList.add('rentaly__dashboard__innerbox2');
    box3.innerHTML = `
    <h4>Completed Orders</h4>
    <table>
        <thead>
                            <tr>
                            <th>Order ID</th>
                            <th>Car Name</th>
                            <th>Booking date</th>
                            <th>Pick Up Date</th>
                            <th>Return Date</th>
                            <th>Status</th>
                            </tr>
        </thead>
        <tbody>
                        <tr>
                        <td><span class="order__id">#01236</span></td>
                            <td><p>Jeep Renegade</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 2, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td> <span class="status completed">completed</span></td>
                        </tr>
                        <tr>
                            <td><span class="order__id">#01263</span></td>
                            <td><p>Mini Cooper</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 8, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><span class="status completed">completed</span></td>
                        </tr>
                        <tr>
                            <td><span class="order__id">#01245</span></td>
                            <td><p>Ferrari Enzo</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><p>March 6, 2023</p></td>
                            <td><p>March 10, 2023</p></td>
                            <td><span class="status completed">completed</span></td>
                            </tr>
                            
        </tbody>
    </table>`;
    div.appendChild(box3);
    
};

const dash_links = document.querySelectorAll(".dashboard_links");
const user_signout = document.querySelector("#user-signout");
user_signout.addEventListener("click", (e) => {
    console.log(user_signout)
    e.preventDefault();

    fetch("/logout", {
        method: "GET",    
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.status)
        if (data.status){
            console.log("ok")
            sessionStorage.setItem("logout", "true")
            window.location.href = "/";
        }
    })


});

dash_links.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        let target = e.target;
        if (target.innerHTML == "Dashboard") {
            remove_active(target);
            view_dashboard("Dashboard");
        } else if (target.innerHTML == "My Order") {
            remove_active(target);
            view_order("Orders");
        }
    });
});

const remove_active = (target) => {
    dash_links.forEach((link) => {
        link.classList.remove("buttonActive");
    });
    target.parentNode.classList.add("buttonActive");
};

document.addEventListener("DOMContentLoaded",() => {
    dash_links.forEach((val)=>{
        if (val.classList.contains("buttonActive")){
            let target = document.querySelector(".buttonActive")
            if (target.childNodes[2].innerHTML == "Dashboard") {
                view_dashboard("Dashboard");
            } else if (target.childNodes[2].innerHTML == "My Order") {
                view_order("Orders");
            }
        };    
    });
});