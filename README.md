# Super Simples SPA

As the name suggests this a super simple plugin that turns a site into a Single Page Application.

## How to use
Simply import `super-simples-spa.js` as a module in all your pages, create a new instance of it and run the `init` method:

```js
import SuperSimpleSPA from './super-simple-spa.js';
const spa = new SuperSimpleSPA({});
spa.init();
```

### Configuration
#### Elements to change
You can define which elements in your HTML should be updated indicating their selectors.
```js
const spa = new SuperSimpleSPA(
	{
		"elementsToUpdate": ["main", "#sidebar"], // defaults to ["body"] only
	}
);
```