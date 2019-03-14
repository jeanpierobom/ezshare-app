import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCoffee,
    faCopyright,
    faSyncAlt } from '@fortawesome/free-solid-svg-icons'

const IconSetup = {
    setup() {
        library.add(faCoffee, faCopyright, faSyncAlt)
    }
}

export default IconSetup;


