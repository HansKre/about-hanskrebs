import { renderTable } from './cli-table.js'
import { winboxOptions } from './winbox-options.js'

import { workExperienceData } from '../content/work-experience.js'
import { educationData } from '../content/education.js'

function closeWinboxOnClickOutside(evt) {
  if (evt?.target?.classList?.contains('winbox') && evt?.target?.classList?.contains('modal')) {
    window.winbox?.close()
    window.winbox = null
  }
}
window.addEventListener('click', (evt) => closeWinboxOnClickOutside(evt))

const renderTables = () => {
  renderTable('#outputWorkExp', workExperienceData)
  renderTable('#outputEdu', educationData)
}

document.querySelector('#resume').addEventListener('click', () => {
  let resumeBox = new WinBox(winboxOptions('My Resume', '#resume-content', renderTables))
  window.winbox = resumeBox
  renderTables()
})

document.querySelector('#contact').addEventListener('click', () => {
  let contactBox = new WinBox(winboxOptions('Contact Me', '#contact-content'))
  window.winbox = contactBox
})

window.addEventListener('resize', () => {
  console.log(window.visualViewport.width, window.visualViewport.height)
  window.winbox?.resize(WINBOX_WIDTH, WINBOX_HEIGHT)
})

document.querySelector('#portfolio').addEventListener('click', () => {
  alert('... coming soon')
})