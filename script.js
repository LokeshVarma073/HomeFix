/* =========================================
   HOMEFIX - MAIN JAVASCRIPT
========================================= */


/* =========================================
   PROVIDER DATA
========================================= */

const providers = {

    "Plumbing": [
        {
            name: "Ravi Kumar",
            job: "Plumbing Specialist",
            rating: "4.8",
            experience: "5+ years experience",
            price: 499
        },
        {
            name: "Suresh Kumar",
            job: "Plumbing Technician",
            rating: "4.6",
            experience: "4+ years experience",
            price: 399
        },
        {
            name: "Arun Kumar",
            job: "Pipe Repair Specialist",
            rating: "4.7",
            experience: "6+ years experience",
            price: 599
        }
    ],

    "Electrical": [
        {
            name: "Rajesh Kumar",
            job: "Electrical Specialist",
            rating: "4.8",
            experience: "5+ years experience",
            price: 449
        },
        {
            name: "Prakash",
            job: "Electrical Technician",
            rating: "4.6",
            experience: "4+ years experience",
            price: 399
        },
        {
            name: "Vijay Kumar",
            job: "Wiring Specialist",
            rating: "4.7",
            experience: "6+ years experience",
            price: 549
        }
    ],

    "Cleaning": [
        {
            name: "Lakshmi",
            job: "Home Cleaning Expert",
            rating: "4.9",
            experience: "5+ years experience",
            price: 599
        },
        {
            name: "Anitha",
            job: "Deep Cleaning Expert",
            rating: "4.7",
            experience: "4+ years experience",
            price: 699
        },
        {
            name: "Priya",
            job: "Cleaning Specialist",
            rating: "4.8",
            experience: "6+ years experience",
            price: 499
        }
    ],

    "AC Repair": [
        {
            name: "Kiran",
            job: "AC Repair Specialist",
            rating: "4.8",
            experience: "5+ years experience",
            price: 699
        },
        {
            name: "Ramesh",
            job: "AC Technician",
            rating: "4.6",
            experience: "4+ years experience",
            price: 599
        },
        {
            name: "Naveen",
            job: "AC Service Expert",
            rating: "4.7",
            experience: "6+ years experience",
            price: 799
        }
    ]
};


/* =========================================
   HELPER FUNCTIONS
========================================= */

function getUsers() {

    let users =
        JSON.parse(
            localStorage.getItem("homefixUsers") || "[]"
        );

    return users;
}


function saveUsers(users) {

    localStorage.setItem(
        "homefixUsers",
        JSON.stringify(users)
    );
}


function getBookings() {

    return JSON.parse(
        localStorage.getItem("homefixBookings") || "[]"
    );
}


function saveBookings(bookings) {

    localStorage.setItem(
        "homefixBookings",
        JSON.stringify(bookings)
    );
}


function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("homefixCurrentUser") || "null"
    );
}


function formatDate(dateString) {

    let date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short"
        }
    );
}


/* =========================================
   NAVBAR USER DISPLAY
========================================= */

function updateNavbar() {

    let currentUser =
        getCurrentUser();

    let loginLink =
        document.getElementById("loginLink");

    let signupLink =
        document.getElementById("signupLink");

    let userName =
        document.getElementById("userName");

    let logoutLink =
        document.getElementById("logoutLink");


    if (currentUser) {

        if (loginLink) {
            loginLink.style.display = "none";
        }

        if (signupLink) {
            signupLink.style.display = "none";
        }

        if (userName) {
            userName.style.display = "inline";
            userName.innerText =
                "Hi, " + currentUser.name.split(" ")[0];
        }

        if (logoutLink) {
            logoutLink.style.display = "inline";
        }

    } else {

        if (loginLink) {
            loginLink.style.display = "inline";
        }

        if (signupLink) {
            signupLink.style.display = "inline";
        }

        if (userName) {
            userName.style.display = "none";
        }

        if (logoutLink) {
            logoutLink.style.display = "none";
        }
    }
}


