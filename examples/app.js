import SuperSimpleSPA from '../src/super-simple-spa.js';

const spa = new SuperSimpleSPA(
	{
		"elementsToUpdate": ["title", "main"]
	}
);
spa.init();

document.addEventListener( 'spaPageLoaded', () => {
	console.log( 'spaPageLoaded event fired' );
});