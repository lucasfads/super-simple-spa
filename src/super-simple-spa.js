export default class SuperSimpleSPA {
	constructor( { elementsToUpdate = [ 'body' ] } = {} ) {
		this.config = { elementsToUpdate };
	}

	init() {
		this.body = document.querySelector( 'body' );
		this.body.addEventListener( 'click', ( event ) => {
			this.interceptLinks( event );
		});
		this.body.addEventListener( 'submit', ( event ) => {
			this.interceptForms( event );
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

	interceptForms(event) {
		const form = event.target.closest( 'form' );
		if ( form ) {
			const path = form.action;
			const pathUrl = new URL( path );
			if (pathUrl.hostname === window.location.hostname) {
				event.preventDefault();
				const method = form.method;
				const data = new FormData( form );
				this.handleReload( path, method, data );
			}
		}
	}

	handleReload(path, method = 'GET', data = null) {
		const url = new URL( path, window.location.origin );
		history.pushState( null, null, url );
		const requestInit = {
			method: method,
		};
		if (!['GET', 'HEAD'].includes(method.toUpperCase()))
			requestInit.body = data;
		const response = fetch( url, requestInit );
		
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
			this.updateElement( elementToUpdate, newDocument );
		});
	}
}