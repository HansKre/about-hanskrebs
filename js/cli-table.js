import { RenderedStyledTable } from 'https://unpkg.com/styled-cli-table/module/precomposed/RenderedStyledTable.js';
import { border, borderCharacters } from 'https://unpkg.com/styled-cli-table/module/styles/border.js';

import { PrintLineBuffer } from 'https://unpkg.com/styled-cli-table/module/printline/PrintLineBuffer.js';
import { BorderRenderer, PaddingRenderer, AlignRenderer, FlexSizeRenderer, GenericBufferedRenderer } from 'https://unpkg.com/styled-cli-table/module/renderers/index.js';
import { ComposableRenderedStyledTable } from 'https://unpkg.com/styled-cli-table/module/composable/ComposableRenderedStyledTable.js';

import { workExperienceData, educationData } from '../content/work-experience.js'
const minChars = 10
const style = window.getComputedStyle(document.getElementById('outputWorkExp'), null).fontSize;
const fontSize = parseFloat(style)
const availableWidth = window.winbox?.width - (2 * minChars * fontSize) || 0
const availableMaxChars = (availableWidth / fontSize).toFixed(0)
const lastColumnMaxChars = Math.max(minChars * 1.5, availableMaxChars)
// console.log('fontsize', fontSize, 'availableMaxChars', lastColumnMaxChars, 'viewPort', window.visualViewport.width, 'ratio', window.visualViewport.width / availableMaxChars)

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

function breakLines(content, width) {
    const newContent = []
    for (const line of content) {
        if (line.length <= width) {
            newContent.push(line)
        } else {
            let substring = ''
            let cursor = 0
            do {
                substring = line.substring(cursor, cursor + width)
                if (substring) newContent.push(substring.trim())
                cursor += width
            } while (substring)
        }
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

function renderTable() {
    console.log('rendering')
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

            // row height is the number of available lines. We calculate row height dynamically based on content
            const lines = data[rowIndex][2]
            // actualWidth seems to be lower by 2 than what is set
            const actualWidth = lastColumnMaxChars - 2
            // use same function for calculating neededHeight wich is used to break lines
            const neededHeight = breakLines(lines, actualWidth).length
            return { height: neededHeight }
        },
        columns: { // column level styles
            0: { // first column
                minWidth: minChars
            },
            1: {
                minWidth: minChars
            },
            [-1]: { // last column
                minWidth: lastColumnMaxChars,
                width: lastColumnMaxChars,
                maxWidth: lastColumnMaxChars,
            }
        }
    };

    // const table = new RenderedStyledTable(workExperienceData, styles);
    const table = new CustomStyledTable(workExperienceData, styles);

    const outputWorkExp = document.querySelector('#outputWorkExp');
    const outputEdu = document.querySelector('#outputEdu');

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    removeAllChildNodes(outputWorkExp);
    removeAllChildNodes(outputEdu);

    if (table.render().length === 0) return

    for (const line of table.render()) {
        outputWorkExp.appendChild(document.createTextNode(line));
        outputWorkExp.appendChild(document.createElement('br'));
        outputEdu.appendChild(document.createTextNode(line));
        outputEdu.appendChild(document.createElement('br'));
    }
}

export { renderTable }