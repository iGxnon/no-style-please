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
        this.animateType = 0;
        this.animateFrame = 0;
    }

    dy() {
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
            case 4: // 坐下来睡觉
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
        }
    }
}

class Action {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.action = 1;
        this.frame = new Frame();
        this.frame.change(this.action)
        this.actionFrames = 32;
    }

    draw() {
        ctx.drawImage(img, this.frame.dx(), this.frame.dy(), 32, 32, this.x, this.y, 48, 48);
    }

    nextAction() {
        this.action = Math.floor(Math.random() * 8);
        this.frame.change(this.action);
        this.actionFrames = Math.floor(Math.random() * 32) + 32;
    }

    tick() {
        this.actionFrames--;
        if (this.actionFrames <= 0) {
            this.nextAction();
        }
        this.frame.tick();
        switch (this.action) {
            case 0: // 向下
                this.y += 2;
                if (this.y > canvas.height - 20) {
                    this.y = -48;
                }
                break;
            case 1: // 向右
                this.x += 2;
                if (this.x > canvas.width - 20) {
                    this.x = -48;
                }
                break;
            case 2: // 向上
                this.y -= 2;
                if (this.y < -48) {
                    this.y = canvas.height - 20;
                }
                break;
            case 3: // 向左
                this.x -= 2;
                if (this.x < -48) {
                    this.x = canvas.width - 20;
                }
                break;
            case 4: // 坐下来
                break;
            case 5: // 舔手
                break;
            case 6: // 趴着睡觉
                break;
            case 7: // 裹起来睡觉
                break;
            case 8: // 蓄力跳
                break;
        }
    }
}

class Cat {
    constructor() {
        this.action = new Action();
    }

    tick(repeat) {
        this.action.draw();
        this.action.tick();
        setTimeout(repeat, 100);
    }
}

const cat = new Cat();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cat.tick(() => {
        requestAnimationFrame(animate);
    });
}

img.onload = () => {
    animate();
};
