menuImageDown = new Array();
menuImageUp = new Array();
topDir = "";
for( i = 0; i < depth; i++ )
{
  topDir = topDir + "../";
}
for( i = 0; i < menuName.length; i++ )
{
  menuImageDown[ i ] = new Image();
  menuImageDown[ i ].src = topDir + "images/" + menuName[ i ] + "_b_down.png";
  menuImageUp[ i ] = new Image();
  menuImageUp[ i ].src = topDir + "images/" + menuName[ i ] + "_b_up.png";
}

//////////////////////////////////////////////////////////////////////////////

function writeLocationHeader( text, link_array )
{
  htmltext = text.replace( / /g, "&nbsp;" );

  if( typeof( link_array ) != "undefined" )
  {
    var path_components = text.split( " / " );

    if( path_components.length > 1 )
    {
      htmltext = "";

      for( var i = 0; i < path_components.length - 1; i++ )
      {
        var component = path_components[ i ].replace( / /g, "&nbsp;" );

        if( typeof( link_array[ i ] ) != "undefined" )
        {
          htmltext += "<a class=\"OnsiteTopLink\" href=\"" +
                      link_array[ i ] + "\">" +
                      component + "</a>&nbsp;/&nbsp;";
        }
        else
        {
          htmltext += component + "&nbsp;/&nbsp;";
        }
      }

      var last_component =
	path_components[ path_components.length - 1 ].replace( / /g, "&nbsp;" );

      htmltext += last_component;
    }
  }

  document.write( "<table width=\"100%\" cellpadding=\"5\" cellspacing=\"0\" border=\"0\"" +
		  " bgcolor=\"ffeeaa\">\n" );
  document.write( "  <tr>\n" );
  document.write( "    <td width=\"50%\"><b>\n" );
  document.write( "      <font color=\"black\">\n" );
  document.write( "      Mihai&nbsp;Christodorescu:&nbsp;</font>" +
                  "<font color=\"black\">" + htmltext + "</font>\n" );
  document.write( "      </b>\n" );
  document.write( "    </td>\n" );

  document.write( "    <td valign=\"middle\" width=\"50%\" align=\"right\">\n" );

  document.write( "      <table cellpadding=\"1\" cellspacing=\"0\" border=\"0\">\n" );
  document.write( "        <tr>\n" );
  document.write( "          <td valign=\"middle\">" );
  document.write(             "<a class=\"Onsite\" href=\"" + topDir + "calendar.html\">" );
  document.write( "            <img align=\"center\" src=\"" + topDir + "images/calendar_icon.png\" border=\"0\">" );
  document.write(             "</a>" );
  document.write(           "</td>\n" );
  document.write( "          <td valign=\"middle\">" );
  document.write(             "<a class=\"OnsiteTopLink\" href=\"" + topDir + "calendar.html\">" );
  document.write(             "<b>Calendar</b>" );
  document.write(             "</a>" );
  document.write(           "</td>\n" );

  document.write( "          <td valign=\"middle\">" );
  document.write(           "&nbsp;&nbsp;" );
  document.write(           "</td>\n" );

  document.write( "          <td valign=\"middle\">" );
  document.write(             "<a class=\"Onsite\" href=\"" + topDir + "contact.html\">" );
  document.write(             "<img align=\"middle\" src=\"" + topDir + "images/email_icon.png\" border=\"0\>" );
  document.write(             "</a>" );
  document.write(           "</td>\n" );
  document.write( "          <td valign=\"middle\">" );
  document.write(           "</td>\n" );
  document.write( "          <td valign=\"middle\">" );
  document.write(             "<a class=\"OnsiteTopLink\" href=\"" + topDir + "contact.html\">" );
  document.write(             "<b>Contact&nbsp;info</b>" );
  document.write(             "</a>" );
  document.write(           "</td>\n" );

  document.write(         "</tr>\n" );
  document.write(       "</table>\n" );

  document.write(     "</td>\n" );
  document.write(   "</tr>\n" );
  document.write( "</table>\n" );
}

//////////////////////////////////////////////////////////////////////////////

