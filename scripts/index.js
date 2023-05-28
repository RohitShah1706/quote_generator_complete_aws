const sharp = require("sharp");
const axios = require("axios");
const apiUrl = "https://zenquotes.io/api/random";

// fetch a random quote
// turn text of quote into lines (quote Text received)
// turn text of author into a line (quote author)
// add a quote image
// turn these elements --> SVG
// SVG --> image as PNG (/base64 in AWS lambda)

const getRandomeQuote = async (apiUrlInput) => {
  const response = await axios.get(apiUrlInput);

  const quoteText = response.data[0].q;
  const quoteAuthor = response.data[0].a;

  // Image construction
  const width = 750;
  const height = 483;
  const text = quoteText;
  const words = text.split(" ");
  const lineBreak = 4;
  let newText = "";

  // Define some tspanElements w/ 4 words each
  let tspanElements = "";
  for (let i = 0; i < words.length; i++) {
    newText += words[i] + " ";
    if ((i + 1) % lineBreak === 0) {
      tspanElements += `<tspan x="${width / 2}" dy="1.2em">${newText}</tspan>`;
      newText = "";
    }
  }
  if (newText !== "") {
    tspanElements += `<tspan x="${width / 2}" dy="1.2em">${newText}</tspan>`;
  }
  console.log(tspanElements);

  // Construct the SVG
  const svgImage = `
          <svg width="${width}" height="${height}">
              <style>
                 .title { 
                   fill: #ffffff; 
                  font-size: 20px; 
                     font-weight: bold;
                }
               .quoteAuthorStyles {
                     font-size: 35px;
                    font-weight: bold;
                   padding: 50px;
              }
                .footerStyles {
                  font-size: 20px;
                     font-weight: bold;
                    fill: lightgrey;
                   text-anchor: middle;
                  font-family: Verdana;
              }
              </style>
              <circle cx="382" cy="76" r="44" fill="rgba(255, 255, 255, 0.155)"/>
              <text x="382" y="76" dy="50" text-anchor="middle" font-size="90" font-family="Verdana" fill="white">"</text>
              <g>
                  <rect x="0" y="0" width="${width}" height="auto"></rect>
                     <text id="lastLineOfQuote" x="375" y="120" font-family="Verdana" font-size="35" fill="white" text-anchor="middle">
                        ${tspanElements}
                    <tspan class="quoteAuthorStyles" x="375" dy="1.8em">- ${quoteAuthor}</tspan>
               </text>
                </g>
              <text x="${width / 2}" y="${
    height - 10
  }" class="footerStyles">Developed by @RohitShah1706 | Quotes from ZenQuotes.io</text>
          </svg>
        `;

  // add background images for the svg creation
  const backgroundImages = [
    "backgrounds/Aubergine.png",
    "backgrounds/Mantle.png",
    "backgrounds/Midnight-City.png",
    "backgrounds/Orangey.png",
  ];

  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  const selectedBackground = backgroundImages[randomIndex];

  // composite this image together
  const timestamp = new Date().toLocaleString().replace(/[^\d]/g, "");
  const svgBuffer = Buffer.from(svgImage);
  const image = await sharp(selectedBackground)
    .composite([
      {
        input: svgBuffer,
        top: 0,
        left: 0,
      },
    ])
    .toFile(`finals/quote-card_${timestamp}.png`);
};

getRandomeQuote(apiUrl);
