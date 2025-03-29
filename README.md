# Super Simple SPA

As the name suggests, this a super simple plugin that makes a website function as a Single Page Application.

## How to use
Simply import `super-simples-spa.js` as a module in all your pages, create a new instance of it and run the `init` method:

```js
import SuperSimpleSPA from './super-simple-spa.js';
const spa = new SuperSimpleSPA({});
spa.init();
```

### Configuration
#### Elements to change
You can define which elements in your HTML should be updated indicating their selectors:
```js
const spa = new SuperSimpleSPA(
	{
		"elementsToUpdate": ["title", "main", "#sidebar"], // defaults to ["title", "body"]
	}
);
```

#### Custom event
A custom event, `spaPageLoaded`, is dispached whenever a page is loaded via this plugin (either via a link or a form). You can listen to this event to do whatever you want:
```js
document.addEventListener( 'spaPageLoaded', () => {
	console.log( 'spaPageLoaded event fired' );
});
```