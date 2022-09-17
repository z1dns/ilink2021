const fileInput = document.querySelector("input[type=file]");
const fileButton = document.querySelector(".file-area button");
fileButton.addEventListener('click', () => {fileInput.click();});
fileInput.addEventListener('change', () => {handleFiles(fileInput.files);});

function handleFiles(files) {
    const fileContainer = document.querySelector(".file-container");
    clearCont(fileContainer);
    const fileCount = 3;
    let fileArray = [...files].slice(0, fileCount);
    for (let file of fileArray) {
        appendFilePreview(file, fileContainer);
    }
}

function clearCont(fileContainer) {
    console.log(fileContainer);
    while(fileContainer.firstChild) {
        fileContainer.firstChild.remove();
    }
}

const dropArea = document.querySelector(".file-area");

function preventDefaults (event) {
    event.preventDefault();
    event.stopPropagation();
}

function highlight(f) {
    if (f) {
        dropArea.classList.add('active');
    }
    else {
        dropArea.classList.remove('active');
    }
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, (event) => {
        preventDefaults(event);
        highlight(true);
    });
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, (event) => {
        preventDefaults(event);
        highlight(false);
    });
});

dropArea.addEventListener('drop', (event) => {
    handleFiles(event.dataTransfer.files);
});

function bytesToMegabytes(bytes) {
    return (bytes / 1024 / 1024).toFixed(2);
} 

function addPreview(filePreview, file, format) {
    let imageFormats = new Set(["png", "jpeg", "gif"]);
    let image = filePreview.querySelector(".preview");
    if (imageFormats.has(format)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            image.src = reader.result;
        }    
    }
    else {
        image.style.display = "none";
    }
}

function appendFilePreview(file, container) {
    const template = document.getElementById("file-template");
    let fileElement = template.content.firstElementChild.cloneNode(true);
    let dotIdx = file.name.lastIndexOf(".");
    let fileName = fileElement.querySelector(".name");
    fileName.textContent = file.name.slice(0, dotIdx);
    let format = file.name.slice(dotIdx + 1);
    let fileDescription = fileElement.querySelector(".format-and-size");
    fileDescription.textContent = `${format} ${bytesToMegabytes(file.size)}MB`;
    addPreview(fileElement, file, format);
    let removeButton = fileElement.querySelector(".remove-button");
    removeButton.addEventListener('click', () => {
        fileElement.remove();
    });
    container.appendChild(fileElement);
}