/* =========================================
   LOGOUT
========================================= */

function logoutUser() {

    localStorage.removeItem(
        "homefixCurrentUser"
    );

    window.location.href =
        "index.html";
}


/* =========================================
   SIGNUP
========================================= */

function signupUser() {

    let name =
        document.getElementById("signupName").value.trim();

    let email =
        document.getElementById("signupEmail").value.trim().toLowerCase();

    let password =
        document.getElementById("signupPassword").value;

    let confirmPassword =
        document.getElementById("signupConfirmPassword").value;

    let message =
        document.getElementById("signupMessage");


    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.innerText =
            "Please fill all fields.";

        message.style.color = "red";

        return;
    }


    if (password.length < 6) {

        message.innerText =
            "Password must contain at least 6 characters.";

        message.style.color = "red";

        return;
    }


    if (password !== confirmPassword) {

        message.innerText =
            "Passwords do not match.";

        message.style.color = "red";

        return;
    }


    let users =
        getUsers();


    let existingUser =
        users.find(
            function(user) {
                return user.email === email;
            }
        );


    if (existingUser) {

        message.innerText =
            "An account with this email already exists.";

        message.style.color = "red";

        return;
    }


    let user = {

        id:
            Date.now(),

        name:
            name,

        email:
            email,

        password:
            password
    };


    users.push(user);

    saveUsers(users);


    /*
       Compatibility with the earlier
       HomeFix version.
    */

    localStorage.setItem(
        "homefixUser",
        JSON.stringify(user)
    );


    message.innerText =
        "Account created successfully!";

    message.style.color = "green";


    setTimeout(
        function() {

            window.location.href =
                "login.html";

        },
        1000
    );
}


/* =========================================
   LOGIN
========================================= */

function loginUser() {

    let email =
        document.getElementById("loginEmail").value.trim().toLowerCase();

    let password =
        document.getElementById("loginPassword").value;

    let message =
        document.getElementById("loginMessage");


    if (
        email === "" ||
        password === ""
    ) {

        message.innerText =
            "Please enter email and password.";

        message.style.color = "red";

        return;
    }


    let users =
        getUsers();


    /*
       Support the older single-user
       LocalStorage data too.
    */

    if (users.length === 0) {

        let oldUser =
            JSON.parse(
                localStorage.getItem("homefixUser") || "null"
            );

        if (oldUser) {
            users.push(oldUser);
        }
    }


    let user =
        users.find(
            function(item) {

                return (
                    item.email === email &&
                    item.password === password
                );

            }
        );


    if (!user) {

        message.innerText =
            "Invalid email or password.";

        message.style.color = "red";

        return;
    }


    localStorage.setItem(
        "homefixCurrentUser",
        JSON.stringify(user)
    );


    message.innerText =
        "Login successful!";

    message.style.color = "green";


    setTimeout(
        function() {

            window.location.href =
                "index.html";

        },
        800
    );
}


/* =========================================
   SELECT SERVICE
========================================= */

function selectService(service) {

    localStorage.setItem(
        "selectedService",
        service
    );

    window.location.href =
        "providers.html";
}


/* =========================================
   PROVIDER PAGE
========================================= */

