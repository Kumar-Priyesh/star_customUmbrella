document.getElementById('logo-upload').addEventListener('change', function() {
    const selectedFile = this.files[0];
    const umbrellaImage = document.getElementById('umbrella-image');
    const logoOverlay = document.getElementById('logo-overlay');

    if (selectedFile) {
        const reader = new FileReader();
        const uploadBtnText = document.querySelector('.upload-btn-text');
        reader.onload = function(event) {
            const imgUrl = event.target.result;

            logoOverlay.style.backgroundImage = `url(${imgUrl})`; // Set logo overlay background image
            logoOverlay.style.display = 'block'; // Show logo overlay

            uploadBtnText.textContent = selectedFile.name;
            lastSelectedFileName = selectedFile.name;
        };
        reader.readAsDataURL(selectedFile); // Convert selected file to data URL
    } else if (lastSelectedFileName) {
        // If no file selected and there is a last selected file name, restore it
        uploadBtnText.textContent = lastSelectedFileName; }
    else {
        logoOverlay.style.display = 'none'; // Hide logo overlay
    }
});

// Function to handle click on color swatches
document.querySelectorAll('.swatch').forEach(function(swatch) {
    swatch.addEventListener('click', function() {
    const colorFilters = {
        pink: { invert: 0.5, hueRotate: 270 },
        blue: { invert: 0.5, hueRotate: 150 },
        yellow: { invert: 0.8, hueRotate: 0 }
        };

        // Get computed style to ensure we capture the actual color
        const computedStyle = getComputedStyle(this);
        const color = computedStyle.backgroundColor;

        const lighterColor = calculateLighterColor(color);

        // Set the background color to the lighter shade
        document.body.style.backgroundColor = lighterColor;

        console.log("Selected color:", color); // Debugging
        document.querySelector('.upload-btn').style.backgroundColor = color;//change color of upload button

        const umbrellaImage = document.getElementById('umbrella-image');
        const loadingImage = document.getElementById('loading-image');
        const logoOverlay = document.getElementById('logo-overlay');

        loadingImage.style.visibility = 'visible'; // Display loading_icon

         // Show loading_icon and hide upload_icon on upload button
        const uploadBtnLogo = document.querySelector('.upload-btn-logo');
        loadingImage.style.display = 'block';
        uploadBtnLogo.style.display = 'none';
        uploadBtnLogo.src = "static/loader_icon.svg"

        //giving color and animation to icon
        uploadBtnLogo.style.filter = ` invert(1) sepia(0) saturate(0) hue-rotate(0deg)`;
        uploadBtnLogo.style.display = 'block';
        uploadBtnLogo.style.animation='rotate 2s linear infinite'

        //to change the color of loading_icon on image side(left)
        applyFilters(color);

        // Function to apply filters based on the selected color
        function applyFilters(color) {
            if (color=='rgb(255, 255, 0)'){
                color='yellow'
            }else if(color=='rgb(0, 0, 255)'){
                color='blue'
            }else{
                color='pink'
            }
            const filters = colorFilters[color];
            console.log(color) //debug
            if (filters) {

                const invertValue = filters.invert;
                const hueRotateValue = filters.hueRotate;

                console.log(invertValue ,hueRotateValue )
                loadingImage.style.filter = `invert(${invertValue}) sepia(1) saturate(5) hue-rotate(${hueRotateValue}deg)`;
            }
         }

        //loadingImage.style.filter = 'invert(0.5) sepia(1) saturate(5) hue-rotate(270deg)'
        umbrellaImage.style.visibility = 'hidden'
        logoOverlay.style.visibility = 'hidden'



       setTimeout(function() {
            //close the animation
            uploadBtnLogo.style.animation = "none"
            uploadBtnLogo.style.display = 'block';
            //change the icon to upload one.
            uploadBtnLogo.src = 'static/upload_icon.svg'

            // Change umbrella image and set its visibility
            umbrellaImage.src = `static/${getColorName(color)} umbrella.png`;
            umbrellaImage.style.visibility = 'visible'

            //change the visibility of logoOverlay to visible and loading image to hidden
            logoOverlay.style.visibility = 'visible'
            loadingImage.style.visibility = "hidden"; // Hide loading image after loading
        }, 1000);
    });
});

//function to match the color with rgb value
function getColorName(color) {
    if (color === 'rgb(0, 0, 255)') {
        return 'blue';
    } else if (color === 'rgb(255, 255, 0)') {
        return 'yellow';
    } else if (color === 'rgb(255, 192, 203)') {
        return 'pink';
    } else {
        return 'default'; // Default to a neutral color if no match
    }
}

// Function to calculate a lighter shade of a color
function calculateLighterColor(color) {
    // Convert the color string to RGB values
    const rgb = color.substring(4, color.length-1)
                     .replace(/ /g, '')
                     .split(',');

    // Calculate a lighter shade by increasing the brightness
    const r = parseInt(rgb[0]) + 240; // Increase red value
    const g = parseInt(rgb[1]) + 240; // Increase green value
    const b = parseInt(rgb[2]) + 240; // Increase blue value

    // Ensure the RGB values don't exceed 255
    const newR = Math.min(r, 255);
    const newG = Math.min(g, 255);
    const newB = Math.min(b, 255);

    // Construct the lighter color string in RGB format
    const lighterColor = `rgb(${newR}, ${newG}, ${newB})`;
    return lighterColor;
}
