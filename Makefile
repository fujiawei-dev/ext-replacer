dep:
	npm install -g npm
	npm i vsce -g
	npm i yarn -g

build: clean
	vsce package

clean:
	-rm -r out/
	-rm replacer-*
