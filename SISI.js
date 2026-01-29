document.addEventListener('DOMContentLoaded', function() {
    const enterPalace = document.getElementById('enter-palace');
    const palaceView = document.getElementById('palace-view');
    const bookcase = document.getElementById('bookcase');
    const doorSound = document.getElementById('door-sound');
    const backToPalace = document.getElementById('back-to-palace');
    const palaceVideo = document.getElementById('palace-video');

    // When the video ends, transition to the bookcase
    palaceVideo.addEventListener('ended', function() {
        palaceView.classList.add('hidden');
        bookcase.classList.remove('hidden');
        bookcase.classList.add('fade-in');
        palaceView.classList.remove('door-opening');
    });

    // Enter Palace button click to start video and animation
    enterPalace.addEventListener('click', function() {
        // Play the palace video
        palaceVideo.play();

        // Play door opening sound
        doorSound.play();

        // Animate palace view (simulate door opening)
        palaceView.classList.add('door-opening');
    });

    // Book click events
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        book.addEventListener('click', function() {
            if (this.classList.contains('popped-out')) {
                this.classList.remove('popped-out', 'flipped');
            } else {
                // Remove popped-out from other books
                books.forEach(b => b.classList.remove('popped-out', 'flipped'));
                this.classList.add('popped-out');
            }
        });

        const flipButton = book.querySelector('.flip-button');
        flipButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (book.classList.contains('flipped')) {
                book.classList.remove('flipped');
            } else {
                book.classList.add('flipped');
                // Trigger page turning animation
                book.classList.add('page-turning');
                setTimeout(() => {
                    book.classList.remove('page-turning');
                }, 1000);
            }
        });

        const closeButton = book.querySelector('.close-button');
        closeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            book.classList.remove('popped-out', 'flipped');
        });
    });

    // Shelf button functionality
    const shelfButtons = document.querySelectorAll('.shelf-button');
    const bookDisplay = document.getElementById('book-display');
    const closeBookBtn = document.getElementById('close-book');

    shelfButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-book');
            if (bookId === '5') {
                // Open History Amazigh book in a new tab
                window.open('HISTORY AMAZIGH/BOTO.html', '_blank');
            } else {
                bookDisplay.classList.remove('hidden');
            }
        });
    });

    closeBookBtn.addEventListener('click', function() {
        bookDisplay.classList.add('hidden');
    });

    // Book page flipping logic
    const pages = document.querySelectorAll('.page, .page1, .page2, .page3, .page4, .page5');
    let current = 0;

    // دالة باش تعرض الصفحات حسب الرقم الحالي
    function showPage(index) {
        pages.forEach((page, i) => {
            if (i < index) {
                page.style.transform = "rotateY(-180deg)"; // تقليب الصفحة
                page.style.zIndex = "0";
            } else if (i === index) {
                page.style.transform = "rotateY(0deg)";
                page.style.zIndex = "1";
            } else {
                page.style.transform = "rotateY(0deg)";
                page.style.zIndex = "0";
            }
        });
    }

    // Initialize first page
    showPage(current);

    // الزر "التالي"
    const nextBtn = document.getElementById('next');
    console.log('Next button found:', nextBtn);
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('Next button clicked, current:', current, 'pages length:', pages.length);
            if (current < pages.length - 1) {
                current++;
                showPage(current);
                playFlipSound();
            }
        });
    }

    // الزر "السابق"
    const prevBtn = document.getElementById('prev');
    console.log('Prev button found:', prevBtn);
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('Prev button clicked, current:', current);
            if (current > 0) {
                current--;
                showPage(current);
                playFlipSound();
            }
        });
    }

    function playFlipSound() {
        const flipSound = document.getElementById('flipSound');
        flipSound.currentTime = 0; // Reset to start
        flipSound.play().catch(err => {
            console.log('NO FOUND:', err);
        });
    }

    // Return to palace
    backToPalace.addEventListener('click', function() {
        bookcase.classList.add('hidden');
        bookcase.classList.remove('fade-in');
        palaceView.classList.remove('hidden');
        palaceView.classList.add('door-closing');

        // Play video in reverse manually
        reverseVideo();
    });

    function reverseVideo() {
        if (palaceVideo.currentTime > 0) {
            palaceVideo.currentTime -= 0.016; // Approximate 60fps step
            requestAnimationFrame(reverseVideo);
        } else {
            palaceVideo.currentTime = 0;
            palaceView.classList.remove('door-closing');
        }
    }
});
