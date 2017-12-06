function refixTooltipPosition(x, y, el, viewWidth, viewHeight) {
  const width = el.clientWidth;
  const height = el.clientHeight;
  const gap = 20;

  if (x + width + gap > viewWidth) {
    x -= width + gap;
    x = x < 0 ? 0 : x;
  } else {
    x += gap;
  }
  if (y + height + gap > viewHeight) {
    y -= height + gap;
    y = x < 0 ? 0 : y;
  } else {
    y += gap;
  }
  return [x, y];
}

function calcTooltipPosition(x, y, position, dom, target) {
  const domWidth = dom.clientWidth;
  const domHeight = dom.clientHeight;
  let rectWidth = 0;
  let rectHeight = 0;
  let gap = 20;

  if (target) {
    const rect = target.getBBox();
    rectWidth = rect.width;
    rectHeight = rect.height;
    x = rect.x;
    y = rect.y;
    gap = 5;
  }
  switch (position) {
    case 'inside':
      x = x + rectWidth / 2 - domWidth / 2;
      y = y + rectHeight / 2 - domHeight / 2;
      break;
    case 'top':
      x = x + rectWidth / 2 - domWidth / 2;
      y = y - domHeight - gap;
      break;
    case 'left':
      x = x - domWidth - gap;
      y = y + rectHeight / 2 - domHeight / 2;
      break;
    case 'right':
      x = x + rectWidth + gap;
      y = y + rectHeight / 2 - domHeight / 2;
      break;
    case 'bottom':
    default:
      x = x + rectWidth / 2 - domWidth / 2;
      y = y + rectHeight + gap;
      break;
  }
  return [x, y];
}

function confineTooltipPosition(x, y, el, plotRange) {
  const gap = 20;
  const width = el.clientWidth;
  const height = el.clientHeight;
  if (x + width > plotRange.tr.x) {
    x -= width + 2 * gap;
  }

  if (x < plotRange.tl.x) {
    x = plotRange.tl.x;
  }

  if (y + height > plotRange.bl.y) {
    y -= height + 2 * gap;
  }

  if (y < plotRange.tl.y) {
    y = plotRange.tl.y;
  }

  return [x, y];
}

function empty(node) {
  let child = node.firstChild
  while (child) {
    node.removeChild(child)
    child = node.firstChild
  }
}

class Tooltip {
  constructor(parent) {
    this.parent = parent
    const { top, right, bottom, left, x, y, width, height } = this.parent.getBoundingClientRect()
    this.leftLimit = left
    this.rightLimit = right
    this.topLimit = top
    this.bottomLimit = bottom
    this.xOffset = x
    this.yOffset = y
    this.viewWidth = width
    this.viewHeight = height
    this._create()
  }

  _create() {
    this.container = document.createElement('div');
    this.container.className = 'tooltip';
    this.title = document.createElement('div')
    this.title.className = 'tootip-title'
    this.title.innerText = 'Position'
    this.ul = document.createElement('ul')
    this.ul.className = 'tooltip-list'
    this.container.appendChild(this.title)
    this.container.appendChild(this.ul)

    this.parent.appendChild(this.container)
  }

  updateContent(x, y) {
    empty(this.ul)
    let lix = document.createElement('li')
    lix.className = 'tooltip-list-item'
    lix.innerText = `x: ${x.toFixed(0)}`
    let liy = document.createElement('li')
    liy.className = 'tooltip-list-item'
    liy.innerText = `y: ${y.toFixed(0)}`
    this.ul.appendChild(lix)
    this.ul.appendChild(liy)
  }

  updatePosition(x, y) {

    let position;
    position = refixTooltipPosition(x, y, this.container, this.viewWidth, this.viewHeight);
    x = position[0];
    y = position[1];

    this.container.style.left = x + 'px'
    this.container.style.top = y + 'px'
  }

  update(x, y) {
    this.updateContent(x, y)
    this.updatePosition(x, y)
  }

  show() {
    this.container.style.visibility = 'visible';
  }

  hide() {
    this.container.style.visibility = 'hidden';
  }
}

// window.Tooltip = Tooltip