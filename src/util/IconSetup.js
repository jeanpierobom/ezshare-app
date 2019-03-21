import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faChartBar,
    faCoffee,
    faCopyright,
    faEye,
    faSyncAlt,
    faThumbsUp,
    faThumbsDown,
    faUsers,
    faVideo } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
    
const IconSetup = {
    setup() {
        library.add(faChartBar, faCoffee, faCopyright, faEye, faSyncAlt, faThumbsUp, faThumbsDown, faUsers, faVideo, fab)
    }
}

export default IconSetup;


