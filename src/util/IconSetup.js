import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faChartBar,
    faCoffee,
    faCopyright,
    faEye,
    faSyncAlt,
    faThumbsUp,
    faThumbsDown } from '@fortawesome/free-solid-svg-icons'

const IconSetup = {
    setup() {
        library.add(faChartBar, faCoffee, faCopyright, faEye, faSyncAlt, faThumbsUp, faThumbsDown)
    }
}

export default IconSetup;


