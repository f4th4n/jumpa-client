# copy asset from this build to unity build

npx webpack
cp ./unity/index.html ~/Downloads/build/index.html
mkdir ~/Downloads/build/dist
cp ./dist/main.js ~/Downloads/build/dist/main.js
