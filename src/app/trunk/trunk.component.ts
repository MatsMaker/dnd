import {Component} from '@angular/core';

const ITEMS = [{
  id: 0,
  name: 'bike',
  inTrunk: false,
  size: {
    width: 4,
    height: 2
  },
}, {
  id: 1,
  name: 'cap',
  inTrunk: false,
  size: {
    width: 1,
    height: 1
  },
}, {
  id: 2,
  name: 'camp',
  inTrunk: false,
  size: {
    width: 2,
    height: 2
  }
}, {
  id: 3,
  name: 'lamp',
  inTrunk: false,
  size: {
    width: 1,
    height: 3
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

  public getItemClass(item) {
    const stateClassName = (item.inTrunk) ? 'in-trunk' : '';
    return `item width-${item.size.width} height-${item.size.height} ${stateClassName}`;
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
          x: iX,
          y: iY
        });
      }
    }
    return space;
  }

  public dragStart(event) {
    console.log('Element was dragged', event);
  }

  public onDrop(event, pointOfSpace) {
    if (!pointOfSpace.content) {
      this.droppedItemToPoint(event.dropData, pointOfSpace);
    }
  }

  private droppedItemToPoint(item, pointOfSpace): void {
    const activeItem = this.items.find(i => i.id === item.id);
    const lastY = pointOfSpace.y + activeItem.size.height - 1;
    const lastX = pointOfSpace.x + activeItem.size.width - 1;
    if (this.space
      && this.space[lastY]
      && this.space[lastY][lastX]
      && this.space[lastY][lastX].content === null) {

      for (let iY = pointOfSpace.y; iY <= lastY; iY++) {
        for (let iX = pointOfSpace.x; iX <= lastX; iX++) {
          activeItem.inTrunk = true;
          this.space[iY][iX].content = activeItem.id;
        }
      }

    }
  }
}
