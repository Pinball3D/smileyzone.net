function updateClock() {
    const clockElement = document.getElementById('date-time');
    const now = new Date();

    // Get the UTC time
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const utcSeconds = now.getUTCSeconds();

    // Convert UTC to EST (UTC-5 or UTC-4 depending on Daylight Savings)
    const isDST = now.getMonth() >= 3 && now.getMonth() <= 10; // Simple DST check
    const estOffset = isDST ? -5 : -4;
    
    let estHours = utcHours + estOffset;
    if (estHours < 0) {
        estHours += 24; // Correct for negative hours
    }

    // Format the time to always have two digits
    let suffix = estHours > 12 ? 'PM' : 'AM'
    let hours = estHours > 12 ? estHours - 12 : estHours;
    let minutes = utcMinutes < 10 ? '0' + utcMinutes : utcMinutes;
    const timeString = `${hours}:${minutes} ${suffix}`;
    clockElement.textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();


let offsetX = 0, offsetY = 0, initialX = 0, initialY = 0;


function dragMouseDown(e) {
    e.preventDefault();

    // Get the mouse cursor position at the start
    initialX = e.clientX;
    initialY = e.clientY;

    // Call function whenever the cursor moves
    document.onmousemove = dragElement;
    document.onmouseup = closeDragElement;
}

function dragElement(e) {
    e.preventDefault();
    const windowElement = document.getElementById("selectedWin");
    // Calculate the new cursor position
    offsetX = initialX - e.clientX;
    offsetY = initialY - e.clientY;

    // Update the initial position to the current cursor position
    initialX = e.clientX;
    initialY = e.clientY;

    // Set the window's new position
    if ((windowElement.offsetTop - offsetY) >= 30 && (windowElement.offsetTop - offsetY) <= window.screen.height) {
        windowElement.style.top = (windowElement.offsetTop - offsetY) + "px";
    }
    if ((windowElement.offsetLeft - offsetX) >= 0 && (windowElement.offsetLeft - offsetX) <= window.screen.width) {
     windowElement.style.left = (windowElement.offsetLeft - offsetX) + "px";
    }
}

// Close button functionality

document.querySelector(".winbtn.close").addEventListener("click", function() {
    windowElement.style.display = "none";
});
document.getElementById("selectedWin").addEventListener("click", function() {
    //document.getElementById("app-name").innerHTML = document.getElementById("window-header").children[3].innerHTML
});
document.querySelectorAll(".draggable-window").forEach(element => {
    element.onmousedown = function(e) {
        document.getElementById("app-name").innerHTML = element.getElementsByClassName("window-header")[0].getElementsByClassName("wintitle")[0].innerHTML
        document.onmouseup = function() {
            document.onmousemove = null;
        }
        document.getElementById("selectedWin").id = "";
        element.id="selectedWin"

        initialX = e.clientX;
        initialY = e.clientY;
        document.onmousemove = dragElement;
    }
    element.onmouseup = function() {
        document.onmousemove = null;
    }
})

const dockItems = document.querySelectorAll('.appicon');
//const tooltip = document.getElementById('tooltip');

dockItems.forEach((item, index) => {
    item.addEventListener('mouseenter', function () {
        // Add zoom class to the hovered item
        this.classList.add('zoom');

        // Zoom the neighboring items (previous and next)
        if (dockItems[index - 2]) {
            dockItems[index - 2].classList.add('neighbor2');
        }
        if (dockItems[index - 1]) {
            dockItems[index - 1].classList.add('neighbor');
        }
        if (dockItems[index + 1]) {
            dockItems[index + 1].classList.add('neighbor');
        }
        if (dockItems[index + 2]) {
            dockItems[index + 2].classList.add('neighbor2');
        }

        // Show tooltip above the hovered dock item
        //const appName = this.getAttribute('data-app-name');
        //tooltip.textContent = appName;

        //const rect = this.getBoundingClientRect();
        //const tooltipWidth = tooltip.offsetWidth;

        //tooltip.style.left = `${rect.left + rect.width / 2 - tooltipWidth / 2}px`;
        //tooltip.style.top = `${rect.top - 30}px`;
        //tooltip.classList.add('show');
    });

    item.addEventListener('mouseleave', function () {
        // Remove zoom classes when mouse leaves the item
        this.classList.remove('zoom');
        if (dockItems[index - 2]) {
            dockItems[index - 2].classList.remove('neighbor2');
        }
        if (dockItems[index - 1]) {
            dockItems[index - 1].classList.remove('neighbor');
        }
        if (dockItems[index + 1]) {
            dockItems[index + 1].classList.remove('neighbor');
        }
        if (dockItems[index + 2]) {
            dockItems[index + 2].classList.remove('neighbor2');
        }

        //tooltip.classList.remove('show');
    });
});
let loadPre = 0
setInterval(() => {
    if (loadPre >= 100) {
        document.querySelector("#main").hidden=false;
        document.querySelector("#loading").hidden=true;
        clearInterval(this)
    } else {
        document.getElementById("prog").style.width = loadPre+"%";
        loadPre = loadPre + 0.5;
    }
}, 1);

function close(e) {
   document.querySelector("#selectedWin").hidden=true;
}

document.querySelectorAll('.close').forEach((item, index) => {
    item.onclick=close;
})