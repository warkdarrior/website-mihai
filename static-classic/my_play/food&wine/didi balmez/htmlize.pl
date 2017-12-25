#!/usr/bin/perl -w

use strict;

if( defined( $ARGV[ 0 ] ) )
{
  open STDIN, "< " . $ARGV[ 0 ];
  open STDOUT, "> " . $ARGV[ 0 ] . ".pre-html";
}

while( <> )
{
  chomp;

  s/\xC3\x8E/\&\#206;/g; # I^
  s/\xC3\xAE/\&\#238;/g; # i^

  s/\xC3\x82/\&\#194;/g; # A^
  s/\xC3\xA2/\&\#226;/g; # a^

  s/\xC4\x82/\&\#258;/g; # A~
  s/\xC4\x83/\&\#259;/g; # a~

  s/\xC5\x9E/\&\#350;/g; # S,
  s/\xC5\x9F/\&\#351;/g; # s,

  s/\xC5\xA2/\&\#354;/g; # T,
  s/\xC5\xA3/\&\#355;/g; # t,

  s/\xE2\x80\x9E/\"/g; # low "

  s/\xE2\x80\x94/-/g; # -

  print $_, "\n";
}
