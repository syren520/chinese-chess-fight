import React, { Component } from 'react';
import './App.css';
import {cloneDeep} from 'lodash';
import {getMovesOfMa} from './movingRules/movingRules';
import {getPieceColor} from './movingRules/movingRulesHelper';

const CELL_WIDTH = 57;
const LEFT_START = 4;
const TOP_START = 3;
const NUM_OF_CELLS = 90;

// x 0 - 9
// y 0 - 8

const initializedBoard = [
    ['b_che_1', 'b_ma_1', 'b_xiang_1', 'b_shi_1', 'b_jiang_0', 'b_shi_2', 'b_xiang_2', 'b_ma_2', 'b_che_2'],
    [null, null, null, null, null, null, null, null, null],
    [null, 'b_pao_1', null, null, null, null, null, 'b_pao_2', null],
    ['b_zu_1', null, 'b_zu_2', null, 'b_zu_3', null, 'b_zu_4', null, 'b_zu_5'],
    [null, null, null, null, null, null, null, null, null],

    [null, null, null, null, null, null, null, null, null],
    ['r_bing_1', null, 'r_bing_2', null, 'r_bing_3', null, 'r_bing_4', null, 'r_bing_5'],
    [null, 'r_pao_1', null, null, null, null, null, 'r_pao_2', null],
    [null, null, null, null, null, null, null, null, null],
    ['r_che_1', 'r_ma_1', 'r_xiang_1', 'r_shi_1', 'r_shuai_0', 'r_shi_2', 'r_xiang_2', 'r_ma_2', 'r_che_2'],
];

const board = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],

    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
];

class App extends Component {
  state = {
      activatedPiece: null,
      availableMoves: [],
      pieces: {
          b_che_1: [0,0],
          b_ma_1: [0,1],
          b_xiang_1: [0,2],
          b_shi_1: [0,3],
          b_jiang_0: [0,4],
          b_shi_2: [0,5],
          b_xiang_2: [0,6],
          b_ma_2: [0,7],
          b_che_2: [0,8],

          b_pao_1: [2,1],
          b_pao_2: [2,7],

          b_zu_1: [3,0],
          b_zu_2: [3,2],
          b_zu_3: [3,4],
          b_zu_4: [3,6],
          b_zu_5: [3,8],

//--------------------

          r_che_1: [9,0],
          r_ma_1: [9,1],
          r_xiang_1: [9,2],
          r_shi_1: [9,3],
          r_shuai_0: [9,4],
          r_shi_2: [9,5],
          r_xiang_2: [9,6],
          r_ma_2: [9,7],
          r_che_2: [9,8],

          r_pao_1: [7,1],
          r_pao_2: [7,7],

          r_bing_1: [6,0],
          r_bing_2: [6,2],
          r_bing_3: [6,4],
          r_bing_4: [6,6],
          r_bing_5: [6,8],
      },
      board: board,
  };

  getPieceImage(piece) {
      return piece && this.getPieceImageName(piece) || 'oo';
  }

  getPieceName(piece) {
      const strs = piece.split("_");

      return strs[1];
  }

  getPieceImageName(piece) {
      const strs = piece.split("_");

      return `${strs[0]}_${strs[1]}`;
  }

  updateBoard() {
      const board = cloneDeep(this.state.board);

      Object.keys(this.state.pieces).map((piece) => {
          const coor = this.state.pieces[piece];

          board[coor[0]][coor[1]] = piece;
      });

      this.setState({
          board,
      });
  }

  handleClick = (piece, location) => {
      if (piece) {
          //todo: complete all pieces
          switch (this.getPieceName(piece)) {
              case 'ma':
                  const moves = getMovesOfMa(this.state.pieces[piece], this.state.board, getPieceColor(piece));

                  this.setState({
                      availableMoves: moves,
                      activatedPiece: piece
                  });
                  break;
              default:
                  this.setState({
                      activatedPiece: piece,
                      availableMoves: [],
                  });
                  break;

          }
      } else if (this.state.activatedPiece) {
          const newBoard = cloneDeep(this.state.board);
          const activatedPieceLocation = this.state.pieces[this.state.activatedPiece];

          newBoard[location[0]][location[1]] = this.state.activatedPiece;
          newBoard[activatedPieceLocation[0]][activatedPieceLocation[1]] = null;

          this.setState({
              pieces: {
                  ...this.state.pieces,
                  [this.state.activatedPiece]: location,
              },
              activatedPiece: null,
              board: newBoard,
              availableMoves: [],
          });
      }
  };

  renderBoard() {
      const cells = [];

      this.state.board.forEach((rowValue, rowNum) => {
          rowValue.forEach((piece, columnNum) => {
              console.log(this.state.availableMoves);
              const isAvailableMove = Boolean(this.state.availableMoves.find((location) => {
                  return location[0] === rowNum && location[1] === columnNum;
              }));
              const src = `./static/images/pieces/${this.getPieceImage(piece)}.gif`;
              cells.push(
                  <img
                      className={`${isAvailableMove ? 'availableMove' : ''} piece`}
                      src={require(`./static/images/pieces/${this.getPieceImage(piece)}.gif`)}
                      style={{left: LEFT_START + columnNum*CELL_WIDTH, top: TOP_START + rowNum*CELL_WIDTH}}
                      onClick={() => { this.handleClick(piece, [rowNum, columnNum]) }}
                  />
              );
          });
      });

      return cells;
  }

  render() {
    return (
      <div className="board">
          {
              this.renderBoard()
          }
      </div>
    );
  }

  componentDidMount() {
      this.updateBoard();
  }
}

export default App;