function calculateNonVariable (stages) {
    return stages.reduce((prev, stage) => {
        if (stage.amount !== -1) {
            prev += stage.amount * stage.duration
        }
        return prev
    }, 0)
}

function getVariableStageIndex (stages) {
    return stages.findIndex(stage => stage.amount === -1)
}

module.exports = function (stages, amount) {
    const result = JSON.parse(JSON.stringify(stages)) // simple deep clone
    if (amount === 0) return result

    const index = getVariableStageIndex(result)
    if (index === -1) return result
    const stage = result[index]
    const remaining = amount - calculateNonVariable(result)
    const split = Math.floor(remaining * 100 / stage.duration) / 100

    const check = remaining - (stage.duration * split)
    if (check > Number.EPSILON) {
        const newStage = { ...stage }
        newStage.duration = 1
        newStage.amount = Math.round(split * 100 + (remaining * 100 - stage.duration * split * 100)) / 100
        stage.duration--
        stage.amount = split
        result.splice(index + 1, 0, newStage)
    } else {
        stage.amount = split
    }

    return result
}
