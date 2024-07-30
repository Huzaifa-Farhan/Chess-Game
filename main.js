// Function to insert images into the boxes
function insertImage() {
    // Iterate over each box element
    document.querySelectorAll('.box').forEach(image => {
        // Check if the box contains any text
        if (image.innerText.length !== 0) {
            // Build the path to the image file based on the text content of the box
            let imagePath = 'images/' + image.innerText; // Set the path to the img folder

            // Insert the image depending on the type of piece (Pawn or others)
            if (image.innerText === 'W_Pawn' || image.innerText === 'B_Pawn') {
                // For Pawns, use a specific CSS class and add the image
                image.innerHTML = `${image.innerText} <img class='all-img all-pawn' src="${imagePath}.png" alt="">`;
                image.style.cursor = 'pointer'; // Change cursor to pointer to indicate clickable
            } else {
                // For other pieces, use a general CSS class and add the image
                image.innerHTML = `${image.innerText} <img class='all-img' src="${imagePath}.png" alt="">`;
                image.style.cursor = 'pointer'; // Change cursor to pointer to indicate clickable
            }
        }
    });
}

// Call the function to insert images into the boxes
insertImage();

// Function to color the board squares based on their position
function coloring() {
    // Get all the box elements
    const color = document.querySelectorAll('.box');

    // Iterate over each box element
    color.forEach(color => {
        // Get the ID of the box
        getId = color.id;
        // Convert the ID to an array of characters
        arr = Array.from(getId);
        // Remove the first character (typically a letter representing row/column)
        arr.shift();
        // Extract the numeric values from the ID
        aside = eval(arr.pop());
        aup = eval(arr.shift());
        // Calculate the sum of the extracted values
        a = aside + aup;

        // Apply colors based on the sum
        if (a % 2 == 0) {
            // For even sums, set a light color
            color.style.backgroundColor = 'rgb(232 235 239)';
        } else {
            // For odd sums, set a darker color
            color.style.backgroundColor = 'rgb(125 135 150)';
        }
    });
}

// Call the function to apply colors to the board squares
coloring();


// Function to prevent moving elements of the same team
function reddish() {
    // Iterate over each box element
    document.querySelectorAll('.box').forEach(i1 => {
        // Check if the box is highlighted in blue
        if (i1.style.backgroundColor == 'blue') {

            // Iterate over each box element again
            document.querySelectorAll('.box').forEach(i2 => {
                // Check if the box is highlighted in greenyellow and contains text
                if (i2.style.backgroundColor == 'greenyellow' && i2.innerText.length !== 0) {

                    // Get text of the selected and target boxes
                    greenyellowText = i2.innerText;
                    blueText = i1.innerText;

                    // Extract the color from the text (assumes the color is the first character)
                    blueColor = ((Array.from(blueText)).shift()).toString();
                    greenyellowColor = ((Array.from(greenyellowText)).shift()).toString();

                    // Get the ID of the target box
                    getId = i2.id;
                    arr = Array.from(getId);
                    arr.shift(); // Remove the first character
                    aside = eval(arr.pop()); // Get row/column number
                    aup = eval(arr.shift()); // Get column/row number
                    a = aside + aup; // Sum of row and column numbers

                    // Apply background color based on position and team color
                    if (a % 2 == 0 && blueColor == greenyellowColor) {
                        i2.style.backgroundColor = 'rgb(232 235 239)'; // Light color for even positions
                    }
                    if (a % 2 !== 0 && blueColor == greenyellowColor) {
                        i2.style.backgroundColor = 'rgb(125 135 150)'; // Dark color for odd positions
                    }
                }
            });
        }
    });
}

// Reset button functionality
document.getElementById("reset-btn").addEventListener("click", function () {
    // Reload the page to reset the game state
    location.reload();
});

// Variable to toggle turns
tog = 1;

