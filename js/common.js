$(function() {
    $(window).on('load', function() {
        colWidth = $('.grid').outerWidth() + offsetX * 2;
        gridArray = [];
        for (var i=0; i<numOfCol; i++) {
            pushGridArray(i, 0, 1, -offsetY);
        }
        $('.grid').each(function(index) {
            setPosition($(this));
        });
    });
    var gridArray = [],
        colWidth,
        offsetX = 5,
        offsetY = 5,
        numOfCol = 5;
    function pushGridArray(x, y, size, height) {
        for (var i=0; i<size; i++) {
            var grid = [];
            grid.x = x + i;
            grid.endY = y + height + offsetY * 2;
            gridArray.push(grid);
        }
    }
    function removeGridArray(x, size) {
        for (var i=0; i<size; i++) {
            var idx = getGridIndex(x + i);
            gridArray.splice(idx, 1);
        }
    }
    function getHeightArray(x, size) {
        var heightArray = [];
        var temps = [];
        for (var i=0; i<size; i++) {
            var idx = getGridIndex(x + i);
            temps.push(gridArray[idx].endY);
        }
        heightArray.min = Math.min.apply(Math, temps);
        heightArray.max = Math.max.apply(Math, temps);
        heightArray.x = temps.indexOf(heightArray.min);
 
        return heightArray;
    }
    function getGridIndex(x) {
        for (var i=0; i<gridArray.length; i++) {
            var obj = gridArray[i];
            if (obj.x === x) {
                return i;
            }
        }
    }
    function setPosition(grid) {
        if(!grid.data('size') || grid.data('size') < 0) {
            grid.data('size', 1);
        }
        var pos = [];
        var tempHeight = getHeightArray(0, gridArray.length);
        pos.x = tempHeight.x;
        pos.y = tempHeight.min;
 
        var gridWidth = colWidth - (grid.outerWidth() - grid.width());
        grid.css({
            'left': pos.x * colWidth,
            'top': pos.y,
            'position': 'absolute'
        });
        removeGridArray(pos.x, grid.data('size'));
        pushGridArray(pos.x, pos.y, grid.data('size'), grid.outerHeight());
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt /*, from*/) {
            var len = this.length >>> 0;
 
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0) {
                from += len;
            }
            for (; from < len; from++) {
                if (from in this && this[from] === elt) {
                    return from;
                }
            }
            return -1;
        };
    }
});
function getScrollTop(){
    console.log($(window).scrollTop());
    if ($(window).scrollTop() < 1000){
        $("#footer").css("display","none");
    }else{
        $("#footer").css("display","block");
    }
    if ($(window).scrollTop() > 500){
        $("#citymenucontainer").css("position","fixed");
    }else{
        $("#citymenucontainer").css("position","relative");
    }
}
$(window).on("load scroll", getScrollTop);
