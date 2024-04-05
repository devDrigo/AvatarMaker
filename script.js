class Question {
    constructor(texto, corFundo) {
      this.texto = texto;
      this.corFundo = corFundo;
    }
  }

  document
    .getElementById("questionForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const texto = document.getElementById("texto").value;
      const corFundo = document.getElementById("corFundo").value;

      const minhaPergunta = new Question(texto, corFundo);

      const svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svg.setAttribute("width", "200");
      svg.setAttribute("height", "200");

      const svgWidth = 400;
      const svgHeight = 400;
      const rectWidth = svgWidth;
      const rectHeight = svgHeight;
      const rectX = 0;
      const rectY = 0;

      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      rect.setAttribute("x", rectX.toString());
      rect.setAttribute("y", rectY.toString());
      rect.setAttribute("width", rectWidth.toString());
      rect.setAttribute("height", rectHeight.toString());
      rect.setAttribute("fill", corFundo);

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", "49.5%");
      text.setAttribute("y", "55%");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("fill", "#FFFFFF");
      text.setAttribute("font-family", "Arial");
      text.setAttribute("font-size", "110");
      text.setAttribute("font-weight", "700");
      text.textContent = texto.toUpperCase();

      document.body.appendChild(svg);
      svg.appendChild(rect);
      svg.appendChild(text);

      const svgString = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      svg.remove();

      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const container = document.createElement("div");
        container.classList.add("image-container");
        container.appendChild(canvas);
        document.getElementById("imageContainer").appendChild(container);

        const downloadBtn = document.createElement("button");
        downloadBtn.classList.add("download-btn");
        downloadBtn.textContent = "Download";
        downloadBtn.onclick = function () {
          const a = document.createElement("a");
          a.href = canvas.toDataURL();
          a.download = "avatar.png";
          a.click();
        };
        container.appendChild(downloadBtn);

        document.getElementById("avataresGerados").classList.add("show");
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgString);
    });