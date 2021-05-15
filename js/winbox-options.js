const WINBOX_WIDTH = '90%'
const WINBOX_HEIGHT = '90%'

function winboxOptions(title, mountContentId, onResize) {
    const mountContent = document.querySelector(mountContentId)
    return {
        title: title,
        modal: true,
        x: "center",
        y: "center",
        width: WINBOX_WIDTH,
        height: WINBOX_HEIGHT,
        class: [
            "no-full",
        ],
        mount: mountContent,
        onfocus: function () {
            // set title background color
            this.setBackground('#00aa00ab');
        },
        onblur: function () {
            this.setBackground('#777');
        },
        onclose: function () {
            window.winbox = null
        },
        onresize: function () {
            if (onResize) onResize()
        }
    };
}

function updateWinboxSize() {
    const resize = () => {
        window.winbox?.resize(WINBOX_WIDTH, WINBOX_HEIGHT)
        window.winbox?.move("center", "center")
    }
    setTimeout(resize, 1000)
}

export { winboxOptions, updateWinboxSize }