import {Component} from '@angular/core';

const SPACE_SIZE = [5, 4]


@Component({
  selector: 'app-trunk',
  templateUrl: './trunk.component.html',
  styleUrls: ['./trunk.component.css']
})
export class TrunkComponent {
  public items = ITEMS;
  public space: Array<any>;
  public indexActiveItem;

  get activeItem() {
    return this.items[this.indexActiveItem];
  }

  constructor() {
    this.space = this.createSpace(SPACE_SIZE);
  }

  public getItemClass(itemId) {
    const item = this.items.find(i => i.id === itemId);
    const stateClassName = (item.inTrunk) ? 'in-trunk' : '';
    return `item width-${item.size.width} height-${item.size.height} ${stateClassName}`;
  }

  public dragStart(event, itemId) {
    this.indexActiveItem = this.items.findIndex(i => i.id === itemId);
  }

  public dragEnd() {
    this.clearFromShadow();
  }

  public dragOver(pointOfSpace) {
    this.reRenderShadow(pointOfSpace);
  }

  public onDrop(event, pointOfSpace) {
    if (!pointOfSpace.content
      || this.space[pointOfSpace.y][pointOfSpace.x].content === event.dropData) {
      this.droppedItemToPoint(event.dropData, pointOfSpace);
    }
    if (this.isEndGame()) {
      alert('You is finished!')
    }
  }

  private clearFromShadow() {
    this._allTrunkArea((pointOfSpace) => {
      pointOfSpace.inShadow = false;
    });
  }

  private reRenderShadow(pointOfSpace) {
    this.clearFromShadow();
    const toPoint = this._getToPoing(this.activeItem, pointOfSpace);
    this._allItemArea((pointOfSpace) => {
      pointOfSpace.inShadow = true;
    }, pointOfSpace, toPoint);
  }

  private createSpace(spaceSize) {
    const space = [];
    for (let iX = 0; iX < spaceSize[0]; iX++) {
      for (let iY = 0; iY < spaceSize[1]; iY++) {
        if (space[iY] === undefined) {
          space[iY] = [];
        }
        space[iY].push({
          content: null,
          headPoint: false,
          inShadow: false,
          x: iX,
          y: iY
        });
      }
    }
    return space;
  }

  private takeUpPlaces(startPoint, toPoint) {
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

  private clearUpPlace(itemId) {
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

  private isEndGame() {
    return !this.items.find(i => !i.inTrunk)
  }

  private _getToPoing(activeItem, pointOfSpace) {
    return {
      x: pointOfSpace.x + activeItem.size.width - 1,
      y: pointOfSpace.y + activeItem.size.height - 1
    };
  }

  private _allItemArea(fn, fromPoint, toPoint) {
    for (let iY = fromPoint.y; iY <= toPoint.y; iY++) {
      for (let iX = fromPoint.x; iX <= toPoint.x; iX++) {
        if (this.space[iY]
          && this.space[iY][iX]) {
          fn(this.space[iY][iX], {x: iX, y: iY})
        }
      }
    }
  }

  private _allTrunkArea(fn) {
    for (let iY = 0; iY < this.space.length; iY++) {
      for (let iX = 0; iX < this.space[iY].length; iX++) {
        fn(this.space[iY][iX], {x: iX, y: iY})
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