function loadProviders() {

    let service =
        localStorage.getItem("selectedService");

    let title =
        document.getElementById("serviceTitle");

    let grid =
        document.getElementById("providerGrid");


    if (!title || !grid) {
        return;
    }


    if (!service || !providers[service]) {

        title.innerText =
            "Select a service first.";

        grid.innerHTML =
            "<div class='empty-state'>" +
            "<h2>No service selected</h2>" +
            "<p>Please go back and choose a service.</p>" +
            "<br>" +
            "<a class='primary-button' href='services.html'>View Services</a>" +
            "</div>";

        return;
    }


    title.innerText =
        service + " Professionals";


    grid.innerHTML = "";


    providers[service].forEach(
        function(provider, index) {

            let firstLetter =
                provider.name.charAt(0);


            grid.innerHTML +=

                "<div class='provider-card'>" +

                "<div class='provider-avatar'>" +
                firstLetter +
                "</div>" +

                "<h2>" +
                provider.name +
                "</h2>" +

                "<p class='provider-job'>" +
                provider.job +
                "</p>" +

                "<p class='rating'>" +
                "⭐ " +
                provider.rating +
                " / 5" +
                "</p>" +

                "<p class='provider-info'>" +
                "✓ " +
                provider.experience +
                "</p>" +

                "<p class='price'>" +
                "₹" +
                provider.price +
                " onwards" +
                "</p>" +

                "<button class='primary-button' " +
                "onclick='bookProvider(" +
                index +
                ")'>" +
                "Book Now" +
                "</button>" +

                "</div>";
        }
    );
}


/* =========================================
   BOOK PROVIDER
========================================= */

function bookProvider(index) {

    let currentUser =
        getCurrentUser();


    if (!currentUser) {

        alert(
            "Please login before booking a service."
        );

        window.location.href =
            "login.html";

        return;
    }


    let service =
        localStorage.getItem("selectedService");


    if (!service || !providers[service]) {

        window.location.href =
            "services.html";

        return;
    }


    let provider =
        providers[service][index];


    localStorage.setItem(
        "selectedProvider",
        JSON.stringify(provider)
    );


    window.location.href =
        "booking.html";
}


/* =========================================
   BOOKING PAGE
========================================= */

function loadBookingPage() {

    let service =
        localStorage.getItem("selectedService");

    let savedProvider =
        localStorage.getItem("selectedProvider");


    let serviceElement =
        document.getElementById("bookingService");

    let providerElement =
        document.getElementById("bookingProvider");

    let priceElement =
        document.getElementById("bookingPrice");


    if (!serviceElement || !providerElement) {
        return;
    }


    if (!service || !savedProvider) {

        window.location.href =
            "services.html";

        return;
    }


    let provider =
        JSON.parse(savedProvider);


    serviceElement.innerText =
        service;

    providerElement.innerText =
        provider.name;

    priceElement.innerText =
        "₹" + provider.price;


    generateDates();

    generateTimeSlots();

    setupDateChange();

    updateTotal();
}


/* =========================================
   GENERATE FUTURE DATES
========================================= */

function generateDates() {

    let dateBox =
        document.getElementById("bookingDate");


    if (!dateBox) {
        return;
    }


    dateBox.innerHTML =
        "<option value=''>Select date</option>";


    let today =
        new Date();


    for (let i = 0; i < 7; i++) {

        let date =
            new Date(today);

        date.setHours(0, 0, 0, 0);

        date.setDate(
            today.getDate() + i
        );


        let year =
            date.getFullYear();

        let month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        let day =
            String(
                date.getDate()
            ).padStart(2, "0");


        let value =
            year +
            "-" +
            month +
            "-" +
            day;


        let display =
            date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short"
                }
            );


        let option =
            document.createElement("option");

        option.value =
            value;

        option.innerText =
            i === 0
                ? "Today - " + display
                : display;


        dateBox.appendChild(option);
    }
}


/* =========================================
   REAL-TIME TIME SLOTS
========================================= */

function generateTimeSlots() {

    let container =
        document.getElementById("timeSlots");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    /*
       Service hours:
       8:00 AM to 8:00 PM
    */

    let times = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00"
    ];


    times.forEach(
        function(time) {

            let button =
                document.createElement("button");

            button.type =
                "button";

            button.className =
                "time-slot";

            button.dataset.time =
                time;

            button.innerText =
                formatTime(time);

            button.onclick =
                function() {

                    selectTime(this);

                };


            container.appendChild(button);

        }
    );


    updateTimeSlots();
}


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(time) {

    let parts =
        time.split(":");

    let hour =
        parseInt(parts[0]);

    let minute =
        parts[1];

    let period =
        hour >= 12
            ? "PM"
            : "AM";


    let displayHour =
        hour % 12;

    if (displayHour === 0) {
        displayHour = 12;
    }


    return (
        displayHour +
        ":" +
        minute +
        " " +
        period
    );
}


