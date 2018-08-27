import {addMoveIfValid, isOutOfBoard} from '../movingRulesHelper';

const MAXIMUM_MOVE_X = 2;
const MAXIMUM_MOVE_Y = 2;

export const getMovesOfMa = (
    location, board, color
) => {
    const lx = location[0];
    const ly = location[1];

    const availableMoves = [];
    for (let x = 1; x <= MAXIMUM_MOVE_X; x++) {
        for (let y = 1; y <= MAXIMUM_MOVE_Y; y++) {
            if (x !== y) {
                const commonOpts = {
                    availableMoves,
                    board,
                    color,
                };

                if (x > y) {
                    // 纵向向日跳
                    // 检查 纵向 别马腿
                    if(!isOutOfBoard([lx + 1, ly]) && board[lx + 1][ly] === null) {
                        addMoveIfValid({...commonOpts, location: [lx + x, ly - y]});
                        addMoveIfValid({...commonOpts, location: [lx + x, ly + y]});
                    }

                    if (!isOutOfBoard([lx - 1, ly]) && board[lx - 1][ly] === null) {
                        addMoveIfValid({...commonOpts, location: [lx - x, ly - y]});
                        addMoveIfValid({...commonOpts, location: [lx - x, ly + y]});
                    }
                }

                if (x < y) {
                    // 横向日跳
                    // 检查 横向 别马腿
                    if(!isOutOfBoard([lx, ly + 1]) && board[lx][ly + 1] === null) {
                        // 向右方跳不别马腿
                        addMoveIfValid({...commonOpts, location: [lx + x, ly + y]});
                        addMoveIfValid({...commonOpts, location: [lx - x, ly + y]});
                    }

                    if (!isOutOfBoard([lx, ly - 1]) && board[lx][ly - 1] === null) {
                        // 向左方跳不别马腿
                        addMoveIfValid({...commonOpts, location: [lx + x, ly - y]});
                        addMoveIfValid({...commonOpts, location: [lx - x, ly - y]});
                    }
                }
            }
        }
    }

    return availableMoves;
};