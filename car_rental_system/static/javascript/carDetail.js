function changeImage(src, clickedLine) {
    // Change the main image
    document.getElementById('mainImage').src = src;
    
    // Remove 'active' class from all lines
    var lines = document.querySelectorAll('.lines .line');
    lines.forEach(function(line) {
        line.classList.remove('active');
    });
    
    // Add 'active' class to the clicked line
    clickedLine.classList.add('active');
}