/* =========================================
   UPDATE AVAILABLE TIME SLOTS
========================================= */

function updateTimeSlots() {

    let dateBox =
        document.getElementById("bookingDate");


    if (!dateBox) {
        return;
    }


    let selectedDate =
        dateBox.value;


    let buttons =
        document.querySelectorAll(
            ".time-slot"
        );


    let now =
        new Date();


    let today =
        now.getFullYear() +
        "-" +
        String(
            now.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            now.getDate()
        ).padStart(2, "0");


    buttons.forEach(
        function(button) {

            button.disabled = false;


            if (
                selectedDate === today
            ) {

                let time =
                    button.dataset.time;

                let parts =
                    time.split(":");


                let slotHour =
                    parseInt(parts[0]);

                let slotMinute =
                    parseInt(parts[1]);


                let currentMinutes =
                    now.getHours() * 60 +
                    now.getMinutes();


                let slotMinutes =
                    slotHour * 60 +
                    slotMinute;


                /*
                   Only future slots are available.
                */

                if (
                    slotMinutes <=
                    currentMinutes
                ) {

                    button.disabled =
                        true;

                    button.classList.remove(
                        "selected"
                    );
                }
            }
        }
    );
}


/* =========================================
   DATE CHANGE
========================================= */

function setupDateChange() {

    let dateBox =
        document.getElementById("bookingDate");


    if (!dateBox) {
        return;
    }


    dateBox.addEventListener(
        "change",
        function() {

            selectedTime = "";

            updateTimeSlots();

        }
    );
}


/* =========================================
   SELECT TIME
========================================= */

let selectedTime = "";


function selectTime(button) {

    if (button.disabled) {
        return;
    }


    document
        .querySelectorAll(".time-slot")
        .forEach(
            function(slot) {

                slot.classList.remove(
                    "selected"
                );

            }
        );


    button.classList.add(
        "selected"
    );


    selectedTime =
        button.dataset.time;
}


/* =========================================
   PAYMENT + TOTAL
========================================= */

function updateTotal() {

    let savedProvider =
        localStorage.getItem("selectedProvider");


    if (!savedProvider) {
        return;
    }


    let provider =
        JSON.parse(savedProvider);


    let total =
        document.getElementById("totalPrice");


    if (total) {

        total.innerText =
            "₹" + provider.price;
    }
}


/* =========================================
   CONFIRM BOOKING
========================================= */

