/**
 * CanvasApp handles interactive erasing on a canvas with an image,
 * tracks the erased percentage, and fades out the canvas when a threshold is reached.
 */
class CanvasApp {
    /**
     * @param {Object} options
     * @param {string} options.canvasId - The ID of the canvas element.
     * @param {string} options.imagePath - The path to the image to display.
     * @param {string} options.percentageId - The ID of the element to display the erased percentage.
     */
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

    /**
     * Initializes the canvas app by setting up the canvas, loading the image, and adding event listeners.
     */
    init() {
      this.setupCanvas();
      this.loadImage();
      this.addEventListeners();
    }

    /**
     * Sets up the canvas size and dimensions.
     */
    setupCanvas() {
      this.resizeCanvas();
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    /**
     * Loads the image and renders it on the canvas when loaded.
     */
    loadImage() {
      this.image.src = this.imagePath;
      this.image.onload = () => this.renderImage();
    }

    /**
     * Draws the loaded image onto the canvas.
     */
    renderImage() {
      this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Resizes the canvas to fit the window and restores its content.
     */
    resizeCanvas() {
      const savedContent = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.ctx.putImageData(savedContent, 0, 0);
    }

    /**
     * Clears and redraws the canvas, then updates the erased percentage.
     */
    reRender() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.renderImage();
      this.updateErasedPercentage();
    }

    /**
     * Adds event listeners for window resize and mouse movement on the canvas.
     */
    addEventListeners() {
      window.addEventListener("resize", () => this.handleResize());
      this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    }

    /**
     * Handles window resize events, temporarily hides the body, and re-renders the canvas.
     */
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

    /**
     * Handles mouse movement over the canvas to erase at the cursor position.
     * @param {MouseEvent} e
     */
    handleMouseMove(e) {
      if (this.isFading) return;

      const { x, y } = this.getMousePosition(e);
      this.eraseAt(x, y);
      this.updateErasedPercentage();
    }

    /**
     * Gets the mouse position relative to the canvas.
     * @param {MouseEvent} e
     * @returns {{x: number, y: number}}
     */
    getMousePosition(e) {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    /**
     * Erases a circular area at the specified (x, y) position on the canvas.
     * @param {number} x
     * @param {number} y
     */
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

    /**
     * Calculates and displays the erased percentage, and triggers fade out if threshold is reached.
     */
    updateErasedPercentage() {
      const erasedPercentage = this.calculateErasedPercentage();
      this.displayPercentage(erasedPercentage);

      if (erasedPercentage >= 50 && !this.isFading) {
        // Hide the percentage div
        this.percentageElement.style.display = "none";
        this.fadeOutCanvas();
      }
    }

    /**
     * Calculates the percentage of the canvas that has been erased (transparent).
     * @returns {string} Percentage erased, fixed to 2 decimals.
     */
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

    /**
     * Updates the percentage display element with the current erased percentage.
     * @param {string} percentage
     */
    displayPercentage(percentage) {
      this.percentageElement.innerText = `Erased: ${percentage}%`;
    }

    /**
     * Starts the fade-out animation for the canvas and hides it.
     */
    fadeOutCanvas() {
      this.isFading = true;
      this.isCanvasHidden = true;

      const canvasSnapshot = this.canvas.toDataURL();
      const snapshotImage = new Image();
      snapshotImage.src = canvasSnapshot;

      snapshotImage.onload = () => this.animateFadeOut(snapshotImage);
    }

    /**
     * Animates the fade-out effect by gradually reducing the canvas opacity.
     * @param {HTMLImageElement} snapshotImage
     */
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