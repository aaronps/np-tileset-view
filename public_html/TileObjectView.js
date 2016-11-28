function TileObjectView( element, tile_set )
{
    var canvas = jQuery('canvas', element)[0];
    var ctx = canvas.getContext('2d');
    
    
    var jfrom_tile = jQuery('input[data-value=from_tile]', element);
    var jrow_length= jQuery('input[data-value=row_length]', element);
    var jnum_rows  = jQuery('input[data-value=num_rows]', element);
    var jto_tile   = jQuery('input[data-value=to_tile]', element);
    
    var model = {
        from_tile   : parseInt(jfrom_tile.val(), 10),
        row_length  : parseInt(jrow_length.val(), 10),
        num_rows    : parseInt(jnum_rows.val(), 10),
        to_tile     : parseInt(jto_tile.val(), 10)
    };
    
    var actions = {
        next_tile: function() {
            jfrom_tile.val(model.from_tile + 1).change();
        },
        prev_tile: function() {
            jfrom_tile.val(model.from_tile - 1).change();
        },
        width_inc: function() {
            jrow_length.val(model.row_length + 1).change();
        },
        width_dec: function() {
            jrow_length.val(model.row_length - 1).change();
        },
        height_inc: function() {
            jnum_rows.val(model.num_rows + 1).change();
        },
        height_dec: function() {
            jnum_rows.val(model.num_rows - 1).change();
        },
        paint_object: function() {
            drawObject();
        },
        set_start_tile: function() {
            jfrom_tile.val(model.to_tile).change();
        }
    };
    
    $app.setup_actions(element, actions);
    
    jQuery('input[data-value]', element).change(function(){
        model[this.getAttribute('data-value')] = parseInt(this.value, 10);
        drawObject();
    });
        drawObject();
    
    return;
    
    function drawObject()
    {
        var x = 0;
        var y = 0;
        var last_tile = model.from_tile + (model.row_length * model.num_rows);
        var row_index = 0;

        jto_tile.val(last_tile);
        model.to_tile = last_tile;

        canvas.width = model.row_length * tile_set.tile_size;
        canvas.height = model.num_rows * tile_set.tile_size;

//        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for ( var tile = model.from_tile; tile < last_tile; tile++ )
        {
            tile_set.drawTile(ctx, tile, x, y);
            x += 32;
            if ( ++row_index >= model.row_length )
            {
                row_index = 0;
                x = 0;
                y += 32;
            }
        }
    }
}
