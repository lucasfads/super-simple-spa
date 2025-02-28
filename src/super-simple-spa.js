export default class SuperSimpleSPA {
	constructor( { elementsToUpdate = [ 'body' ] } = {} ) {
		this.config = { elementsToUpdate };
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
					this.loopElementsToUpdate( newDocument );
				});
			}
		});
	}

	updateElement( selector, newDocument ) {
		const element = document.querySelector( selector );
		const newElement = newDocument.querySelector( selector );
		element.innerHTML = newElement.innerHTML;
	}

	loopElementsToUpdate( newDocument ) {
		this.config.elementsToUpdate.forEach( elementToUpdate => {
			console.log( 'Updating element:', elementToUpdate );
			this.updateElement( elementToUpdate, newDocument );
		});
	}
}