
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


function init()
{
    var tileset = new TileSet('images/tiles.png', function(){
        TileView(document.getElementById('tile_view'), tileset);
        TileObjectView(document.getElementById('object_view'), tileset);
    });
}

