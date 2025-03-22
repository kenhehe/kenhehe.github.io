class CanvasApp {
    constructor({ canvasId, imagePath, percentageId }) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext("2d");
      this.imagePath = imagePath;
      this.percentageElement = document.getElementById(percentageId);
      this.image = new Image();
      this.isFading = false;
      this.isCanvasHidden = false;
      this.resizeTimeout = null;

      this.init();
    }

    init() {
      this.setupCanvas();
      this.loadImage();
      this.addEventListeners();
    }

    setupCanvas() {
      this.resizeCanvas();
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    loadImage() {
      this.image.src = this.imagePath;
      this.image.onload = () => this.renderImage();
    }

    renderImage() {
      this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    }

    resizeCanvas() {
      const savedContent = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.ctx.putImageData(savedContent, 0, 0);
    }

    reRender() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.renderImage();
      this.updateErasedPercentage();
    }

    addEventListeners() {
      window.addEventListener("resize", () => this.handleResize());
      this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    }

    handleResize() {
      if (this.isCanvasHidden || document.body.style.display === "none") return;

      document.body.style.display = "none";
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        document.body.style.display = "block";
        this.resizeCanvas();
        this.reRender();
      }, 300);
    }

    handleMouseMove(e) {
      if (this.isFading) return;

      const { x, y } = this.getMousePosition(e);
      this.eraseAt(x, y);
      this.updateErasedPercentage();
    }

    getMousePosition(e) {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    eraseAt(x, y) {
      this.ctx.globalCompositeOperation = "destination-out";
      this.ctx.lineWidth = 300;
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.globalCompositeOperation = "source-over";
    }

    updateErasedPercentage() {
      const erasedPercentage = this.calculateErasedPercentage();
      this.displayPercentage(erasedPercentage);

      if (erasedPercentage >= 50 && !this.isFading) {
        this.fadeOutCanvas();
      }
    }

    calculateErasedPercentage() {
      const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      const totalPixels = imageData.width * imageData.height;
      let transparentPixels = 0;

      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] === 0) {
          transparentPixels++;
        }
      }

      return ((transparentPixels / totalPixels) * 100).toFixed(2);
    }

    displayPercentage(percentage) {
      this.percentageElement.innerText = `Erased: ${percentage}%`;
    }

    fadeOutCanvas() {
      this.isFading = true;
      this.isCanvasHidden = true;

      const canvasSnapshot = this.canvas.toDataURL();
      const snapshotImage = new Image();
      snapshotImage.src = canvasSnapshot;

      snapshotImage.onload = () => this.animateFadeOut(snapshotImage);
    }

    animateFadeOut(snapshotImage) {
      let opacity = 1;
      const fadeInterval = setInterval(() => {
        opacity -= 0.02;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fadeInterval);
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = opacity;
        this.ctx.drawImage(snapshotImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1;
      }, 50);
    }
  }

  // Initialize the CanvasApp
  new CanvasApp({
    canvasId: "eraseCanvas",
    imagePath: "Helloworld.png",
    percentageId: "percentage",
  });