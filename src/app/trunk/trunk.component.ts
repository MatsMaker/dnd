import {Component} from '@angular/core';

const ITEMS = [{
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

const SPACE_SIZE = [5, 4]


@Component({
  selector: 'app-trunk',
  templateUrl: './trunk.component.html',
  styleUrls: ['./trunk.component.css']
})
export class TrunkComponent {
  public items = ITEMS;
  public space: Array<any>;

  constructor() {
    this.space = this.createSpace(SPACE_SIZE);
  }

  public getItemClass(itemId) {
    const item = this.items.find(i => i.id === itemId);
    const stateClassName = (item.inTrunk) ? 'in-trunk' : '';
    return `item width-${item.size.width} height-${item.size.height} ${stateClassName}`;
  }

  public dragStart(event) {
    console.log('Element was dragged', event);
  }

  public onDrop(event, pointOfSpace) {
    if (!pointOfSpace.content) {
      this.droppedItemToPoint(event.dropData, pointOfSpace);
    }
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
          x: iX,
          y: iY
        });
      }
    }
    return space;
  }

  private takeUpPlaces(indexActiveItem, startPoint, toPoint) {
    const activeItem = this.items[indexActiveItem];
    for (let iY = startPoint.y; iY <= toPoint.y; iY++) {
      for (let iX = startPoint.x; iX <= toPoint.x; iX++) {
        activeItem.inTrunk = true;
        this.space[iY][iX].content = activeItem.id;
        if (startPoint.x === iX && startPoint.y === iY) {
          this.space[iY][iX].headPoint = true;
        }
      }
    }
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

  private enoughSpace(fromPoint, toPoint): boolean {
    return this.space[fromPoint.y][fromPoint.x].content === null
      && this.space
      && this.space[toPoint.y]
      && this.space[toPoint.y][toPoint.x]
      && this.space[toPoint.y][toPoint.x].content === null;
  }

  private droppedItemToPoint(itemId, pointOfSpace): void {
    const indexActiveItem = this.items.findIndex(i => i.id === itemId);
    const activeItem = this.items[indexActiveItem];
    const toPoint = {
      x: pointOfSpace.x + activeItem.size.width - 1,
      y: pointOfSpace.y + activeItem.size.height - 1
    };
    if (this.enoughSpace(pointOfSpace, toPoint)) {
      if (activeItem.inTrunk) {
        this.clearUpPlace(activeItem.id);
      }
      this.takeUpPlaces(indexActiveItem, pointOfSpace, toPoint);
    }
  }
}
