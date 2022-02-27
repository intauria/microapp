import { Inject, Injectable } from '@angular/core';
import { UrlHandlingStrategy, UrlSerializer, UrlTree } from '@angular/router';
import { deeplinkEvent } from '../javascript';
import { MICRO_APP_NAME } from './micro-app-name.token';

@Injectable()
export class MicroAppUrlHandlingStrategy implements UrlHandlingStrategy {
  shouldNavigate = true;

  constructor(
    private serializer: UrlSerializer,
    @Inject(MICRO_APP_NAME) private microAppName: string) {}

  extract(tree: UrlTree): UrlTree {
    // console.log('extract 1', this.microAppName);
    const strPath = tree?.root?.children?.['primary']?.segments?.[0]?.path;
    const strTree = strPath && strPath.startsWith('(') && strPath.endsWith(')') &&
      this.serializer.parse(strPath);

    // console.log('extract 2', strPath, strTree, this.microAppName);
    if (strTree) {
      this.sendDeeplinkEvent(strTree);
      this.shouldNavigate = false;
      return tree;
    } else {
      this.sendDeeplinkEvent(tree);
      this.shouldNavigate = true;
      return this.processInternalRoutes(tree);
    }
  }

  shouldProcessUrl(): boolean {
    // console.log('should navigate', this.shouldNavigate);
    return this.shouldNavigate;
  }

  merge(newUrlPart: UrlTree): UrlTree {
    return newUrlPart;
  }

  private getFlatTreeClone(tree: UrlTree): UrlTree {
    return Object.assign(new UrlTree, tree);
  }

  private processInternalRoutes(tree: UrlTree): UrlTree {
    // console.log('process internal routes 1', this.microAppName);
    const appUrlTree = tree?.root?.children?.['primary'] || tree?.root?.children?.[this.microAppName];
    const newTree = this.getFlatTreeClone(tree);

    if (appUrlTree) {
      newTree.root = appUrlTree;
    }

    /* console.log(
      'process internal routes 2',
      this.serializer.serialize(tree),
      appUrlTree,
      this.serializer.serialize(newTree),
      newTree,
      this.microAppName
    ); */

    return newTree;
  }

  private sendDeeplinkEvent(tree: UrlTree): void {
    Object.keys(tree.root.children)
      .filter(key => !(key === 'primary' || key === this.microAppName))
      .forEach(key => {
        const newTree = this.getFlatTreeClone(tree);
        newTree.root = tree.root.children[key];
        const url = this.serializer.serialize(newTree).slice(1);
        deeplinkEvent(key, url);
      });
  }
}
