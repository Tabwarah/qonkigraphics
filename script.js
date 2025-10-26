// Data structure for the photo gallery, now pointing to images inside /public
    const myPhotos = {
        wedding: [
            { url: 'https://i.postimg.cc/tJpgc4L4/w0003-1.png' },
            { url: 'https://i.postimg.cc/QtRQK192/w0002.jpg' },
            { url: 'https://i.postimg.cc/YqSrLZkH/w0001-1.png' },
            { url: 'https://i.postimg.cc/7Lw0kK3j/w0004.jpg' },
            { url: 'https://i.postimg.cc/h47DLw5t/w0005-1.png' },
            { url: 'https://i.postimg.cc/hjWCHXcr/w0006-1.png' },
            { url: 'https://i.postimg.cc/ydGN1Crq/w0007-1.jpg' },
            { url: 'https://i.postimg.cc/QtKFWM7D/w0008-1.jpg' },
            
        ],
        portraits: [
            { url: 'https://i.postimg.cc/bN5mqfrM/p10001.jpg' },
            { url: 'https://i.postimg.cc/qqk56cHX/p10002.jpg' },
            { url: 'https://i.postimg.cc/R0KsPpMw/p10003.jpg' },
            { url: 'https://i.postimg.cc/6pTFhh2D/p10004.jpg' },
            { url: 'https://i.postimg.cc/wT5PXc5m/p10005-1.png' },
            { url: 'https://i.postimg.cc/X76xW4sC/p10006-1.jpg' },
            { url: 'https://i.postimg.cc/90Y9C5f1/p10007-1.png' },
            { url: 'https://i.postimg.cc/rw3D6F9f/p10008-1.png' },

        ],
        events: [
            { url: 'https://i.postimg.cc/MHQ8tbFR/E20001.jpg' },
            { url: 'https://i.postimg.cc/Kv5mWQYg/E20002.jpg' },
            { url: 'https://i.postimg.cc/LXdd5ZX9/E20003.jpg' },
            { url: 'https://i.postimg.cc/6QPC2g8K/E2004-1.png'},
            { url: 'https://i.postimg.cc/gjTnLD60/E20004.jpg' },
            { url: 'https://i.postimg.cc/VL3wmS3L/E20006-1.jpg' },
            { url: 'https://i.postimg.cc/rphM6hc0/E20007-1.jpg' },
            { url: 'https://i.postimg.cc/Jzc3pDJw/E20008-1.png' },

        ],
        creative: [
            { url: 'https://i.postimg.cc/wxhf5GWV/c30001.jpg' },
            { url: 'https://i.postimg.cc/s2XvVqL9/c30002.jpg' },
            { url: 'https://i.postimg.cc/hjn4XYyw/c30003.jpg' },
            { url: 'https://i.postimg.cc/tJVB8rbd/c30004.jpg' },
            { url: 'https://i.postimg.cc/sg6NsbBt/C30005-1.jpg' },
            { url: 'https://i.postimg.cc/HxGdzrtm/C30006-1.jpg' },
            { url: 'https://i.postimg.cc/Df63JjHR/c30007-1.jpg' },
            { url: 'https://i.postimg.cc/44BjNKhG/c30008-1.jpg' },

        ],
    };
    
    // Global variables to manage the slideshow state
    let slideshowInterval;
    let currentIndices = {
        wedding: 0,
        portraits: 0,
        events: 0,
        creative: 0
    };

    // Function to update the images in the grid
    function updateGridSlideshow() {
        const photoCards = document.querySelectorAll('.photo-card');
        
        photoCards.forEach(card => {
            const category = card.dataset.category;
            const images = myPhotos[category];
            
            if (images && images.length > 0) {
                let currentIndex = currentIndices[category];
                const nextIndex = (currentIndex + 1) % images.length;
                const nextPhotoUrl = images[nextIndex].url;
                
                const img = card.querySelector('img');
                img.src = nextPhotoUrl;
                
                currentIndices[category] = nextIndex;
            }
        });
    }
        
        // Function to start the slideshow interval
        function startSlideshow() {
            // Clear any existing interval to prevent multiple slideshows from running
            clearInterval(slideshowInterval);
            slideshowInterval = setInterval(updateGridSlideshow, 15000);
        }
        
        // Function to render photos into the grid based on the selected category
        function renderPhotos(category) {
            const photoGrid = document.getElementById('photo-grid');
            photoGrid.innerHTML = ''; // Clear the grid

            let photosToDisplay = [];
            
            // If "All", grab a few photos from each category to display
            if (category === 'all') {
                const categories = ['wedding', 'portraits', 'events', 'creative'];
                categories.forEach(cat => {
                    // Take the first two photos from each category for the initial grid
                    const photos = myPhotos[cat].slice(0, 2);
                    photos.forEach(photo => {
                        photosToDisplay.push({ ...photo, category: cat });
                    });
                });
            } else {
                // For a specific category, display all of them
                photosToDisplay = myPhotos[category].map(photo => ({ ...photo, category: category }));
            }
            
            // Create and append a div for each photo, storing its category
            photosToDisplay.forEach(photo => {
                const photoCard = document.createElement('div');
                photoCard.className = 'photo-card';
                photoCard.dataset.category = photo.category; // Store category in a data attribute
                
                const img = document.createElement('img');
                img.src = photo.url;
                img.alt = 'Portfolio Photo';
                img.dataset.category = photo.category;
                
                photoCard.appendChild(img);
                photoGrid.appendChild(photoCard);
            });
        }

        // Function to handle the filter button clicks
        function setupFilterButtons() {
            const filterContainer = document.getElementById('filter-container');
            const buttons = filterContainer.querySelectorAll('.filter-button');

            filterContainer.addEventListener('click', (event) => {
                if (event.target.tagName === 'BUTTON') {
                    // Remove 'selected' class from all buttons
                    buttons.forEach(btn => btn.classList.remove('selected'));
                    
                    // Add 'selected' class to the clicked button
                    event.target.classList.add('selected');

                    // Get the category from the data attribute
                    const category = event.target.dataset.category;
                    
                    renderPhotos(category);
                }
            });
        }

        // Function to handle the "Book" button click
        function setupBookButtons() {
            const buttons = document.querySelectorAll('.book-button');
            const pictureTypeSelect = document.getElementById('picture-type');

            buttons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent default action if needed
                    
                    // Get the session type from the data attribute
                    const sessionType = event.target.dataset.sessionType;

                    // Set the selected option in the form
                    pictureTypeSelect.value = sessionType;

                    // Scroll down to the booking form
                    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
                });
            });
        }

       
        // Function to set up the mobile menu toggle
        function setupMobileMenu() {
            const hamburgerMenu = document.getElementById('hamburger-menu');
            const mobileMenu = document.getElementById('mobile-menu');
            const closeMenu = document.getElementById('close-menu');

            hamburgerMenu.addEventListener('click', () => {
                mobileMenu.classList.add('open');
            });

            closeMenu.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });

            // Close the mobile menu when a link is clicked
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                });
            });
        }

        // Start the application after the page has fully loaded
        window.onload = function() {
            renderPhotos('all'); // Initial render of all photos
            startSlideshow(); // Start the dynamic grid slideshow
            setupFilterButtons();
            setupBookButtons();
            setupMobileMenu(); // Set up the mobile menu
            

        };