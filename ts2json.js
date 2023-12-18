// Import necessary libraries
const fs = require("fs");
const path = require("path");

// Check if a file name has been provided as a command line argument
if (process.argv.length < 3) {
  console.error("Please provide a filename as a command line argument");
  process.exit(1);
}

// Get the file name from the command line arguments
const fileName = process.argv[2];

// Read the file
fs.readFile(fileName, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    process.exit(1);
  }

  // Create the embeddings directory if it doesn't exist
  if (!fs.existsSync("./embeddings")) {
    fs.mkdirSync("./embeddings");
  }

  // Replace double quotes with single quotes and new lines with \n
  const code = data.replace(/"/g, "'").replace(/\n/g, "\\n");

  // Generate JSON
  const json = JSON.stringify({
    filename: path.basename(fileName),
    language: "typescript",
    code,
  });

  // Write JSON to a new file in the embeddings directory
  fs.writeFile(
    `./embeddings/${path.basename(fileName)}.json`,
    json,
    "utf8",
    (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
        process.exit(1);
      }

      console.log(`JSON file ${fileName}.json has been saved successfully`);
    }
  );
});
