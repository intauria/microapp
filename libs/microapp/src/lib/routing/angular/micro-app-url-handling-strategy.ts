import { Inject, Injectable } from '@angular/core';
import { UrlHandlingStrategy, UrlSerializer, UrlTree } from '@angular/router';
import { deeplinkEvent } from '../javascript';
import { MICRO_APP_NAME } from './micro-app-name.token';

@Injectable()
export class MicroAppUrlHandlingStrategy implements UrlHandlingStrategy {
  constructor(
    private serializer: UrlSerializer,
    @Inject(MICRO_APP_NAME) private microAppName: string
  ) {}

  extract(tree: UrlTree): UrlTree {
    this.sendDeeplinkEvent(tree);
    return this.processInternalRoutes(tree);
  }

  shouldProcessUrl(tree: UrlTree): boolean {
    // console.log('should', !!tree?.root);
    return !!tree?.root
  }

  merge(newUrlPart: UrlTree): UrlTree {
    return newUrlPart;
  }

  private getNewTree(tree: UrlTree): UrlTree {
    return Object.assign(new UrlTree, tree);
  }

  private processInternalRoutes(tree: UrlTree): UrlTree {
    // console.log('extract 1', tree);
    const appUrlTree = tree.root.children['primary'] || tree.root.children[this.microAppName];
    const newTree = this.getNewTree(tree);
    if (appUrlTree) {
      newTree.root = appUrlTree;
    }
    // const url = this.serializer.serialize(newTree);
    // console.log('extract 2', url, appUrlTree, tree, newTree);
    return newTree;
  }

  private sendDeeplinkEvent(tree: UrlTree): void {
    Object.keys(tree.root.children)
    .filter(key => !(key === 'primary' || key === this.microAppName))
    .forEach(key => {
      const myTree = this.getNewTree(tree);
      myTree.root = tree.root.children[key];
      const url = this.serializer.serialize(myTree).slice(1);
      // console.log(key, url);
      deeplinkEvent(key, url);
    });
  }
}
