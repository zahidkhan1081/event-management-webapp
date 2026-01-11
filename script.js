const eventList = document.getElementById("eventList");
const form = document.getElementById("eventForm");
const warning = document.getElementById("warning");
const searchInput = document.getElementById("searchInput");

document.getElementById("year").textContent = new Date().getFullYear();

let events = [
    {
        name: "Tech Conference",
        date: "2025-02-10",
        description: "Annual technology meetup"
    },
    {
        name: "Music Festival",
        date: "2024-11-20",
        description: "Live music and entertainment"
    }
];

// Display Events
function displayEvents(filteredEvents = events) {
    eventList.innerHTML = "";
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    filteredEvents.forEach((event, index) => {
        const card = document.createElement("div");
        card.classList.add("event-card");

        const eventDate = new Date(event.date);
        const today = new Date();

        if (eventDate < today) {
            card.classList.add("past");
        }

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;

        eventList.appendChild(card);
    });
}

// Add Event
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const description = document.getElementById("eventDescription").value;

    if (!name || !date || !description) {
        warning.textContent = "All fields are required!";
        return;
    }

    warning.textContent = "";

    events.push({ name, date, description });
    form.reset();
    displayEvents();
});

// Delete Event
function deleteEvent(index) {
    events.splice(index, 1);
    displayEvents();
}

// Search
searchInput.addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();

    const filtered = events.filter(event =>
        event.name.toLowerCase().includes(searchValue) ||
        event.date.includes(searchValue)
    );

    displayEvents(filtered);
});

// Initial Load
displayEvents();
