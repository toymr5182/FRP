// ฟังก์ชันโหลดไฟล์ SVG และเปลี่ยนวิดีโอพื้นหลัง
function loadSVG(filePath, videoPath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('svg-container').innerHTML = data;
            document.querySelector('#svg-container path')?.classList.add('text-path');
            
            // ซ่อนปุ่มหลังจากกดแล้ว
            document.getElementById('button1').style.display = 'none';
            document.getElementById('button2').style.display = 'none';
            
            // เปลี่ยนวิดีโอพื้นหลัง
            changeVideo(videoPath);
        })
        .catch(error => console.error('เกิดข้อผิดพลาดในการโหลด SVG:', error));
}

// ฟังก์ชันเปลี่ยนวิดีโอพื้นหลัง
function changeVideo(videoPath) {
    const bgVideo = document.getElementById('bgVideo');
    bgVideo.src = videoPath;
    bgVideo.load();
    bgVideo.play();
}

// เริ่ม SVG Animation หลังจากกดปุ่ม Confirm
document.getElementById('confirmButton').addEventListener('click', function() {
    document.getElementById('svg-container').style.display = 'flex';
    loadSVG('Svg/love.svg', 'M1.mp4');
    this.style.display = 'none'; // ซ่อนปุ่ม confirmButton หลังจากคลิก

    // เปิดเสียงของวิดีโอพื้นหลัง
    document.getElementById('bgVideo').muted = false;

    // เรียกฟังก์ชันแสดงปุ่มเพิ่มเติมหลังจากผ่านไป 7 วินาที
    setTimeout(showActionButtons, 7000); // 7000 มิลลิวินาที = 7 วินาที
});

// ฟังก์ชันแสดงปุ่มเพิ่มเติมหลังจาก SVG หลักทำงานเสร็จ
function showActionButtons() {
    document.getElementById('button1').style.display = 'block';
    document.getElementById('button2').style.display = 'block';
}

// ตรวจสอบการเล่นวิดีโอ
document.getElementById('bgVideo').addEventListener('error', function(event) {
    console.error('เกิดข้อผิดพลาดในการเล่นวิดีโอ:', event);
});
