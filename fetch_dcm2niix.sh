#!/bin/bash

dcm2niix_js="https://raw.githubusercontent.com/wpmed92/WebMRI/master/src/app/src/brainbrowser/volume-viewer/plugins/dicom2nifti.js"
dcm2niix_mem="https://github.com/wpmed92/WebMRI/raw/master/src/app/src/brainbrowser/volume-viewer/workers/dicom2nifti.html.mem"

curl -L -o dicom2nifti.js $dcm2niix_js
curl -L -o dicom2nifti.html.mem $dcm2niix_mem
sed -i '' -e '1s/^/export /' dicom2nifti.js

echo "dicom2nifti asm.js fetched"
