export default class SuperSimpleSPA {
	constructor( config = {} ) {
		this.config = config;
	}

	init() {
		const body = document.querySelector( 'body' );
		body.addEventListener( 'click', ( event ) => {
			this.interceptLinks( event );
		});

		console.log( 'SuperSimpleSPA initialized' );
	}

	interceptLinks(event) {
		const link = event.target.closest( 'a' );
		if ( link && link.hostname === window.location.hostname ) {
			event.preventDefault();
			console.log( 'Link clicked:', link.href );
		}
	}
}