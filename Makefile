install: 
	npm ci install

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

make lint: 
	npx eslint

make jest:
	npx jest

make test-coverage:
	npx jest --coverage
