gebo-client-performatives
=========================

AngularJS speech act module for gebo

## Install

```
% bower install gebo-client-performatives --save
```

## Point your app to its location:

The following will, of course, vary by project

### On page load (e.g., index.html)

```
<script src="components/gebo-client-performatives/dist/gebo-client-performatives.min.js"></script>
```

### Inject into the app (e.g., app.js)

```
angular.module('myApp', ['ngRoute', 'gebo-client-performatives']).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
                })
            .otherwise({
                redirectTo: '/'
                });
      });
```

### Unit tests (e.g., karma.conf.js)

```
files = [
    JASMINE,
    JASMINE_ADAPTER,
    'app/components/angular/angular.js',
    'app/components/angular-mocks/angular-mocks.js',
    'app/components/angular-resource/angular-resource.js',
    'app/components/angular-route/angular-route.js',
    'app/components/gebo-client-performatives/dist/gebo-client-performatives.min.js',
    'app/scripts/*.js',
    'app/scripts/**/*.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
  ];
```

