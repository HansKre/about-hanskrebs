import { border, borderCharacters } from 'https://unpkg.com/styled-cli-table/module/styles/border.js';

import { PrintLineBuffer } from 'https://unpkg.com/styled-cli-table/module/printline/PrintLineBuffer.js';
import { BorderRenderer, PaddingRenderer, AlignRenderer, FlexSizeRenderer, GenericBufferedRenderer } from 'https://unpkg.com/styled-cli-table/module/renderers/index.js';
import { ComposableRenderedStyledTable } from 'https://unpkg.com/styled-cli-table/module/composable/ComposableRenderedStyledTable.js';

const COLUMN_MIN_CHARS = 5
let columnsCount;

function renderTable(targetId, data, downloadUrl) {
    const fontSizeStyle = window.getComputedStyle(document.querySelector(targetId), null).fontSize;
    const fontSize = parseFloat(fontSizeStyle)
    const lastColumnMaxChars = () => {
        const availableWidthLastCol = window.winbox?.width - (columnsCount * COLUMN_MIN_CHARS * fontSize) || 0
        const availableMaxChars = (availableWidthLastCol / fontSize).toFixed(0)
        return Math.max(COLUMN_MIN_CHARS, availableMaxChars)
    }

    function PrettyCropRenderer(BufferedRenderer) {
        return class extends BufferedRenderer {
            // extend & override
            fillBlock(buffer, x, y, content, width, height, cell, computedStyles) {
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
                        if (substring && substring !== '.')
                            newContent.push(substring.trim());
                        cursor += breakAt;
                        breakAt = -1
                    } else {
                        breakAt--;
                        if (breakAt === 0 || goodBreakPoint || exceedsLineLength) {
                            substring = line.substring(cursor, cursor + width);
                            if (substring && substring !== '.')
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

            // row height is the number of available lines. We calculate row height dynamically based on content.
            const lastRowIndex = data[rowIndex].length - 1
            const lines = data[rowIndex][lastRowIndex]
            // actualWidth seems to be lower by 2 than what is set
            const actualWidth = lastColumnMaxChars() - 2
            // use same function for calculating neededHeight wich is used to break lines
            const neededHeight = breakLines(lines, actualWidth).length
            return { height: neededHeight }
        },
        columns({ columnIndex, data }) {
            columnsCount = data[0].length
            if (columnIndex === 0) { // first column
                return { minWidth: COLUMN_MIN_CHARS }
            }
            if (columnIndex === 1 && columnsCount > 2) {
                return { minWidth: COLUMN_MIN_CHARS }
            }
            const maxChars = lastColumnMaxChars(columnsCount)
            if (columnIndex === (columnsCount - 1)) {
                return {
                    minWidth: maxChars,
                    width: maxChars,
                    maxWidth: maxChars,
                }
            }
        }
    };

    const table = new CustomStyledTable(data, styles);

    const outputTarget = document.querySelector(targetId);

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    removeAllChildNodes(outputTarget);

    // add download link for pdf
    if (downloadUrl) {
        // div for centering items
        const div = document.createElement('div');
        div.style.textAlign = 'center';

        const img = document.createElement('img');
        img.src = '/assets/pdf-icon.png';
        img.alt = 'pdf icon';
        img.title = 'pdf icon';
        img.style.width = `${fontSize}px`;
        img.style.marginRight = '12px';
        div.appendChild(img);

        const a = document.createElement('a');
        const linkTextStr = 'Download Resume as PDF';
        const linkText = document.createTextNode(linkTextStr);
        a.appendChild(linkText);
        a.title = linkTextStr;
        a.href = downloadUrl;
        div.appendChild(a);

        div.appendChild(document.createElement('br'));

        outputTarget.appendChild(div);
    }

    if (table.render().length === 0) return

    for (const line of table.render()) {
        outputTarget.appendChild(document.createTextNode(line));
        outputTarget.appendChild(document.createElement('br'));
    }
}

export { renderTable }