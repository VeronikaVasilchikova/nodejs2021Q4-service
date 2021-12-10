import { v4 as uuidv4 } from 'uuid';
import { IColumns, IBoardDataOptional } from '../helpers/interfaces';

export default class Board {
  id: string;

  title: string;

  columns: Array<IColumns>;

  constructor({
    id = uuidv4(),
    title = 'BOARD',
    columns = [{id: uuidv4(), title: 'column title', order: 1}]
  }: IBoardDataOptional = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
