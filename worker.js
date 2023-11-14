import { dicom2nifti_run } from "./dicom2nifti.js"

self.addEventListener("message", function(event) {
	const dicom_files = event.data;
  
	const Dicom2NiftiModule = {
	  files: dicom_files,
	  passBack: function(result) {
		self.postMessage(result);
	  },
	  arguments: ["-z", "n", "-f", "%p_%t_%s", "-o", "/niiOut", "/dicomIn"],
	  TOTAL_MEMORY: 268435456
	};
	
  dicom2nifti_run(Dicom2NiftiModule);
});