function writeNewsItem( date, text )
{
  document.write( "<tr valign=\"top\">\n" );

  document.write( "<td align=\"left\">" );
  document.write( date );
  document.write( "</td>\n" );

  document.write( "<td align=\"left\">" );
  document.write( text );
  document.write( "</td>\n" );

  document.write( "</tr>\n" );
}

//////////////////////////////////////////////////////////////////////////////

function writeMenuItem( b_name, b_link )
{
  for( idx = 0; idx < menuName.length && menuName[ idx ] != b_name; idx++ );
  document.write( "<a href=\"", b_link, "\" " );
  document.write( "onMouseOver=\"document.", b_name,
                  "_b.src=menuImageUp[", idx, "].src;\" " );
  document.write( "onMouseOut=\"document.", b_name,
                  "_b.src=menuImageDown[", idx, "].src;\" " );
  document.write( ">" );
  document.write( "<img name=\"", b_name, "_b\" src=\"" + topDir + "images/",
                  b_name, "_b_down.png\" border=\"0\">" );
  document.writeln( "</a>" );
}

//////////////////////////////////////////////////////////////////////////////

function makePath( path )
{
  return topDir + path;
}

//////////////////////////////////////////////////////////////////////////////

function putImage( img_name, img_html )
{
  document.writeln( "<img src=\"" + topDir + "images/" + img_name + "\"" + img_html + ">" );
}

//////////////////////////////////////////////////////////////////////////////

function getLink( link_url, link_html )
{
  var tD = topDir;
  if( topDir.length > 0 )
  {
    if( topDir.charAt( topDir.length - 1 ) == '/' )
    {
      tD = topDir.substring( 0, topDir.length - 1 );
    }
  }
  else
    tD = ".";

  return "<a class=\"Onsite\" href=\"" + tD +
         link_url.replace( /\s/g, "%20" ) + "\">" + link_html + "</a>";
}

//////////////////////////////////////////////////////////////////////////////

function putLink( link_url, link_html )
{
  document.writeln( getLink( link_url, link_html ) );
}

//////////////////////////////////////////////////////////////////////////////

function displayPhotoListWithComments( photo_dir,
	                               photo_list, comment_list,
				       index_list,
				       per_row )
{
  var row_count = Math.floor( photo_list.length / per_row );
  if( photo_list.length % per_row > 0 ) row_count++;

  document.writeln( "<table align=\"center\" cellpadding=\"5\" cellspacing=\"0\" border=\"0\">" );
  for( var i = 0; i < row_count; i++ )
  {
    document.writeln( "<tr>" );

    document.writeln( "<td height=\"138\">" +
	              "<spacer type=\"block\" height=\"138\" width=\"1\">" +
                      "</td>" );

    for( var j = 0; j < per_row; j++ )
    {
      if( i * per_row + j < photo_list.length )
      {
	document.writeln( "<td width=\"138\" valign=\"middle\" align=\"center\" bgcolor=\"#dddddd\">" );
	document.writeln( "<table bgcolor=\"black\" cellpadding=\"1\" cellspacing=\"0\" border=\"0\"><tr><td>" );
	document.writeln( "<table bgcolor=\"#dddddd\" cellpadding=\"2\" cellspacing=\"0\" border=\"0\"><tr><td>" );

	var photo_name = photo_list[ i * per_row + j ].replace( / /g, "\%20" );

	document.write( "<a class=\"Onsite\" href=\"" + photo_dir + "/images/" +
			photo_name + "\">" );

	document.write( "<img src=\"" + photo_dir + "/thumbnails/" +
			photo_name + "\" " +
			" border=\"0\">" );

	document.write( "</a>" );

	document.writeln( "</td></tr></table>" );
	document.writeln( "</td></tr></table>" );
      }
      else
      {
	  document.writeln( "<td width=\"138\" valign=\"middle\" align=\"center\" bgcolor=\"white\">" );
      }

      document.writeln( "</td>" );

      if( i == 0 ) document.writeln( "<td width=\"5\" rowspan=\"" +
				     ( row_count * 3 - 1 ) + "\"></td>" );
    }

    document.writeln( "</tr>" );
    document.writeln( "<tr>" );
    document.writeln( "<td></td>" );

    for( var j = 0; j < per_row; j++ )
    {
      if( i * per_row + j < photo_list.length )
      {
	document.writeln( "<td width=\"138\" valign=\"top\" align=\"center\" bgcolor=\"#dddddd\">" );
	document.writeln( "<table bgcolor=\"black\" cellpadding=\"1\" cellspacing=\"0\" border=\"0\"><tr><td>" );
	document.writeln( "<table bgcolor=\"#ffffdd\" cellpadding=\"2\" cellspacing=\"0\" border=\"0\"><tr><td>" );
	document.writeln( "<i>Photo " + index_list[ i * per_row + j ] + ":</i><br>" );
	document.writeln( comment_list[ i * per_row + j ] );
	document.writeln( "</td></tr></table>" );
	document.writeln( "</td></tr></table>" );
	document.writeln( "<spacer type=\"block\" width=\"138\" height=\"1\">" );
      }
      else
      {
	document.write( "<td width=\"138\" valign=\"top\" align=\"center\" bgcolor=\"white\">" );
      }
      document.writeln( "</td>" );
    }

    document.writeln( "</tr>" );

    document.writeln( "<tr><td colspan=\"" + ( 2 * per_row - 1 ) + "\"></td></tr>" );
  }
  document.writeln( "</tr></table>" );
}

