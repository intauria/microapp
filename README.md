# @angular-architects/microapp

This library support Micro App frontend development.

- [@angular-architects/microapp](#angular-architectsmicroapp)
  - [Supported features](#supported-features)
  - [Roadmap](#roadmap)
  - [Setup](#setup)
    - [Install `node_module`](#install-node_module)
    - [Shell](#shell)
    - [Micro App](#micro-app)
    - [Routing](#routing)
      - [Deeplinking from Shell to Micro App](#deeplinking-from-shell-to-micro-app)
      - [Experimental string-based Deeplinking from Shell to Micro App](#experimental-string-based-deeplinking-from-shell-to-micro-app)

## Supported features

- Multi Router support in the same window object
- Support for Angular 13+
- Messaging API based on CustomEvents
  - influenced by RxJS and NgRx Action Creators
- Deep Linking across different Micro Apps

## Roadmap

- Named router outlets w/i an Angular app
- Support for different versions and environment configs
- Headless shell infrastructure
- Cross tech support
  - React, Vue, AngularJS
- Distributed State Management

## Setup

### Install `node_module`

```
npm install @angular-architects/microapp 
```

### Shell
```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MicroAppRoutingModule.forShell({ name: 'shell' }),
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Micro App
```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MicroAppRoutingModule.forMicroApp({ name: 'microapp' }),
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Routing

Use normal Angular `route` definitions and the `routerLink` Directive.

#### Deeplinking from Shell to Micro App
```html
<a [routerLink]="[{ outlets: { 'microapp': 'mypath' }}]">Deeplink from Shell to Micro App -> mypath</a>
```

#### Experimental string-based Deeplinking from Shell to Micro App
```html
<a routerLink="(microapp:mypath)">Deeplink string from Shell to Micro App -> mypath</a>
```
