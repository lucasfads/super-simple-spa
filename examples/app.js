import SuperSimpleSPA from '../src/super-simple-spa.js';

const spa = new SuperSimpleSPA(
	{
		"elementsToUpdate": ["main"]
	}
);
spa.init();