// Add click event listeners to each box
document.querySelectorAll('.box').forEach(item => {
    item.addEventListener('click', function () {
        // Check if the clicked box is greenyellow and empty
        if (item.style.backgroundColor == 'greenyellow' && item.innerText.length == 0) {
            tog = tog + 1; // Toggle the turn

        } else if (item.style.backgroundColor == 'greenyellow' && item.innerText.length !== 0) {
            // If the clicked box is greenyellow and contains text, move the piece
            document.querySelectorAll('.box').forEach(i => {
                if (i.style.backgroundColor == 'blue') {
                    // Get the ID and text of the blue highlighted box
                    blueId = i.id;
                    blueText = i.innerText;

                    // Move the piece to the new box and update the game state
                    document.getElementById(blueId).innerText = '';
                    item.innerText = blueText;
                    coloring(); // Update the board colors
                    insertImage(); // Update the images on the board
                    tog = tog + 1; // Toggle the turn
                }
            });
        }

        // Calculate position based on the ID of the clicked box
        getId = item.id;
        arr = Array.from(getId);
        arr.shift(); // Remove the first character
        aside = eval(arr.pop()); // Get row/column number
        arr.push('0'); // Add '0' to the array
        aup = eval(arr.join('')); // Combine and evaluate the remaining numbers
        a = aside + aup; // Sum of row and column numbers


// Function to handle highlighting possible moves for chess pieces
function whosTurn(toggle) {
    // Handle Pawn movement
    if (item.innerText == `${toggle}pawn`) {
        item.style.backgroundColor = 'blue'; // Highlight selected piece

        if (tog % 2 !== 0 && aup < 800) {
            // White Pawn: First move
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
                document.getElementById(`b${a + 100}`).style.backgroundColor = 'greenyellow'; // Highlight forward move
                if (document.getElementById(`b${a + 200}`).innerText.length == 0 && aup < 300) {
                    document.getElementById(`b${a + 200}`).style.backgroundColor = 'greenyellow'; // Highlight two squares forward
                }
            }
            // Diagonal capture moves
            if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'greenyellow'; // Highlight capture right
            }
            if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'greenyellow'; // Highlight capture left
            }
        }

        if (tog % 2 == 0 && aup > 100) {
            // Black Pawn: First move
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
                document.getElementById(`b${a - 100}`).style.backgroundColor = 'greenyellow'; // Highlight forward move
                if (document.getElementById(`b${a - 200}`).innerText.length == 0 && aup > 600) {
                    document.getElementById(`b${a - 200}`).style.backgroundColor = 'greenyellow'; // Highlight two squares forward
                }
            }
            // Diagonal capture moves
            if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'greenyellow'; // Highlight capture right
            }
            if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'greenyellow'; // Highlight capture left
            }
        }

        // Second move for Pawns
        if (tog % 2 !== 0 && aup >= 800) {
            if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
                document.getElementById(`b${a + 100}`).style.backgroundColor = 'greenyellow'; // Highlight forward move
            }
            if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'greenyellow'; // Highlight capture right
            }
            if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'greenyellow'; // Highlight capture left
            }
        }
        if (tog % 2 == 0 && aup <= 100) {
            if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
                document.getElementById(`b${a - 100}`).style.backgroundColor = 'greenyellow'; // Highlight forward move
            }
            if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'greenyellow'; // Highlight capture right
            }
            if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'greenyellow'; // Highlight capture left
            }
        }
    }

    // Handle King movement
    if (item.innerText == `${toggle}king`) {
        // Highlight all possible moves for the King (one square in any direction)
        if (aside < 8) document.getElementById(`b${a + 1}`).style.backgroundColor = 'greenyellow'; // Move right
        if (aside > 1) document.getElementById(`b${a - 1}`).style.backgroundColor = 'greenyellow'; // Move left
        if (aup < 800) document.getElementById(`b${a + 100}`).style.backgroundColor = 'greenyellow'; // Move forward
        if (aup > 100) document.getElementById(`b${a - 100}`).style.backgroundColor = 'greenyellow'; // Move backward
        if (aup > 100 && aside < 8) document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'greenyellow'; // Diagonal move
        if (aup > 100 && aside > 1) document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'greenyellow'; // Diagonal move
        if (aup < 800 && aside < 8) document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'greenyellow'; // Diagonal move
        if (aup < 800 && aside > 1) document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'greenyellow'; // Diagonal move
        item.style.backgroundColor = 'blue'; // Highlight selected piece
    }

    // Handle Knight movement
    if (item.innerText == `${toggle}knight`) {
        // Highlight all possible moves for the Knight (L-shaped moves)
        if (aside < 7 && aup < 800) document.getElementById(`b${a + 100 + 2}`).style.backgroundColor = 'greenyellow'; // Move right and forward
        if (aside < 7 && aup > 200) document.getElementById(`b${a - 100 + 2}`).style.backgroundColor = 'greenyellow'; // Move right and backward
        if (aside < 8 && aup < 700) document.getElementById(`b${a + 200 + 1}`).style.backgroundColor = 'greenyellow'; // Move forward and right
        if (aside > 1 && aup < 700) document.getElementById(`b${a + 200 - 1}`).style.backgroundColor = 'greenyellow'; // Move forward and left
        if (aside > 2 && aup < 800) document.getElementById(`b${a - 2 + 100}`).style.backgroundColor = 'greenyellow'; // Move left and forward
        if (aside > 2 && aup > 100) document.getElementById(`b${a - 2 - 100}`).style.backgroundColor = 'greenyellow'; // Move left and backward
        if (aside < 8 && aup > 200) document.getElementById(`b${a - 200 + 1}`).style.backgroundColor = 'greenyellow'; // Move backward and right
        if (aside > 1 && aup > 200) document.getElementById(`b${a - 200 - 1}`).style.backgroundColor = 'greenyellow'; // Move backward and left
        item.style.backgroundColor = 'blue'; // Highlight selected piece
    }

    // Handle Queen movement
    if (item.innerText == `${toggle}queen`) {
        // Queen moves in all directions
        for (let i = 1; i < 9; i++) {
            // Vertical Moves
            if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'greenyellow'; // Move forward
            } else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'greenyellow'; // Move forward
                break;
            }
        }
        for (let i = 1; i < 9; i++) {
            // Horizontal Moves
            if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'greenyellow'; // Move backward
            } else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'greenyellow'; // Move backward
                break;
            }
        }
        for (let i = 1; i < 9; i++) {
            // Diagonal Moves
            if ((a + i * 101) < 900 && document.getElementById(`b${a + i * 101}`).innerText == 0) {
                document.getElementById(`b${a + i * 101}`).style.backgroundColor = 'greenyellow'; // Move diagonally
            } else if ((a + i * 101) < 900 && document.getElementById(`b${a + i * 101}`).innerText !== 0) {
                document.getElementById(`b${a + i * 101}`).style.backgroundColor = 'greenyellow'; // Move diagonally
                break;
            }
        }
        for (let i = 1; i < 9; i++) {
            // Opposite Diagonal Moves
            if ((a - i * 101) > 100 && document.getElementById(`b${a - i * 101}`).innerText == 0) {
                document.getElementById(`b${a - i * 101}`).style.backgroundColor = 'greenyellow'; // Move diagonally
            } else if ((a - i * 101) > 100 && document.getElementById(`b${a - i * 101}`).innerText !== 0) {
                document.getElementById(`b${a - i * 101}`).style.backgroundColor = 'greenyellow'; // Move diagonally
                break;
            }
        }
        item.style.backgroundColor = 'blue'; // Highlight selected piece
    }

    // Handle Bishop movement
    if (item.innerText == `${toggle}bishop`) {
        // Bishop moves diagonally in all directions
        for (let i = 1; i < 9; i++) {
            if ((a + i * 101) < 900 && document.getElementById(`b${a + i * 101}`).innerText == 0) {
                document.getElementById(`b${a + i * 101}`).style.backgroundColor = 'greenyellow'; // Move diagonally
            } else if ((a + i * 101) < 900 && document.getElementById(`b${a + i * 101}`).innerText !== 0) {
                document.getElementById(`b${a + i * 101}`).style.backgroundColor = 'greenyellow'; // Move diagonally
                break;
            }
        }
        for (let i = 1; i < 9; i++) {
            if ((a - i * 101) > 100 && document.getElementById(`b${a - i * 101}`).innerText == 0) {
                document.getElementById(`b${a - i * 101}`).style.backgroundColor = 'greenyellow'; // Move diagonally
            } else if ((a - i * 101) > 100 && document.getElementById(`b${a - i * 101}`).innerText !== 0) {
                document.getElementById(`b${a - i * 101}`).style.backgroundColor = 'greenyellow'; // Move diagonally
                break;
            }
        }
        for (let i = 1; i < 9; i++) {
            if ((a + i * 99) < 900 && document.getElementById(`b${a + i * 99}`).innerText == 0) {
                document.getElementById(`b${a + i * 99}`).style.backgroundColor = 'greenyellow'; // Move diagonally
            } else if ((a + i * 99) < 900 && document.getElementById(`b${a + i * 99}`).innerText !== 0) {
                document.getElementById(`b${a + i * 99}`).style.backgroundColor = 'greenyellow'; // Move diagonally
                break;
            }
        }
        for (let i = 1; i < 9; i++) {
            if ((a - i * 99) > 100 && document.getElementById(`b${a - i * 99}`).innerText == 0) {
                document.getElementById(`b${a - i * 99}`).style.backgroundColor = 'greenyellow'; // Move diagonally
            } else if ((a - i * 99) > 100 && document.getElementById(`b${a - i * 99}`).innerText !== 0) {
                document.getElementById(`b${a - i * 99}`).style.backgroundColor = 'greenyellow'; // Move diagonally
                break;
            }
        }
        item.style.backgroundColor = 'blue'; // Highlight selected piece
    }

    // Handle Rook movement
    if (item.innerText == `${toggle}rook`) {
        // Rook moves horizontally and vertically
        for (let i = 1; i < 9; i++) {
            // Vertical Moves
            if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'greenyellow'; // Move forward
            } else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'greenyellow'; // Move forward
                break;
            }
        }
        for (let i = 1; i < 9; i++) {
            // Horizontal Moves
            if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'greenyellow'; // Move backward
            } else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'greenyellow'; // Move backward
                break;
            }
        }
        item.style.backgroundColor = 'blue'; // Highlight selected piece
    }
}

