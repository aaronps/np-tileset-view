
var objectcanvas = null;
var objectctx = null;

var current_tile = 0;

var num_tiles = 11960;

var tileset = null;

var $app = {
    setup_actions: function(element, actions) {
        var list = jQuery("[data-action]", element),
            i, item, act;
        
        for ( i = list.length - 1; i >= 0; --i ) {
            item = list[i];
            act = item.getAttribute("data-action");
            if ( actions.hasOwnProperty(act) ) {
                jQuery(item).click(actions[act]);
            } else {
                alert("ERROR: Unrecognized action: [" + act + "]");
            }
        }
    }
};

function TileSet( image_path, afterloadfunc )
{
    this.tile_count = 11961;
    this.tile_size = 32;
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
        for ( var n = 0; n < this.tile_count; n++ )
        {
            this.tiles.push( {x:cur_x, y:cur_y} );
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
        var ts = this.tile_size;
        ctx.drawImage(this.image, t.x, t.y, ts, ts, x, y, ts, ts);
    }
    
};


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

function init()
{

//    objectcanvas = document.getElementById('object_canvas');
//    objectctx = objectcanvas.getContext("2d");
    
    tileset = new TileSet('images/tiles.png', function(){
        TileView(document.getElementById('tiles'), tileset);
        new TileObjectView(document.getElementById('create_object_view'),
                                            tileset);
    });

}

