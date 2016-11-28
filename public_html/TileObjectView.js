function TileObjectView( element, tile_set )
{
    this.element = element;
    this.tile_set = tile_set;
    this.canvas = jQuery('canvas', element)[0];
    this.ctx = this.canvas.getContext('2d');
    
    
    this.jfrom_tile = jQuery('input[name=from_tile]', element);
    this.jrow_length= jQuery('input[name=row_length]', element);
    this.jnum_rows  = jQuery('input[name=num_rows]', element);
    this.jto_tile   = jQuery('input[name=to_tile]', element);
    
    this.from_tile = parseInt(this.jfrom_tile.val(), 10);
    this.row_length= parseInt(this.jrow_length.val(), 10);
    this.num_rows  = parseInt(this.jnum_rows.val(), 10);
    this.to_tile   = parseInt(this.jto_tile.val(), 10);
    
    
    jQuery('input[type=button]', element).click({view:this}, function(event){
        var xaction = 'action_' + (jQuery(this).attr('data-action') || '');
        if ( xaction != 'action_')
        {
            if ( event.data.view[xaction] )
            {
                event.data.view[xaction]();
            }
            else
            {
                alert('Action not recognized: ' + xaction);
            }
        }
        else
        {
            alert('no action defined for button: ' + this.name);
        }
    });
    
    jQuery('input[type=text]', element).change({view:this}, function(event){
        event.data.view[this.name] = parseInt(this.value, 10);
        event.data.view.drawObject();
    })
    
    
}

TileObjectView.prototype = {
    drawObject: function()
    {
        var x = 0;
        var y = 0;
        var last_tile = this.from_tile + (this.row_length * this.num_rows);
        var row_index = 0;

        jQuery('input[name=to_tile]', this.element).val(last_tile);
        this.to_tile = last_tile;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for ( var tile = this.from_tile; tile < last_tile; tile++ )
        {
            this.tile_set.drawTile(this.ctx, tile, x, y);
            x += 32;
            if ( ++row_index >= this.row_length )
            {
                row_index = 0;
                x = 0;
                y += 32;
            }
        }
    },
    action_next_tile: function()
    {
        this.jfrom_tile.val(this.from_tile + 1);
        this.jfrom_tile.change();
    },
    action_prev_tile: function()
    {
        this.jfrom_tile.val(this.from_tile - 1);
        this.jfrom_tile.change();
    },
    action_more_length: function()
    {
        this.jrow_length.val(this.row_length + 1);
        this.jrow_length.change();
    },
    action_less_length: function()
    {
        this.jrow_length.val(this.row_length - 1);
        this.jrow_length.change();
    },
    action_more_rows: function()
    {
        this.jnum_rows.val(this.num_rows + 1);
        this.jnum_rows.change();
    },
    action_less_rows: function()
    {
        this.jnum_rows.val(this.num_rows - 1);
        this.jnum_rows.change();
    },
    action_set_from_tile_to: function()
    {
        this.jfrom_tile.val(this.to_tile);
        this.jfrom_tile.change();
    },
    action_paint_object: function()
    {
        this.drawObject();
    }

    
};