// Toggling the turn

// Check if the current turn is odd (White's turn)
if (tog % 2 !== 0) {
    // Update the display to show it's White's turn
    document.getElementById('tog').innerText = "White's Turn";
    // Call the function to highlight possible moves for White
    whosTurn('W');
}
// Check if the current turn is even (Black's turn)
if (tog % 2 == 0) {
    // Update the display to show it's Black's turn
    document.getElementById('tog').innerText = "Black's Turn";
    // Call the function to highlight possible moves for Black
    whosTurn('B');
}

// Call the function reddish() (presumably to perform some action)
reddish();


    })
})

// Add event listeners to all elements with class 'box'
document.querySelectorAll('.box').forEach(hathiTest => {

    // Event listener for clicks on 'box' elements
    hathiTest.addEventListener('click', function () {

        // Check if the clicked box has a blue background color
        if (hathiTest.style.backgroundColor == 'blue') {

            // Store the ID and text of the clicked blue box
            blueId = hathiTest.id;
            blueText = hathiTest.innerText;

            // Add event listeners to all 'box' elements for possible moves
            document.querySelectorAll('.box').forEach(hathiTest2 => {

                // Event listener for clicks on 'box' elements
                hathiTest2.addEventListener('click', function () {
                    // Check if the clicked box has a greenyellow background and is empty
                    if (hathiTest2.style.backgroundColor == 'greenyellow' && hathiTest2.innerText.length == 0) {
                        // Move the text from the blue box to the selected greenyellow box
                        document.getElementById(blueId).innerText = '';
                        hathiTest2.innerText = blueText;
                        // Call functions to update the board's appearance and insert an image
                        coloring();
                        insertImage();
                    }
                });
            });
        }
    });
});

// Prevent selecting multiple elements by toggling selection
let z = 0; // Initialize a counter

// Add event listeners to all elements with class 'box'
document.querySelectorAll('.box').forEach(ee => {
    // Event listener for clicks on 'box' elements
    ee.addEventListener('click', function () {
        z = z + 1; // Increment the counter on each click
        // Check if the counter is even and the box does not have a greenyellow background
        if (z % 2 == 0 && ee.style.backgroundColor !== 'greenyellow') {
            // Call the function to update the appearance of the board
            coloring();
        }
    });
});
