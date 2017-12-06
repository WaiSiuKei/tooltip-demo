const canvasElement = document.getElementById('canvas');
const ctx = canvasElement.getContext('2d');

let tooltip = new Tooltip(canvasElement.parentElement)

function handleEnter(e) {
    tooltip.show()
}

function handleLeave(e) {
    tooltip.hide()
}

function handleMove(e) {
    const { x, y } = e
    tooltip.update(x, y)
}


window.addEventListener('DOMContentLoaded', () => {
    canvasElement.addEventListener('mouseenter', handleEnter);
    canvasElement.addEventListener('mouseleave', handleLeave);
    canvasElement.addEventListener('mousemove', handleMove);
})
