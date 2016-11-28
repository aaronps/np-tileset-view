function TileView(element, tileset) {
    var ctx = jQuery("canvas", element)[0].getContext("2d");
    var cur_tile = 0;
    var jinput = jQuery("input[data-value=current-tile]", element);
    
    var actions = {
        next_tile: function() {
            var value = +jinput.val() + 1;
            if ( value < tileset.tile_count )
                jinput.val(value).change();
        },
        prev_tile: function() {
            var value = +jinput.val();
            if ( value > 0 )
                jinput.val(value-1).change();
        }
    };
    
    $app.setup_actions(element, actions);
    jinput.val(cur_tile);
    jinput.change(check_input_changed);
    jinput.keyup(check_input_changed);
    
    draw_tile();
    
    return;
    
    function check_input_changed() {
        var value = +jinput.val();
        
        if ( value < 0 ) {
            value = 0;
            jinput.val(0);
        } else if ( value >= tileset.tile_count ) {
            value = tileset.tile_count - 1;
            jinput.val(value);
        }
        
        if ( value !== cur_tile )
        {
            cur_tile = value;
            draw_tile();
        }
    }
    
    function draw_tile() {
        tileset.drawTile(ctx, cur_tile, 0, 0);
    }
}
