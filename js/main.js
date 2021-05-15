import { workExperienceData, educationData } from '../content/work-experience.js'

import { renderTable } from './cli-table.js'

const WINBOX_WIDTH = '80%'
const WINBOX_HEIGHT = '90%'

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

const resume = document.querySelector('#resume')
resume.addEventListener('click', () => {
  const resumeContent = document.querySelector('#resume-content')
  resumeBox = new WinBox(winboxOptions('My Resume', resumeContent, renderTable))
  window.winbox = resumeBox
  renderTable()
})

const contact = document.querySelector('#contact')
contact.addEventListener('click', () => {
  const contactContent = document.querySelector('#contact-content')
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

window.addEventListener('resize', () => {
  console.log(window.visualViewport.width, window.visualViewport.height)
  window.winbox?.resize(WINBOX_WIDTH, WINBOX_HEIGHT)
})

function winboxOptions(title, mountContent, onResize) {
  return {
    title: title,
    modal: true,
    x: "center",
    y: "center",
    width: WINBOX_WIDTH,
    height: WINBOX_HEIGHT,
    class: [
      "no-full",
    ],
    mount: mountContent,
    onfocus: function () {
      // set title background color
      this.setBackground('#00aa00ab');
    },
    onblur: function () {
      this.setBackground('#777');
    },
    onresize: function () {
      console.log('onresize', onResize)
      if (onResize) onResize()
    }
  };
}
