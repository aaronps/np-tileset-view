<?php
    header('Content-Type: application/xml');
//    header('Content-Disposition: attachment; filename="tilesetdata.txt"');
//    readfile('tsdata.json');
//    echo ';//end of it';
    echo '<?xml version="1.0" encoding="utf-8"?><tilesetlist>';
    
    if ( ($d = opendir('.')) )
    {
        while ( ($cd = readdir($d)) !== false )
        {
            if ( is_dir($cd) && $cd[0] != '.' )
            {
                echo "<tileset name='$cd'/>\n";
            }
        }
        
        closedir($d);
    }
    echo '</tilesetlist>';
    
    
?>