// import { RenderedStyledTable } from 'https://unpkg.com/styled-cli-table/module/precomposed/RenderedStyledTable.js';
import { border, borderCharacters } from 'https://unpkg.com/styled-cli-table/module/styles/border.js';

import { PrintLineBuffer } from 'https://unpkg.com/styled-cli-table/module/printline/PrintLineBuffer.js';
import { BorderRenderer, PaddingRenderer, AlignRenderer, FlexSizeRenderer, GenericBufferedRenderer } from 'https://unpkg.com/styled-cli-table/module/renderers/index.js';
import { ComposableRenderedStyledTable } from 'https://unpkg.com/styled-cli-table/module/composable/ComposableRenderedStyledTable.js';

const COLUMN_MIN_CHARS = 10

function renderTable(targetId, data) {
    const fontSizeStyle = window.getComputedStyle(document.querySelector(targetId), null).fontSize;
    const fontSize = parseFloat(fontSizeStyle)
    const availableWidthLastCol = window.winbox?.width - (2 * COLUMN_MIN_CHARS * fontSize) || 0
    const availableMaxChars = (availableWidthLastCol / fontSize).toFixed(0)
    const lastColumnMaxChars = Math.max(COLUMN_MIN_CHARS, availableMaxChars)
    console.log('fontsize', fontSize, 'availableMaxChars', lastColumnMaxChars, 'winbox.width', window.winbox?.width, 'ratio', window.winbox?.width / availableMaxChars)

    function PrettyCropRenderer(BufferedRenderer) {
        return class extends BufferedRenderer {
            // extend & override
            fillBlock(buffer, x, y, content, width, height, cell, computedStyles) {
                // console.log('available height', height, 'req. height', breakLines(content, width).length, 'width', width, 'lastColMaxChars', lastColumnMaxChars)
                super.fillBlock(buffer, x, y, breakLines(content, width), width, height + 5, cell, computedStyles)
            }
            // extend & override
            fillLine(buffer, x, y, content, width, cell, computedStyles) {
                super.fillLine(buffer, x, y, crop(content, width, cell.style.get('crop')), width, cell, computedStyles);
            }
        };
    }

    function breakLine(line, width, newContent) {
        if (line.length <= width) {
            newContent.push(line);
        } else {
            let substring = '';
            let cursor = 0;
            do {
                let breakAt = width;
                do {
                    const charAfterBreak = line[cursor + breakAt]
                    const goodBreakPoint = [' ', ',', '.', '!', '?', '-', '&'].includes(charAfterBreak)
                    const exceedsLineLength = (cursor + breakAt) >= line.length
                    if (goodBreakPoint) {
                        substring = line.substring(cursor, cursor + breakAt);
                        if (substring)
                            newContent.push(substring.trim());
                        cursor += breakAt;
                        breakAt = -1
                    } else {
                        breakAt--;
                        if (breakAt === 0 || goodBreakPoint || exceedsLineLength) {
                            substring = line.substring(cursor, cursor + width);
                            if (substring)
                                newContent.push(substring.trim());
                            cursor += width;
                            breakAt = -1
                        }
                    }
                } while (breakAt > 0)
            } while (substring && cursor <= line.length);
        }
    }

    function breakLines(content, width) {
        const newContent = []
        if (Array.isArray(content)) {
            for (const line of content) {
                breakLine(line, width, newContent);
            }
        } else {
            breakLine(content, width, newContent);
        }
        return newContent
    }

    function crop(content, width, cropString = '') {
        return content.length > width ?
            content.substring(0, width - cropString.length) + cropString :
            content;
    }

    const CustomStyledTable = ComposableRenderedStyledTable(
        PrintLineBuffer,
        GenericBufferedRenderer,
        FlexSizeRenderer,
        AlignRenderer,
        PrettyCropRenderer,
        PaddingRenderer,
        BorderRenderer
    );

    if (!window.winbox) return
    const singleWithPlus = borderCharacters('─', '│', '+', '+', '+', '+', '+', '+', '+', '+', '+');

    const styles = {
        // table level styles
        ...border(true),
        crop: '..',
        borderCharacters: singleWithPlus,
        paddingLeft: 1, paddingRight: 1,
        rows({ rowIndex, data }) { // functional row styles
            // center first row
            if (rowIndex === 0) return { align: 'center' }

            // row height is the number of available lines. We calculate row height dynamically based on content. We only want to change height for work experience and education data, which has 3 columns
            if (data[rowIndex].length === 3) {
                const lastRowIndex = data[rowIndex].length - 1
                const lines = data[rowIndex][lastRowIndex]
                // actualWidth seems to be lower by 2 than what is set
                const actualWidth = lastColumnMaxChars - 2
                // use same function for calculating neededHeight wich is used to break lines
                const neededHeight = breakLines(lines, actualWidth).length
                console.log(neededHeight, actualWidth)
                return { height: neededHeight }
            }
        },
        columns: { // column level styles
            0: { // first column
                minWidth: COLUMN_MIN_CHARS
            },
            1: {
                minWidth: COLUMN_MIN_CHARS
            },
            [-1]: { // last column
                minWidth: lastColumnMaxChars,
                width: lastColumnMaxChars,
                maxWidth: lastColumnMaxChars,
            }
        }
    };

    // const table = new RenderedStyledTable(workExperienceData, styles);
    const table = new CustomStyledTable(data, styles);

    const outputTarget = document.querySelector(targetId);

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    removeAllChildNodes(outputTarget);

    if (table.render().length === 0) return

    for (const line of table.render()) {
        outputTarget.appendChild(document.createTextNode(line));
        outputTarget.appendChild(document.createElement('br'));
    }
}

export { renderTable }