function confirmBooking() {

    let currentUser =
        getCurrentUser();


    if (!currentUser) {

        alert(
            "Please login before booking."
        );

        window.location.href =
            "login.html";

        return;
    }


    let date =
        document.getElementById(
            "bookingDate"
        ).value;


    let address =
        document.getElementById(
            "address"
        ).value.trim();


    let problem =
        document.getElementById(
            "problem"
        ).value.trim();


    let payment =
        document.querySelector(
            "input[name='payment']:checked"
        );


    if (!date) {

        alert(
            "Please select a date."
        );

        return;
    }


    if (!selectedTime) {

        alert(
            "Please select a time slot."
        );

        return;
    }


    if (!address) {

        alert(
            "Please enter your address."
        );

        return;
    }


    if (!payment) {

        alert(
            "Please select a payment method."
        );

        return;
    }


    let service =
        localStorage.getItem(
            "selectedService"
        );


    let savedProvider =
        localStorage.getItem(
            "selectedProvider"
        );


    let provider =
        JSON.parse(savedProvider);


    /*
       Final safety check:
       prevent old time from being booked.
    */

    let today =
        new Date();

    let selectedDate =
        new Date(
            date + "T00:00:00"
        );


    if (
        selectedDate.toDateString() ===
        today.toDateString()
    ) {

        let parts =
            selectedTime.split(":");

        let slotMinutes =
            parseInt(parts[0]) * 60 +
            parseInt(parts[1]);

        let currentMinutes =
            today.getHours() * 60 +
            today.getMinutes();


        if (
            slotMinutes <=
            currentMinutes
        ) {

            alert(
                "This time slot has already passed. Please select another slot."
            );

            generateTimeSlots();

            return;
        }
    }


    let bookings =
        getBookings();


    let booking = {

        id:
            Date.now(),

        userEmail:
            currentUser.email,

        userName:
            currentUser.name,

        service:
            service,

        provider:
            provider.name,

        date:
            date,

        displayDate:
            formatDate(date),

        time:
            selectedTime,

        displayTime:
            formatTime(selectedTime),

        address:
            address,

        problem:
            problem || "Not specified",

        payment:
            payment.value,

        amount:
            provider.price,

        status:
            "Confirmed",

        createdAt:
            new Date().toISOString()
    };


    bookings.push(
        booking
    );


    saveBookings(
        bookings
    );


    showSuccessPopup(
        booking
    );


    /*
       Clear temporary selection
       after successful booking.
    */

    localStorage.removeItem(
        "selectedProvider"
    );

    localStorage.removeItem(
        "selectedService"
    );


    setTimeout(
        function() {

            window.location.href =
                "bookings.html";

        },
        1800
    );
}


/* =========================================
   SUCCESS POPUP
========================================= */

function showSuccessPopup(booking) {

    let popup =
        document.createElement("div");

    popup.className =
        "success-popup";


    popup.innerHTML =

        "<h3>✓ Booking Confirmed!</h3>" +

        "<p>" +
        booking.service +
        " with " +
        booking.provider +
        "</p>" +

        "<p>" +
        booking.displayDate +
        " at " +
        booking.displayTime +
        "</p>";


    document.body.appendChild(
        popup
    );


    setTimeout(
        function() {

            popup.remove();

        },
        1700
    );
}


/* =========================================
   MY BOOKINGS
========================================= */

function loadBookingsPage() {

    let container =
        document.getElementById(
            "bookingList"
        );


    if (!container) {
        return;
    }


    let currentUser =
        getCurrentUser();


    if (!currentUser) {

        container.innerHTML =

            "<div class='empty-state'>" +

            "<div class='empty-state-icon'>🔐</div>" +

            "<h2>Please login</h2>" +

            "<p>Login to view your bookings.</p>" +

            "<br>" +

            "<a class='primary-button' href='login.html'>Login</a>" +

            "</div>";

        return;
    }


    let bookings =
        getBookings();


    let userBookings =
        bookings.filter(
            function(booking) {

                return (
                    booking.userEmail ===
                    currentUser.email
                );

            }
        );


    if (userBookings.length === 0) {

        container.innerHTML =

            "<div class='empty-state'>" +

            "<div class='empty-state-icon'>📅</div>" +

            "<h2>No bookings yet</h2>" +

            "<p>Book a home service and your booking will appear here.</p>" +

            "<br>" +

            "<a class='primary-button' href='services.html'>Book a Service</a>" +

            "</div>";

        return;
    }


    container.innerHTML = "";


    userBookings
        .slice()
        .reverse()
        .forEach(
            function(booking) {

                container.innerHTML +=

                    "<div class='saved-booking'>" +

                    "<div class='saved-booking-header'>" +

                    "<div>" +

                    "<h2>" +
                    booking.service +
                    "</h2>" +

                    "<p>" +
                    booking.provider +
                    "</p>" +

                    "</div>" +

                    "<span class='status-badge'>" +
                    "✓ " +
                    booking.status +
                    "</span>" +

                    "</div>" +


                    "<div class='booking-details'>" +

                    "<div class='detail-item'>" +
                    "<strong>Date</strong><br>" +
                    booking.displayDate +
                    "</div>" +

                    "<div class='detail-item'>" +
                    "<strong>Time</strong><br>" +
                    booking.displayTime +
                    "</div>" +

                    "<div class='detail-item'>" +
                    "<strong>Payment</strong><br>" +
                    booking.payment +
                    "</div>" +

                    "<div class='detail-item'>" +
                    "<strong>Amount</strong><br>₹" +
                    booking.amount +
                    "</div>" +

                    "<div class='detail-item'>" +
                    "<strong>Address</strong><br>" +
                    booking.address +
                    "</div>" +

                    "<div class='detail-item'>" +
                    "<strong>Problem</strong><br>" +
                    booking.problem +
                    "</div>" +

                    "</div>" +

                    "</div>";
            }
        );
}


