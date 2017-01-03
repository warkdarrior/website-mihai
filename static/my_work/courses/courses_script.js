function writeFAQEntry( date, question, answer )
{
  document.write( "<tr bgcolor=\"blanchedalmond\">\n" );
  document.write( "<td>" );
  document.write( "<p align=\"right\">" + date + "</p><b>Q</b>: " + question );
  document.write( "</td>\n" );
  document.write( "</tr>\n" );

  document.write( "<tr bgcolor=\"gainsboro\">\n" );
  document.write( "<td>" );
  document.write( "<b>A</b>: " + answer );
  document.write( "</td>\n" );
  document.write( "</tr>\n" );

  document.write( "<tr><td height=\"5\"></td></tr>\n" );
}
