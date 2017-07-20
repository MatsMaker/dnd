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

const SPACE_SIZE = [4, 5]


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
        if (space[iRow] === undefined) {
          space[iRow] = [];
        }
        space[iRow].push({
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
    if (this.space
      && this.space[pointOfSpace.x + activeItem.size.width - 1]
      && this.space[pointOfSpace.x + activeItem.size.width - 1][pointOfSpace.y + activeItem.size.height - 1]
      && this.space[pointOfSpace.x + activeItem.size.width - 1][pointOfSpace.y + activeItem.size.height - 1].content === null) {
      activeItem.inTrunk = true;
      this.space[pointOfSpace.x][pointOfSpace.y].content = activeItem.name;
    }
  }
}
