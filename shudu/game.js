class SudokuGenerator {
    constructor() {
        this.sudoku = [];
        this.size = 9;
    }

    generateSudoku() {
        // 初始化数独矩阵
        for (let i = 0; i < this.size; i++) {
            this.sudoku.push([]);
            for (let j = 0; j < this.size; j++) {
                this.sudoku[i].push(0);
            }
        }

        // 随机填充数独
        this.fillSudoku();

        // 返回打印的数独字符串
        return this.printSudoku();
    }

    fillSudoku() {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // 在每行中填充数字
        for (let i = 0; i < this.size; i++) {
            // 每次都打乱数字的顺序
            numbers.sort(() => Math.random() - 0.5);
            for (let j = 0; j < this.size; j++) {
                const num = numbers[j];
                // 检查行、列、宫格是否满足数独规则
                if (this.checkValid(i, j, num)) {
                    this.sudoku[i][j] = num;
                }
            }
        }
    }

    checkValid(row, col, num) {
        // 检查行是否合法
        for (let i = 0; i < 9; i++) {
            if (this.sudoku[row][i] === num) {
                return false;
            }
        }

        // 检查列是否合法
        for (let i = 0; i < 9; i++) {
            if (this.sudoku[i][col] === num) {
                return false;
            }
        }

        // 检查宫格是否合法
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (this.sudoku[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    printSudoku() {
        let sudokuString = "Generated Sudoku:";
        for (let i = 0; i < 9; i++) {
            sudokuString += "\n";
            if (i % 3 === 0 && i !== 0) {
                sudokuString += "---------------------\n";
            }
            for (let j = 0; j < 9; j++) {
                if (j % 3 === 0 && j !== 0) {
                    sudokuString += "| ";
                }
                sudokuString += this.sudoku[i][j] + " ";
            }
        }
        console.log(sudokuString);
        return sudokuString;
    }



    // 新方法：设置指定位置的数字并返回填入后的字符串
    // 新方法：设置指定位置的数字并返回填入后的字符串
    setCell(row, col, num) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size || num < 1 || num > 9) {
            return "Invalid input.";
        }

        // 保存原始样式的数字矩阵
        const originalSudoku = JSON.parse(JSON.stringify(this.sudoku));

        // 设置指定位置的数字
        this.sudoku[row][col] = num;

        // 获取填入数字后的样式化数独字符串
        const styledSudoku = this.printStyledSudoku();

        // 恢复原始样式的数字矩阵
        this.sudoku = originalSudoku;

        // 返回填入后的字符串
        return styledSudoku;
    }


    // 新方法：打印样式化的数独矩阵
    printStyledSudoku() {
        let sudokuString = "Generated Sudoku:";
        for (let i = 0; i < 9; i++) {
            sudokuString += "\n";
            if (i % 3 === 0 && i !== 0) {
                sudokuString += "---------------------\n";
            }
            for (let j = 0; j < 9; j++) {
                if (j % 3 === 0 && j !== 0) {
                    sudokuString += "| ";
                }
                sudokuString += this.getStyle(this.sudoku[i][j]) + " ";
            }
        }
        console.log(sudokuString);
        return sudokuString;
    }

    // 新方法：获取指定数字的样式
    getStyle(num) {
        // 定义样式映射表
        const styleMap = {
            1: "1️⃣",
            2: "2️⃣",
            3: "3️⃣",
            4: "4️⃣",
            5: "5️⃣",
            6: "6️⃣",
            7: "7️⃣",
            8: "8️⃣",
            9: "9️⃣"
        };
        // 返回数字的样式
        return styleMap[num] || num;
    }

}
module.exports = {SudokuGenerator};
