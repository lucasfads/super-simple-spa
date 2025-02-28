export default class SuperSimpleSPA {
	constructor( config = {} ) {
		this.config = config;
	}

	init() {
		this.body = document.querySelector( 'body' );
		this.body.addEventListener( 'click', ( event ) => {
			this.interceptLinks( event );
		});

		console.log( 'SuperSimpleSPA initialized' );
	}

	interceptLinks(event) {
		const link = event.target.closest( 'a' );
		if ( link && link.hostname === window.location.hostname ) {
			event.preventDefault();
			const path = link.pathname;
			this.handleReload( path );
		}
	}

	handleReload(path, method = 'GET', data = null) {
		const url = new URL( path, window.location.origin );
		history.pushState( null, null, url );
		const response = fetch( url, {
			method: method,
			body: data,
		});
		
		response.then( response => {
			if ( response.ok ) {
				const responseContent = response.text();
				responseContent.then( content => {
					const parser = new DOMParser();
					const newDocument = parser.parseFromString( content, 'text/html' );
					const elementToUpdate = 'body';
					const newBody = newDocument.querySelector( elementToUpdate );
					this.updateElement( elementToUpdate, newBody.innerHTML );
				});
			}
		});
	}

	updateElement( selector, newHtml ) {
		const element = document.querySelector( selector );
		element.innerHTML = newHtml;
	}
}