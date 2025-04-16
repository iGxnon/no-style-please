const canvas = document.getElementById('playground');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = '/cat/cat.png';

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Frame {
    constructor() {
        this.animateType = 7;
        this.animateFrame = 0;
    }

    dy() {
        if (this.animateType == 8) {
            return 7 * 32;
        }
        return this.animateType * 32;
    }

    dx() {
        return this.animateFrame * 32;
    }

    change(type) {
        this.animateType = type;
        this.animateFrame = 0;
    }

    tick() {
        switch (this.animateType) {
            case 0: // 向下
            case 1: // 向右
            case 2: // 向上
            case 3: // 向左
            case 5: // 舔手
                this.animateFrame = (this.animateFrame + 1) % 4;
                break;
            case 4: // 坐下来
                if (this.animateFrame < 2) {
                    this.animateFrame++;
                } else if (this.animateFrame == 2) {
                    this.animateFrame = 3;
                } else {
                    this.animateFrame = 2;
                }
                break;
            case 6: // 趴着睡觉
                if (this.animateFrame == 3) {
                    this.animateFrame = 3;
                } else {
                    this.animateFrame += 1;
                }
                break;
            case 7: // 裹起来睡觉
                if (this.animateFrame == 0) {
                    this.animateFrame = 1;
                } else {
                    this.animateFrame = 0;
                }
                break;
            case 8: // 蓄力跳
                if (this.animateFrame == 0) {
                    this.animateFrame = 2;
                } else if (this.animateFrame == 2) {
                    this.animateFrame = 3;
                } else {
                    this.animateFrame = 2;
                }
                break;
        }
    }
}

class Cat {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.frame = new Frame();
    }

    tick(repeat) {
        ctx.drawImage(img, this.frame.dx(), this.frame.dy(), 32, 32, this.x, this.y, 48, 48);
        this.frame.tick();
        setTimeout(repeat, 500);
    }
}

const cat = new Cat(0, 0);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cat.tick(() => {
        requestAnimationFrame(animate);
    });
}

img.onload = () => {
    animate();
};