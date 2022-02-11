import { Inject, Injectable } from '@angular/core';
import { UrlHandlingStrategy, UrlSegmentGroup, UrlSerializer, UrlTree } from '@angular/router';
import { createMessage } from '../../messaging/event-messaging';
import { MICRO_APP_NAME } from './micro-app-name.token';

@Injectable()
export class MicroAppUrlHandlingStrategy implements UrlHandlingStrategy {
  private appUrlTree: UrlSegmentGroup | undefined;

  constructor(
    private serializer: UrlSerializer,
    @Inject(MICRO_APP_NAME) private microAppName: string
  ) {}

  extract(tree: UrlTree): UrlTree {
    // console.log(tree);
    this.appUrlTree = tree.root.children['primary'] || tree.root.children[this.microAppName];
    if (this.appUrlTree) {
      tree.root = this.appUrlTree;
    }
    const url = this.serializer.serialize(tree);
    // console.log('extract', url, this.appUrlTree, tree);
    return tree;
  }

  shouldProcessUrl(tree: UrlTree): boolean {
    // console.log('should', !!tree?.root);
    return !!tree?.root
  }

  merge(newUrlPart: UrlTree): UrlTree {
    return newUrlPart;
  }
}
