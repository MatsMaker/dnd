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
    for (let iColumn = 0; iColumn < spaceSize[1]; iColumn++) {
      for (let iRow = 0; iRow < spaceSize[0]; iRow++) {
        if (space[iColumn] === undefined) {
          space[iColumn] = [];
        }
        space[iColumn].push({
          content: null,
          x: iColumn,
          y: iRow
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
    if (this.space[pointOfSpace.x + activeItem.size.width]
      && this.space[pointOfSpace.x + activeItem.size.width][pointOfSpace.y + activeItem.size.height]
      && this.space[pointOfSpace.x + activeItem.size.width][pointOfSpace.y + activeItem.size.height].content === null) {

    }
    if (!this.space[pointOfSpace.x + activeItem.size.width][pointOfSpace.y + activeItem.size.height].content) {
      activeItem.inTrunk = true;
      this.space[pointOfSpace.x][pointOfSpace.y].content = activeItem.name;
    }
  }
}
