import { renderTable } from './cli-table.js'
import { updateWinboxSize, winboxOptions } from './winbox-options.js'
import { workExperienceData, downloadUrl } from '../content/work-experience.js'
import { educationData } from '../content/education.js'
import { contactDetailsData } from '../content/contact-details.js'
import {
  imdbData,
  calcData,
  pomodoroData,
  immoData,
  dionysosData,
  sanityPluginHtmlToPortableText
} from '../content/projects.js'

function closeWinboxOnClickOutside(evt) {
  if (evt?.target?.classList?.contains('winbox') && evt?.target?.classList?.contains('modal')) {
    window.winbox?.close()
    window.winbox = null
  }
}
window.addEventListener('click', (evt) => closeWinboxOnClickOutside(evt))

const renderTables = () => {
  renderTable('#outputWorkExp', workExperienceData, downloadUrl)
  renderTable('#outputEdu', educationData)
}

document.querySelector('#resume').addEventListener('click', () => {
  let resumeBox = new WinBox(winboxOptions('', '#resume-content', renderTables))
  window.winbox = resumeBox
  renderTables()
})

document.querySelector('#projects').addEventListener('click', () => {
  let projectsBox = new WinBox(winboxOptions('', '#projects-content'))
  window.winbox = projectsBox
  renderTable('#sanityPluginHtmlToPortableText', sanityPluginHtmlToPortableText)
  renderTable('#outputDionysos', dionysosData)
  renderTable('#outputImmo', immoData)
  renderTable('#outputPomodoro', pomodoroData)
  renderTable('#outputCalc', calcData)
  renderTable('#outputImdbprime', imdbData)
})

document.querySelector('#contact').addEventListener('click', () => {
  let contactBox = new WinBox(winboxOptions('', '#contact-content'))
  window.winbox = contactBox
  renderTable('#outputContactDetails', contactDetailsData)
})

window.addEventListener('resize', () => {
  updateWinboxSize();
})