
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('current-time').textContent = `== Current Time for Me: ${hours}:${minutes}:${seconds} ==`;
}

setInterval(updateTime, 1000);

function startApp() {
    document.querySelector('.start-overlay').style.display = 'none';
    document.querySelector('.title').style.opacity = 1;
    document.querySelector('.time').style.opacity = 1;
    document.querySelector('.social-buttons').style.opacity = 1;
    document.querySelector('.footer').style.opacity = 1;
    document.querySelector('.audio-control').style.opacity = 1;
    document.querySelector('.audio-control').style.display = 'block';
    document.getElementById('audio-iframe').src = "https://www.youtube.com/embed/uqy3NHwuFVk?autoplay=1&loop=1&playlist=uqy3NHwuFVk";
}

function toggleLTCAddress() {
    const ltcAddress = document.querySelector('.ltc-address');
    ltcAddress.style.display = ltcAddress.style.display === 'block' ? 'none' : 'block';
}

function showAboutMe() {
    document.querySelector('.title').style.display = 'none';
    document.querySelector('.time').style.display = 'none';
    document.querySelector('.social-buttons').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
    document.querySelector('.audio-control').style.display = 'none';
    document.querySelector('.about-me').style.display = 'block';
    document.querySelector('.back-button').style.display = 'block';
}

function goBack() {
    document.querySelector('.title').style.display = 'block';
    document.querySelector('.time').style.display = 'block';
    document.querySelector('.social-buttons').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
    document.querySelector('.audio-control').style.display = 'block';
    document.querySelector('.about-me').style.display = 'none';
    document.querySelector('.back-button').style.display = 'none';
}

window.onload = function() {
    const canvas = document.getElementById('network-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const maxNodes = 400;
    const maxDistance = 100;

    function Node(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() * 2 - 1) * 0.5;
        this.vy = (Math.random() * 2 - 1) * 0.5;
    }

    Node.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            node.update();
            ctx.beginPath();
            ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#ccc';
            ctx.fill();

            for (let j = i + 1; j < nodes.length; j++) {
                const otherNode = nodes[j];
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.strokeStyle = `rgba(204, 204, 204, ${1 - distance / maxDistance})`;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    for (let i = 0; i < maxNodes; i++) {
        nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    draw();
};