//////////////////////////////////////////////////////////////////////////////

function putImageWithBorder( img_name, img_width, img_height )
{
  writeWithinCorners( "<img src=\"" + img_name + "\" width=\"" + img_width + "\" height=\"" + img_height + "\" border=\"0\">", "white", img_width, img_height );
}

//////////////////////////////////////////////////////////////////////////////

function putLinkedImageWithBorder( img_name, img_width, img_height,
				   bgcolor, url )
{
  var percentage = 0.25;
  var corner_size = ( img_width > img_height ) ?
    Math.floor( img_height * percentage ) :
    Math.floor( img_width * percentage );

  document.writeln( "<table bgcolor=\"green\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">" );

  document.writeln( "<tr>" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" + line_size + "\"><spacer type=\"block\" width=\"" + line_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td width=\"" + corner_size + "\" height=\"" + line_size + "\"><spacer type=\"block\" width=\"" + corner_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td bgcolor=\"" + bgcolor + "\" width=\"" + ( img_width - 2 * corner_size ) + "\" height=\"" + line_size + "\"><spacer type=\"block\" width=\"" + ( img_width - 2 * corner_size ) + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td width=\"" + corner_size + "\" height=\"" + line_size + "\"><spacer type=\"block\" width=\"" + corner_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" + line_size + "\"><spacer type=\"block\" width=\"" + line_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "</tr>" );

  document.writeln( "<tr>" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" + corner_size + "\"><spacer type=\"block\" width=\"" + line_size + "\" height=\"" + corner_size + "\"></td>" );
  document.writeln( "<td rowspan=\"3\" colspan=\"3\" align=\"center\" valign=\"middle\">" +
	            "<table bgcolor=\"" + bgcolor + "\" border=\"0\" cellspacing=\"0\" cellpadding=\"5\"><tr><td><a class=\"Onsite\" href=\"" + url + "\"><img src=\"" + img_name + "\" width=\"" + img_width + "\" height=\"" + img_height + "\" border=\"0\"></a></td></tr></table>" +
	            "</td>" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" + corner_size + "\"><spacer type=\"block\" width=\"" + line_size + "\" height=\"" + corner_size + "\"></td>" );
  document.writeln( "</tr>" );

  document.writeln( "<tr bgcolor=\"" + bgcolor + "\">" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" + ( img_height - 2 * corner_size ) + "\"><spacer type=\"block\" width=\"" + line_size + "\" height=\"" + ( img_height - 2 * corner_size ) + "\"></td>" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" + ( img_height - 2 * corner_size ) + "\"><spacer type=\"block\" width=\"" + line_size + "\" height=\"" + ( img_height - 2 * corner_size ) + "\"></td>" );
  document.writeln( "</tr>" );

  document.writeln( "<tr bgcolor=\"green\">" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" + corner_size + "\"><spacer type=\"block\" width=\"" + line_size + "\" height=\"" + corner_size + "\"></td>" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" + corner_size + "\"><spacer type=\"block\" width=\"" + line_size + "\" height=\"" + corner_size + "\"></td>" );
  document.writeln( "</tr>" );

  document.writeln( "<tr>" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" + line_size + "\"><spacer type=\"block\" width=\"" + line_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td width=\"" + corner_size + "\" height=\"" + line_size + "\"><spacer type=\"block\" width=\"" + corner_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td bgcolor=\"" + bgcolor + "\" width=\"" + ( img_width - 2 * corner_size ) + "\" height=\"" + line_size + "\"><spacer type=\"block\" width=\"" + ( img_width - 2 * corner_size ) + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td width=\"" + corner_size + "\" height=\"" + line_size + "\"><spacer type=\"block\" width=\"" + corner_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" + line_size + "\"><spacer type=\"block\" width=\"" + line_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "</table>" );
}

//////////////////////////////////////////////////////////////////////////////

function writeHighlightedCalendar( title, day_count, first_day,
	                           highlighted_days, linked_days )
{
  var day_is_highlighted = new Array();
  for( var i = 1; i <= day_count; i++ )
    day_is_highlighted[ i ] = false;
  for( var i = 0; i < highlighted_days.length; i++ )
    day_is_highlighted[ highlighted_days[ i ] ] = true;

  var day_link = new Array();
  for( var i = 1; i < day_count; i++ )
    day_link[ i ] = "";
  for( var i = 0; i < highlighted_days.length; i++ )
    day_link[ highlighted_days[ i ] ] = linked_days[ i ];

  document.writeln( "<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" bgcolor=\"green\">" );
  document.writeln( "<tr>" );
  document.writeln( "<td colspan=\"3\" bgcolor=\"white\">" );
  document.writeln( "<b>" + title + "</b>" );
  document.writeln( "</td>" );
  document.writeln( "</tr>" );
  document.writeln( "<tr>" );
  document.writeln( "<td colspan=\"3\" bgcolor=\"white\" height=\"5\"><spacer type=\"block\" height=\"5\"></td>" );
  document.writeln( "</tr>" );
  document.writeln( "<tr>" );
  document.writeln( "<td colspan=\"3\" height=\"4\"><spacer type=\"block\" height=\"4\"></td>" );
  document.writeln( "</tr>" );
  document.writeln( "<tr>" );
  document.writeln( "<td width=\"1\"><spacer type=\"block\" width=\"1\"></td>" );
  document.writeln( "<td bgcolor=\"white\" align=\"center\">" );
  document.writeln( "<table class=\"Calendar\">" );
  document.writeln( "<tr>" );

  var found = false;
  var day_idx = 1;

  var dayOfWeek = [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ];
  for( var i = 0; i < 7; i++ )
  {
    document.writeln( "<td class=\"CalWeekHeader\">" + dayOfWeek[ i ] +
	              "</td>" );
    if( dayOfWeek[ i ] == first_day )
      found = true;

    if( ! found )
    {
      day_idx--;
    }
  }

  var row_count = Math.floor( ( day_count + day_idx + 1 ) / 7 );
  if( ( day_count + day_idx + 1 ) % 7 != 0 )
  {
    row_count += 1;
  }

  document.writeln( "</tr>" );

  for( var i = 0; i < row_count * 7; i++ )
  {
    if( i % 7 == 0 )
      document.writeln( "<tr>" );

    if( day_idx < 1 || day_idx > day_count )
      document.writeln( "<td class=\"CalNonDay\">&nbsp;</td>" );
    else
      if( day_is_highlighted[ day_idx ] )
	  if( String( day_link[ day_idx ] ).length > 0
	      &&
	      String( day_link[ day_idx ] ) != "undefined" )
	   document.writeln( "<td class=\"TripDay\">" +
			     "<a class=\"Onsite\" href=\"" +
			     day_link[ day_idx ] + "\"><b>" +
			     day_idx + "</b></a>" +
			     "</td>" );
          else
	    document.writeln( "<td class=\"TripDay\">" +
			      day_idx + "</td>" );
      else
        document.writeln( "<td class=\"CalDay\">" + day_idx + "</td>" );

    day_idx++;

    if( i % 7 == 6 )
      document.writeln( "</tr>" );
  }

  document.writeln( "</table>" );
  document.writeln( "</td>" );
  document.writeln( "<td width=\"1\"><spacer type=\"block\" "+
		    "width=\"1\"></td>" );
  document.writeln( "</tr>" );
  document.writeln( "<tr>" );
  document.writeln( "<td colspan=\"3\" height=\"1\">" +
		    "<spacer type=\"block\" height=\"1\"></td>" );
  document.writeln( "</tr>" );
  document.writeln( "</table>" );
}

//////////////////////////////////////////////////////////////////////////////

function displaySizedPhotoListWithComments( photo_dir,
					    photo_list, comment_list,
					    index_list, size_list,
					    per_row )
{
  var row_count = Math.floor( photo_list.length / per_row );
  if( photo_list.length % per_row > 0 ) row_count++;

  var max_width = -1;
  for( var i = 0; i < size_list.length; i++ )
    if( size_list[ i ].width > max_width )
      max_width = size_list[ i ].width;

  var max_height = max_width;

  document.writeln( "<table align=\"center\" cellpadding=\"5\" " +
		    "cellspacing=\"0\" border=\"0\">" );
  for( var i = 0; i < row_count; i++ )
  {
    document.writeln( "<tr>" );

    document.writeln( "<td height=\"" + ( max_height + 20 ) + "\">" +
	              "<spacer type=\"block\" height=\"" +
		      ( max_height + 10 ) + "\" width=\"1\">" +
                      "</td>" );

    for( var j = 0; j < per_row; j++ )
    {
      if( i * per_row + j < photo_list.length )
      {
	document.writeln( "<td width=\"" + ( max_width + 32 ) +
			  "\" valign=\"middle\" align=\"center\" " +
			  "bgcolor=\"#ffffff\">" );

	var thumb_name = photo_list[ i * per_row + j ].replace( / /g, "\%20" );
	var photo_name = thumb_name.replace( /\.png$/g, ".jpg" );

	writeWithinCorners( "<a class=\"Onsite\" href=\"" +
			    photo_dir + "/images/" + photo_name + "\">" +
			    "<img border=\"0\" src=\"" +
			    photo_dir + "/thumbnails/" + thumb_name + "\">" +
			    "</a>",
			    "#ffffff",
			    size_list[ i * per_row + j ].width,
			    size_list[ i * per_row + j ].height, "green" );
      }
      else
      {
	  document.writeln( "<td width=\"" + ( max_width + 32 ) +
			    "\" valign=\"middle\" align=\"center\" " +
			    "bgcolor=\"white\">" );
      }

      document.writeln( "</td>" );

      if( i == 0 ) document.writeln( "<td width=\"5\" " +
				     "rowspan=\"" +
				     ( row_count * 3 - 1 ) +
				     "\"><spacer type=\"block\" " +
				     "width=\"5\"></td>" );
    }

    document.writeln( "</tr>" );
    document.writeln( "<tr>" );
    document.writeln( "<td><spacer width=\"1\" height=\"1\"></td>" );

    for( var j = 0; j < per_row; j++ )
    {
      if( i * per_row + j < photo_list.length )
      {
	document.writeln( "<td width=\"" + ( max_width + 32 ) +
			  "\" valign=\"top\" align=\"center\" " +
			  ">" );
	document.writeln( "<table bgcolor=\"green\" " +
			  "cellpadding=\"1\" cellspacing=\"0\" " +
			  "border=\"0\"><tr><td>" );
	document.writeln( "<table " +
			  "cellpadding=\"5\" cellspacing=\"0\" " +
			  "border=\"0\"><tr><td bgcolor=\"#ffffdd\">" );
	document.writeln( "<i>Photo " + index_list[ i * per_row + j ] +
			  ":</i><br>" );
	document.writeln( comment_list[ i * per_row + j ] );
	document.writeln( "</td></tr></table>" );
	document.writeln( "</td></tr></table>" );
	document.writeln( "<spacer type=\"block\" width=\"" +
			  ( max_width + 32 ) + "\" height=\"1\">" );
      }
      else
      {
	document.write( "<td width=\"" + ( max_width + 32 ) +
			"\" valign=\"top\" align=\"center\" " +
			"bgcolor=\"white\">" );
      }
      document.writeln( "</td>" );
    }

    document.writeln( "</tr>" );

    document.writeln( "<tr><td height=\"5\" colspan=\"" +
		      ( 2 * per_row + 1 ) + "\">" +
		      "<spacer type=\"block\" height=\"5\"></td></tr>" );
  }
  document.writeln( "</tr></table>" );
}

//////////////////////////////////////////////////////////////////////////////

function writeWithinCorners( text, bgcolor, text_width, text_height, linecolor )
{
  if( String( text_width ) == "undefined" || text_width == -1 )
    text_width = 100;
  if( String( text_height ) == "undefined" || text_height == -1 )
    text_height = 100;
  if( String( line_size ) == "undefined" || line_size == -1 )
    line_size = 1;

  var percentage = 0.25;
  var corner_size = ( text_width > text_height ) ?
    Math.floor( text_height * percentage ) :
    Math.floor( text_width * percentage );

  document.writeln( "<table align=\"center\" border=\"0\" " +
		    "cellpadding=\"0\" cellspacing=\"5\">" );

  document.writeln( "<tr bgcolor=\"" + linecolor + "\">" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" +
		    line_size + "\"><spacer type=\"block\" width=\"" +
		    line_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td width=\"" + corner_size + "\" height=\"" +
		    line_size + "\"><spacer type=\"block\" width=\"" +
		    corner_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td bgcolor=\"" + bgcolor + "\" width=\"" +
		    ( text_width - 2 * corner_size ) + "\" height=\"" +
		    line_size + "\"><spacer type=\"block\" width=\"" +
		    ( text_width - 2 * corner_size ) + "\" height=\"" +
		    line_size + "\"></td>" );
  document.writeln( "<td width=\"" + corner_size + "\" height=\"" +
		    line_size + "\"><spacer type=\"block\" width=\"" +
		    corner_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" +
		    line_size + "\"><spacer type=\"block\" width=\"" +
		    line_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "</tr>" );

  document.writeln( "<tr bgcolor=\"" + linecolor + "\">" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" +
		    corner_size + "\"><spacer type=\"block\" width=\"" +
		    line_size + "\" height=\"" + corner_size + "\"></td>" );
  document.writeln( "<td bgcolor=\"" + bgcolor + "\" rowspan=\"3\" colspan=\"3\" align=\"center\" " +
		    "valign=\"middle\">" +
	            "<table bgcolor=\"" + bgcolor + "\" border=\"0\" " +
		    "cellspacing=\"0\" cellpadding=\"5\">" +
		    "<tr><td width=\"" + text_width +
		    "\" height=\"" + text_height + "\">" +
		    text +
		    "</td></tr></table>" +
	            "</td>" );
  document.writeln( "<td width=\"" + line_size + "\" " +
		    "height=\"" + corner_size + "\">" +
		    "<spacer type=\"block\" width=\"" +
		    line_size + "\" height=\"" + corner_size + "\"></td>" );
  document.writeln( "</tr>" );

  document.writeln( "<tr bgcolor=\"" + bgcolor + "\">" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" +
		    ( text_height - 2 * corner_size ) + "\">" +
		    "<spacer type=\"block\" width=\"" + line_size +
		    "\" height=\"" + ( text_height - 2 * corner_size ) +
		    "\"></td>" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" +
		    ( text_height - 2 * corner_size ) + "\">" +
		    "<spacer type=\"block\" width=\"" + line_size +
		    "\" height=\"" + ( text_height - 2 * corner_size ) +
		    "\"></td>" );
  document.writeln( "</tr>" );

  document.writeln( "<tr bgcolor=\"" + linecolor + "\">" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" +
		    corner_size + "\"><spacer type=\"block\" width=\"" +
		    line_size + "\" height=\"" + corner_size + "\"></td>" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" +
		    corner_size + "\"><spacer type=\"block\" " +
		    "width=\"" + line_size + "\" height=\"" +
		    corner_size + "\"></td>" );
  document.writeln( "</tr>" );

  document.writeln( "<tr bgcolor=\"" + linecolor + "\">" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" +
		    line_size + "\"><spacer type=\"block\" width=\"" +
		    line_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td width=\"" + corner_size + "\" height=\"" +
		    line_size + "\"><spacer type=\"block\" width=\"" +
		    corner_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td bgcolor=\"" + bgcolor + "\" width=\"" +
		    ( text_width - 2 * corner_size ) + "\" height=\"" +
		    line_size + "\"><spacer type=\"block\" width=\"" +
		    ( text_width - 2 * corner_size ) + "\" height=\"" +
		    line_size + "\"></td>" );
  document.writeln( "<td width=\"" + corner_size + "\" height=\"" +
		    line_size + "\"><spacer type=\"block\" width=\"" +
		    corner_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "<td width=\"" + line_size + "\" height=\"" +
		    line_size + "\"><spacer type=\"block\" width=\"" +
		    line_size + "\" height=\"" + line_size + "\"></td>" );
  document.writeln( "</table>" );
}

//////////////////////////////////////////////////////////////////////////////

function writeSophosLatestVirusAlerts()
{
  // Want to customise the look and feel of the virus information
  // on your site? Simply change the following values to your own
  // preferences.
  //
  // Changing the value of 'count' will change the number of rows
  // displayed.
  // Changing the value of 'target' to 'new' will display the link in
  // a new window.

  // *****************************************************************

  var bgcolour_main     = '#eeeedd';
  var bgcolour_heading  = '#ffffaa';
  var text_colour       = '#000000';
  var link_colour       = '#117733';
  var font_size         = '1';
  var font_face         = 'verdana, arial, helvetica, sans-serif';
  var count             =  10;   // number should be between 1 and 10
  var first_column      = 'yes'; // 'yes' or 'no'
  var cellspacing       = 'no'; // 'yes' or 'no'
  var target            = '_self'; // '_self' or 'new'

  // *****************************************************************
  //  Be careful not to change anything below this line!

  var htmltxt = "";
  var font_desc = '<font face="' + font_face + '" size="'
    + font_size + '" color="' + text_colour + '">';
  var tmp_count = 0;

  if (first_column == "no") {
    colspan = 1;
  } else {
    colspan = 2;
  }

  if (cellspacing == "no") {
    cellspacing = 0;
  } else {
    cellspacing = 2;
  }

  if (count > 0) {
    if (count > 10) {count = 10}
    htmltxt += '\n<table cellpadding="3" cellspacing="'
      + cellspacing + '" border="0" bgcolor="#ffffff">';
    if (count == 1) {
      htmltxt += '\n<tr><td colspan="' + colspan + '" bgcolor="'
	+ bgcolour_heading + '">' + font_desc
	+ '<b>Latest virus alert</b></font></td></tr>';
    } else {
    htmltxt += '\n<tr><td colspan="' + colspan + '" bgcolor="'
      + bgcolour_heading + '">' + font_desc + '<b>Latest '
      + count + ' virus alerts</b></font></td></tr>';
    }

    for (var i=0; i<tenalerts.length; i+=3) {
      tmp_count++;
      if (tmp_count > count) {
      break;
      } else {
	if (first_column == "no") {
	  htmltxt += '\n<tr><td bgcolor="' + bgcolour_main + '">'
	    + font_desc + '<a class="Offsite" href="' + tenalerts[i+2] + '" target="'
	    + target + '"><font color="' + link_colour
	    + '"><nobr>' + tenalerts[i+1]
	    + '</nobr></font></a></font></td></tr>';
	} else {
	  htmltxt += '\n<tr><td align="right" bgcolor="' + bgcolour_main + '">'
	    + font_desc + '<nobr>' + tenalerts[i+0]
        + '</nobr></font></td><td bgcolor="' + bgcolour_main + '">'
	    + font_desc + '<a class="Offsite" href="' + tenalerts[i+2] + '" target="'
	    + target + '"><font color="' + link_colour
	    + '"><nobr>' + tenalerts[i+1]
	    + '</nobr></font></a></font></td></tr>';
	}
      }
    }
  } else {
    document.write
      ("=== Sophos info feed error: Specify value of count > 0 ===");
  }

  htmltxt += '\n<tr><td colspan="' + colspan + '" bgcolor="'
    + bgcolour_heading + '">' + font_desc
    + 'Source: <a class="Offsite" href="http://www.sophos.com" target="'
    + target + '"><font color="' + link_colour
    + '">Sophos Anti-Virus</font></a></font></td></tr>';
  htmltxt += '\n</table>';

  document.write(htmltxt);
}

//////////////////////////////////////////////////////////////////////////////
