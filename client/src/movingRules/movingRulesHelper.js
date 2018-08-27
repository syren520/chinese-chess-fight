export const addMoveIfValid = ({location, availableMoves, board, color}) => {
    debugger;
    if (!isOutOfBoard(location) && !isSameColorPiece(location, board, color)) {
        availableMoves.push(location);
    }
};

export const isOutOfBoard = (location) => {
    const lx = location[0];
    const ly = location[1];

    if (lx < 0 || lx > 9) {
        return true;
    }

    if (ly < 0 || ly > 8) {
        return true;
    }

    return false;
};

export const isSameColorPiece = (location, board, color) => {
    const piece = board[location[0]][location[1]];

    return piece !== null && getPieceColor(piece) === color
};

export const getPieceColor = (piece) => {
    const strs = piece.split("_");

    return strs[0];
};