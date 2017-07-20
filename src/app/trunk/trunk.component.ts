import {Component} from '@angular/core';

const SPACE_SIZE = [5, 4]


interface SpacePoint {
  content: number | null,
  headPoint: boolean,
  inShadow: boolean,
  x: number,
  y: number
}

interface TrunkItem {
  id: number,
  name: string,
  inTrunk: boolean,
  size: {
    width: number,
    height: number
  }
}

interface Point {
  x: number,
  y: number
}


@Component({
  selector: 'app-trunk',
  templateUrl: './trunk.component.html',
  styleUrls: ['./trunk.component.css']
})
export class TrunkComponent {
  public items = ITEMS;
  public space: Array<SpacePoint[]>;
  public indexActiveItem: number;

  get activeItem(): TrunkItem {
    return this.items[this.indexActiveItem];
  }

  constructor() {
    this.space = this.createSpace();
  }

  public getItemClass(itemId): string {
    const item = this.items.find(i => i.id === itemId);
    const stateClassName = (item.inTrunk) ? 'in-trunk' : '';
    return `item width-${item.size.width} height-${item.size.height} ${stateClassName}`;
  }

  public dragStart(itemId): void {
    this.indexActiveItem = this.items.findIndex(i => i.id === itemId);
  }

  public dragEnd(): void {
    this.clearFromShadow();
  }

  public dragOver(pointOfSpace): void {
    this.reRenderShadow(pointOfSpace);
  }

  public onDrop(event, pointOfSpace): void {
    if (!pointOfSpace.content
      || this.space[pointOfSpace.y][pointOfSpace.x].content === event.dropData) {
      this.droppedItemToPoint(event.dropData, pointOfSpace);
    }
    if (this.isEndGame()) {
      alert('You is finished!')
    }
  }

  private clearFromShadow(): void {
    this._allTrunkArea((pointOfSpace) => {
      pointOfSpace.inShadow = false;
    });
  }

  private reRenderShadow(pointOfSpace): void {
    this.clearFromShadow();
    const toPoint = this._getToPoing(this.activeItem, pointOfSpace);
    this._allItemArea((pointOfSpace) => {
      pointOfSpace.inShadow = true;
    }, pointOfSpace, toPoint);
  }

  private createSpace(): Array<SpacePoint[]> {
    const space = [];
    for (let iX = 0; iX < SPACE_SIZE[0]; iX++) {
      for (let iY = 0; iY < SPACE_SIZE[1]; iY++) {
        if (space[iY] === undefined) {
          space[iY] = [];
        }
        const newPointOfSpace: SpacePoint = {
          content: null,
          headPoint: false,
          inShadow: false,
          x: iX,
          y: iY
        }
        space[iY].push(newPointOfSpace);
      }
    }
    return space;
  }

  private takeUpPlaces(startPoint: Point, toPoint: Point): void {
    const activeItem = this.items[this.indexActiveItem];
    this._allItemArea((pointOfSpace, coordinatesSpace) => {
      activeItem.inTrunk = true;
      pointOfSpace.content = activeItem.id;
      if (startPoint.x === coordinatesSpace.x
        && startPoint.y === coordinatesSpace.y) {
        pointOfSpace.headPoint = true;
      }
    }, startPoint, toPoint);
  }

  private clearUpPlace(itemId: number): void {
    this.space.map(row => {
      row.map(point => {
        if (point.content === itemId) {
          point.content = null;
          point.headPoint = false;
        }
      });
    });
  }

  private enoughSpaceForItem(itemId, fromPoint, toPoint): boolean {
    for (let iY = fromPoint.y; iY <= toPoint.y; iY++) {
      for (let iX = fromPoint.x; iX <= toPoint.x; iX++) {
        if (!(this.space
          && this.space[iY]
          && this.space[iY][iX]
          && (this.space[iY][iX].content === null
            || this.space[iY][iX].content === itemId))) {
              return false;
            }
      }
    }
    return true;
  }

  private droppedItemToPoint(itemId, pointOfSpace): void {
    const activeItem = this.items[this.indexActiveItem];
    const toPoint = this._getToPoing(activeItem, pointOfSpace);
    if (this.enoughSpaceForItem(activeItem.id, pointOfSpace, toPoint)) {
      if (activeItem.inTrunk) {
        this.clearUpPlace(activeItem.id);
      }
      this.takeUpPlaces(pointOfSpace, toPoint);
    }
  }

  private isEndGame(): boolean {
    return !this.items.find(i => !i.inTrunk)
  }

  private _getToPoing(activeItem, pointOfSpace): Point {
    return {
      x: pointOfSpace.x + activeItem.size.width - 1,
      y: pointOfSpace.y + activeItem.size.height - 1
    };
  }

  private _allItemArea(callback: Function, fromPoint: Point, toPoint: Point): void {
    for (let iY = fromPoint.y; iY <= toPoint.y; iY++) {
      for (let iX = fromPoint.x; iX <= toPoint.x; iX++) {
        if (this.space[iY]
          && this.space[iY][iX]) {
          callback(this.space[iY][iX], {x: iX, y: iY})
        }
      }
    }
  }

  private _allTrunkArea(callback: Function): void {
    for (let iY = 0; iY < this.space.length; iY++) {
      for (let iX = 0; iX < this.space[iY].length; iX++) {
        const selectpoint: Point = {
          x: iX,
          y: iY
        };
        callback(this.space[iY][iX], selectpoint)
      }
    }
  }
}


var ITEMS = [{
  id: 1,
  name: 'bike',
  inTrunk: false,
  size: {
    width: 4,
    height: 2
  },
}, {
  id: 2,
  name: 'cap',
  inTrunk: false,
  size: {
    width: 1,
    height: 1
  },
}, {
  id: 3,
  name: 'camp',
  inTrunk: false,
  size: {
    width: 2,
    height: 2
  }
}, {
  id: 4,
  name: 'lamp',
  inTrunk: false,
  size: {
    width: 1,
    height: 3
  }
}, {
  id: 5,
  name: 'cup',
  inTrunk: false,
  size: {
    width: 1,
    height: 2
  }
}, {
  id: 6,
  name: 'sugar',
  inTrunk: false,
  size: {
    width: 1,
    height: 2
  }
}]


// var ITEMS = [{
//   id: 1,
//   name: 'bike',
//   inTrunk: false,
//   size: {
//     width: 1,
//     height: 2
//   },
// }, {
//   id: 2,
//   name: 'cap',
//   inTrunk: false,
//   size: {
//     width: 2,
//     height: 3
//   },
// }, {
//   id: 3,
//   name: 'camp',
//   inTrunk: false,
//   size: {
//     width: 2,
//     height: 2
//   }
// }, {
//   id: 4,
//   name: 'lamp',
//   inTrunk: false,
//   size: {
//     width: 1,
//     height: 4
//   }
// }, {
//   id: 5,
//   name: 'cup',
//   inTrunk: false,
//   size: {
//     width: 1,
//     height: 2
//   }
// }, {
//   id: 6,
//   name: 'sugar',
//   inTrunk: false,
//   size: {
//     width: 2,
//     height: 1
//   }
// }]
