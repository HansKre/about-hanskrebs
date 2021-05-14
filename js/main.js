import { RenderedStyledTable } from 'https://unpkg.com/styled-cli-table/module/precomposed/RenderedStyledTable.js';
import { border, borderCharacters } from 'https://unpkg.com/styled-cli-table/module/styles/border.js';

import { PrintLineBuffer } from 'https://unpkg.com/styled-cli-table/module/printline/PrintLineBuffer.js';
import { BorderRenderer, PaddingRenderer, AlignRenderer, FlexSizeRenderer, GenericBufferedRenderer } from 'https://unpkg.com/styled-cli-table/module/renderers/index.js';
import { ComposableRenderedStyledTable } from 'https://unpkg.com/styled-cli-table/module/composable/ComposableRenderedStyledTable.js';

const WINBOX_WIDTH = '80%'
const WINBOX_HEIGHT = '90%'

const resume = document.querySelector('#resume')
const contact = document.querySelector('#contact')
const resumeContent = document.querySelector('#resume-content')
const contactContent = document.querySelector('#contact-content')

let resumeBox;
let contactBox;

window.addEventListener('click', (evt) => {
  if (evt?.target?.classList?.contains('winbox') && evt?.target?.classList?.contains('modal')) {
    // clicked outside of open modal winbox
    if (evt.target.id === 'resume' || evt.target.id === 'contact') return;
    window.winbox?.close()
    window.winbox = null
  }
})

resume.addEventListener('click', () => {
  resumeBox = new WinBox({
    title: 'My Resume',
    modal: true,
    x: "center",
    y: "center",
    width: WINBOX_WIDTH,
    height: WINBOX_HEIGHT,
    class: [
      "no-full",
    ],
    mount: resumeContent,
    onfocus: function () {
      // set title background color to text-color
      this.setBackground('#00aa00ab')
    },
    onblur: function () {
      this.setBackground('#777')
    },
    onresize: function (width, height) {
      console.log({ width, height })
    }
  })
  window.winbox = resumeBox
  renderTable()
})

contact.addEventListener('click', () => {
  contactBox = new WinBox({
    title: 'Contact Me',
    modal: true,
    background: '#00aa00',
    x: "center",
    y: "center",
    width: WINBOX_WIDTH,
    height: WINBOX_HEIGHT,
    class: [
      "no-full",
    ],
    mount: contactContent,
    onfocus: function () {
      this.setBackground('#00aa00ab')
    },
    onblur: function () {
      this.setBackground('#777')
    },
    onclose: function () {
      window.winbox = null
    }
  })
  window.winbox = contactBox
})

/* ------- styled-cli-table ------- */

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

function breakLines(content, width) {
  const newContent = []
  for (const line of content) {
    if (line.length <= width) {
      console.log('pushing', line)
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
  // console.table([...content, ...newContent])
  console.table(newContent)
  return newContent
}

function crop(content, width, cropString = '') {
  console.log('maxChars', width, 'viewPort', window.visualViewport.width)
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
  if (!window.winbox) return
  const singleWithPlus = borderCharacters('─', '│', '+', '+', '+', '+', '+', '+', '+', '+', '+');

  const workExperienceData = [
    ['from', 'to', 'what'],
    ['01.01.2020', 'until', ['Lead Architect at Mercedes-Benz AG', '', 'Technical and architectural responsibility for the system landscape for supplying the Europe region with marketing and sales-relevant vehicle data']],
    ['01.10.2016', '31.12.2019', ['Solutions Architect at Daimler AG', '', 'Design and architecture new Daimler applications, team\'s responsibile for architecture & tech']]
  ];

  const proportionalParentWidth = (window.winbox?.width / 23).toFixed(0)
  const minWidth = 10

  const styles = {
    // table level styles
    ...border(true),
    crop: '..',
    borderCharacters: singleWithPlus,
    paddingLeft: 1, paddingRight: 1,
    // rows: { // row level styles
    //   0: {
    //     align: 'center'
    //   }
    // },
    rows({ rowIndex, data }) { // functional row styles
      if (rowIndex === 0) return { align: 'center' } // center first row

      const lines = data[rowIndex][2]
      let neededHeight = 0
      for (const line of lines) {
        // at least one height for each line, even if empty
        neededHeight += Math.max(Math.ceil(line.length / proportionalParentWidth), 1)
      }
      console.log({ neededHeight })
      return { height: neededHeight }
    },
    columns: { // column level styles
      0: { // first column
        minWidth: minWidth
      },
      1: {
        minWidth: minWidth
      },
      [-1]: { // last column
        minWidth: Math.max(minWidth * 1.5, proportionalParentWidth),
        width: Math.max(minWidth * 1.5, proportionalParentWidth),
        maxWidth: Math.max(minWidth * 1.5, proportionalParentWidth),
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
    // console.log(line); // echoing
  }
}

window.addEventListener('resize', () => {
  window.winbox?.resize(WINBOX_WIDTH, WINBOX_HEIGHT)
  renderTable()
})