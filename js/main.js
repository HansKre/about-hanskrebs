import { renderTable } from './cli-table.js'
import { updateWinboxSize, winboxOptions } from './winbox-options.js'
import { workExperienceData } from '../content/work-experience.js'
import { educationData } from '../content/education.js'
import { contactDetailsData } from '../content/contact-details.js'

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
  let resumeBox = new WinBox(winboxOptions('', '#resume-content', renderTables))
  window.winbox = resumeBox
  renderTables()
})

document.querySelector('#contact').addEventListener('click', () => {
  let contactBox = new WinBox(winboxOptions('', '#contact-content'))
  window.winbox = contactBox
  renderTable('#outputContactDetails', contactDetailsData)
})

window.addEventListener('resize', () => {
  console.log(window.visualViewport.width, window.visualViewport.height)
  updateWinboxSize();
})

document.querySelector('#portfolio').addEventListener('click', () => {
  alert('... coming soon')
})