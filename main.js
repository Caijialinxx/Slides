let loopID = intervalSlide('loop'), loopN = 0,
  loopImgItems = $('#loop .images').find('img'),
  loopBtnItems = $('#loop .items').find('span'),
  thumbID = intervalSlide('thumb'), thumbN = 0,
  thumbImgItems = $('#thumb .images').find('img'),
  thumbBtnItems = $('#thumbBtns').find('li')

/* Loop模式 */
// 上一张
$('#prev').click(() => { clickSlide(loopN - 2, 'loop') })
// 下一张
$('#next').click(() => { clickSlide(loopN, 'loop') })
// 圆点导航
$(loopBtnItems).click((e) => { clickSlide($(e.target).index() - 1, 'loop') })

// 鼠标悬停，轮播停止。仅在div.images上有效，当鼠标悬停在所有按钮上时轮播不受影响。
$('#loop .images').mouseenter(() => { window.clearInterval(loopID) })
$('#loop .images').mouseleave(() => { loopID = intervalSlide('loop') })


/* 缩略图模式 */
// 缩略图导航
$(thumbBtnItems).click((e) => { clickSlide($(e.target).index() - 1, 'thumb') })

// 鼠标悬停，轮播停止。仅在div.images上有效，当鼠标悬停在所有按钮上时轮播不受影响。
$('#thumb .images').mouseenter(() => { window.clearInterval(thumbID) })
$('#thumb .images').mouseleave(() => { thumbID = intervalSlide('thumb') })


window.onscroll = () => {
  window.pageYOffset > 0 ? $('header').addClass('float') : $('header').removeClass('float')
}

/* 以下是自定义函数 */
// 点击时的动画函数
function clickSlide(target_N, type) {
  if (type === 'loop') {
    window.clearInterval(loopID)
    loopN = target_N
    slide(type)
    loopID = intervalSlide(type)
  } else {
    window.clearInterval(thumbID)
    thumbN = target_N
    slide(type)
    thumbID = intervalSlide(type)
  }
}
// 循环播放
function intervalSlide(type) {
  return setInterval(() => {
    slide(type)
  }, 2000)
}
// 播放一次的动画函数
function slide(type) {
  if (type === 'loop') {
    // 上一张图standby
    loopImgItems.eq(which(loopN - 1)).removeClass('leave enter').addClass('standby')
    // 当前图leave
    loopImgItems.eq(which(loopN)).removeClass('enter standby').addClass('leave')
    // 下一张图enter
    loopImgItems.eq(which(loopN + 1)).removeClass('standby leave').addClass('enter')
    // 圆点随之变化
    loopBtnItems.eq(which(loopN + 1)).addClass('active').siblings('.active').removeClass('active')
    loopN++
  } else {
    $('#thumb .images').css({ transform: `translateX(${thumbN * -700}px)` })
    $('#thumbBtns').css({ transform: `translateX(${thumbN * -36}px)` })
    $('#thumbBtns li').eq(thumbN + 1).addClass('active').siblings().removeClass('active')
    thumbN++
    if (thumbN > 1) {
      thumbN = -1
    }
  }
}
// 返回应该播放的第x张图
function which(index) {
  if (index < 0) { index += 3 }  //解决负数返回错误的值。-3 -2 -1 => 0 1 2
  return index % 3
}