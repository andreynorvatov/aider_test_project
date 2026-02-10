# Router Directory

This directory contains routing configuration.

## Files
- `index.js` - Router configuration and exports
- `routes.js` - Route definitions
- `guards.js` - Navigation guards (auth, permissions)

## Example Structure
```javascript
// routes.js
export const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/login', component: LoginPage, public: true },
];
```
