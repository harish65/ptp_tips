var getTrackCondition =  (name) => {

    switch (name) {
        case 'F':
            return 'F'
        case 'F1':
            return 'F'
        case 'F2':
            return 'F'
        case 'Fi':
            return 'F'
        case 'Fi1':
            return 'F'
        case 'Fi2':
            return 'F'
        case 'G':
            return 'G'
        case 'G2':
            return 'F'
        case 'G3':
            return 'G'
        case 'G4':
            return 'G'
        case 'So':
            return 'SO'
        case 'So5':
            return 'SO'
        case 'So6':
            return 'SO'
        case 'So7':
            return 'SO'
        case 'S':
            return 'SO'
        case 'S7':
            return 'SO'
        case 'S8':
            return 'H'
        case 'S9':
            return 'H'
        case 'H':
            return 'H'
        case 'H8':
            return 'H'
        case 'H9':
            return 'H'
        case 'H10':
            return 'H'
        case 'H11':
            return 'H'
        case 'Sy':
            return 'SY'
        case 'D':
            return 'G'
        case 'D4':
            return 'G'
        case 'D5':
            return 'SO'
        case 'D6':
            return 'SO'
        default:
            return 'G'
    }
}

module.exports = getTrackCondition;

       