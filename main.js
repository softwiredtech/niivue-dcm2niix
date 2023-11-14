import { Niivue, NVImage } from '@niivue/niivue'
import DcmWorker from "./worker?worker"

function initDcmWorker(nv, worker) {
    worker.addEventListener("message", async function(e) {
        if (e.data.length >= 1) {
            nv.setVolume(new NVImage(e.data[0].data), 0);
        }
    });
	
	worker.addEventListener("onerror", function(error) {
      console.log(error.message);
	});
}


async function handleFileSelection(fileInput) {
    return new Promise((resolve, reject) => {
        const files = fileInput.files;
        let loadCounter = 0;
        let resultFiles = [];
        
        for(let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            const f = files[i];

            reader.onload = (function(theFile) {
                return function(e1) {
                    const bytes = new Uint8Array(e1.target.result);
                    resultFiles.push({ "name": theFile.name, "data": bytes });
                        
                    if(++loadCounter === files.length) {
                    resolve(resultFiles);
                    }
                }
            })(f);
            
            reader.readAsArrayBuffer(f);
        }
    })
}

window.onload = async () => {
    const canvas = document.getElementById('gl');
    const worker = new DcmWorker();
    const nv = new Niivue();

    document.getElementById("fileSelection").addEventListener("click", (e) => {
        e.preventDefault();
        fileInput.click();
    });

    fileInput.addEventListener("change", async (event) =>  {
        const loadedDcms = await handleFileSelection(fileInput, nv)
        worker.postMessage(loadedDcms);
    });

    initDcmWorker(nv, worker);
    nv.attachToCanvas(canvas);
}
