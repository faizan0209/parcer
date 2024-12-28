document.getElementById('parseButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please upload a C++ file!');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const fileContent = event.target.result;
        const results = parseCpp(fileContent);
        document.getElementById('output').textContent = results;
    };

    reader.readAsText(file);
});

function parseCpp(fileContent) {
    const lines = fileContent.split('\n');
    let results = [];
    let inStructure = false;
    let structureStart = null;
    let structureType = null;
    let braceCount = 0;
    let forCounter = 1;
    let ifElseCounter = 1;

    lines.forEach((line, lineNumber) => {
        const strippedLine = line.trim();

        if (!inStructure) {
            if (strippedLine.match(/^\s*for\s*\(.*\)\s*{/)) {
                inStructure = true;
                structureStart = lineNumber + 1;  
                structureType = `For loop ${forCounter}`;
                forCounter++;
            }
            
            else if (strippedLine.match(/^\s*if\s*\(.*\)\s*{/)) {
                inStructure = true;
                structureStart = lineNumber + 1;
                structureType = `If condition ${ifElseCounter}`;
                ifElseCounter++;
            }
            
            else if (strippedLine.match(/^\s*else\s*{/)) {
                inStructure = true;
                structureStart = lineNumber + 1;
                structureType = `Else condition ${ifElseCounter}`;
                ifElseCounter++;
            }
        }

        if (inStructure) {
            braceCount += (strippedLine.match(/{/g) || []).length;
            braceCount -= (strippedLine.match(/}/g) || []).length;

            if (braceCount === 0) {
                results.push(`${structureType} starts at line ${structureStart} and ends at line ${lineNumber + 1}`);
                inStructure = false;
            }
        }
    });

    return results.length > 0 ? results.join('\n') : 'No valid structures detected.';
}
