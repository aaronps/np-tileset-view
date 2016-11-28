
var tsimage = null;

var tilecanvas = null;
var tilectx = null;
var objectcanvas = null;
var objectctx = null;

var current_tile = 0;

var num_tiles = 11960;

var tileset = null;

function Tile( x, y )
{
    this.x = x;
    this.y = y;
    this.w = 32;
    this.h = 32;
}

function TileSet( image_path, afterloadfunc )
{
    this.num_tiles = 11960;
    this.image = new Image();
    jQuery(this.image).bind('load', {obj:this, afterload:afterloadfunc},
        function(event) {
            event.data.obj.onTileSetImageLoaded();
            event.data.afterload();
        });
        
    this.image.src = image_path;
    this.tiles = [];
}

TileSet.prototype = {
    onTileSetImageLoaded: function() {
        var tswidth = this.image.width;
        var cur_x = 0;
        var cur_y = 0;
        for ( var n = 0; n < this.num_tiles; n++ )
        {
            this.tiles.push( new Tile(cur_x, cur_y) );
            cur_x += 32;
            if ( cur_x >= tswidth )
            {
                cur_x = 0;
                cur_y += 32;
            }
        }
    },
    drawTile: function(ctx, tilenum, x, y) {
        var t = this.tiles[tilenum];
        ctx.drawImage(this.image, t.x, t.y, t.w, t.h, x, y, t.w, t.h);
    }
    
};

function draw_current_tile()
{
    document.getElementById('current_tile').value = current_tile;
    tileset.drawTile(tilectx, current_tile, 0, 0);
    
}

function do_next_tile()
{
    current_tile++;
    draw_current_tile();
}

function do_prev_tile()
{
    current_tile--;
    if ( current_tile < 0 ) current_tile = 0;
    draw_current_tile();
}

function do_refresh_object()
{
    var from_tile = parseInt(jQuery('input[name=from_tile]').val(), 10);
    var row_length= parseInt(jQuery('input[name=row_length]').val(), 10);
    var num_rows = parseInt(jQuery('input[name=num_rows]').val(), 10);
    
    var x = 0;
    var y = 0;
    var last_tile = from_tile + (row_length * num_rows);
    var row_index = 0;
    
    jQuery('input[name=last_tile]').val(last_tile);
    
    objectctx.clearRect(0, 0, objectcanvas.width, objectcanvas.height);
    
    for ( var tile = from_tile; tile < last_tile; tile++ )
    {
        tileset.drawTile(objectctx, tile, x, y);
        x += 32;
        if ( ++row_index >= row_length )
        {
            row_index = 0;
            x = 0;
            y += 32;
        }
    }
}

var tileobjectView = null;

function init()
{
    
    tilecanvas = document.getElementById('tile_canvas');
    tilectx = tilecanvas.getContext("2d");
    
//    objectcanvas = document.getElementById('object_canvas');
//    objectctx = objectcanvas.getContext("2d");
    
    tileset = new TileSet('images/tiles.png', draw_current_tile);
    tileobjectView = new TileObjectView(document.getElementById('create_object_view'),
                                        tileset);

}