/* =========================================
   ADMIN LOGIN / DASHBOARD
========================================= */

function adminLogin() {

    let email =
        document.getElementById(
            "adminEmail"
        ).value.trim();


    let password =
        document.getElementById(
            "adminPassword"
        ).value;


    let message =
        document.getElementById(
            "adminMessage"
        );


    /*
       Demo credentials for college project.
    */

    if (
        email === "admin@homefix.com" &&
        password === "admin123"
    ) {

        localStorage.setItem(
            "homefixAdmin",
            "true"
        );


        message.innerText =
            "Admin login successful.";

        message.style.color =
            "green";


        setTimeout(
            function() {

                showAdminDashboard();

            },
            500
        );

    } else {

        message.innerText =
            "Invalid admin credentials.";

        message.style.color =
            "red";
    }
}


function showAdminDashboard() {

    let loginBox =
        document.getElementById(
            "adminLoginBox"
        );

    let dashboard =
        document.getElementById(
            "adminDashboard"
        );


    if (loginBox) {
        loginBox.style.display =
            "none";
    }

    if (dashboard) {
        dashboard.style.display =
            "block";
    }


    loadAdminData();
}


function loadAdminData() {

    let users =
        getUsers();

    let bookings =
        getBookings();


    let usersCount =
        document.getElementById(
            "usersCount"
        );

    let bookingsCount =
        document.getElementById(
            "bookingsCount"
        );

    let servicesCount =
        document.getElementById(
            "servicesCount"
        );


    if (usersCount) {
        usersCount.innerText =
            users.length;
    }

    if (bookingsCount) {
        bookingsCount.innerText =
            bookings.length;
    }

    if (servicesCount) {
        servicesCount.innerText =
            Object.keys(providers).length;
    }


    let table =
        document.getElementById(
            "adminBookingTable"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    if (bookings.length === 0) {

        table.innerHTML =
            "<tr>" +
            "<td colspan='7'>No bookings available.</td>" +
            "</tr>";

        return;
    }


    bookings
        .slice()
        .reverse()
        .forEach(
            function(booking) {

                table.innerHTML +=

                    "<tr>" +

                    "<td>" +
                    booking.userName +
                    "</td>" +

                    "<td>" +
                    booking.service +
                    "</td>" +

                    "<td>" +
                    booking.provider +
                    "</td>" +

                    "<td>" +
                    booking.displayDate +
                    "</td>" +

                    "<td>" +
                    booking.displayTime +
                    "</td>" +

                    "<td>" +
                    booking.payment +
                    "</td>" +

                    "<td>" +
                    booking.status +
                    "</td>" +

                    "</tr>";
            }
        );
}


function adminLogout() {

    localStorage.removeItem(
        "homefixAdmin"
    );

    window.location.reload();
}


/* =========================================
   PAGE INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateNavbar();

        loadProviders();

        loadBookingPage();

        loadBookingsPage();


        /*
           Admin page:
           keep login page visible until
           credentials are entered.
        */

        if (
            localStorage.getItem(
                "homefixAdmin"
            ) === "true"
        ) {

            showAdminDashboard();

        }

    }
    
   
);