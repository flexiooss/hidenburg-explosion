import {App} from './app/App'
import {AppDispatcher} from './app/AppDispatcher'
import {ConsoleLogger, FakeLogger} from '@flexio-oss/js-logger'

import {ComponentBootstrapBuilder} from './modules/component-bootstrap'

export const APP = new App(
  'CounterApplication',
  new AppDispatcher(),
  // new ConsoleLogger().debug()
  new FakeLogger().debug()
)
const HTML_NODE = document.body

;(function(app) {
  ComponentBootstrapBuilder
    .build(app, HTML_NODE)
    .dispatchActionInitialize('Rutabaga !!!')
})(APP)
