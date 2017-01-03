#!/s/std/bin/perl -w

use strict;

# open GREPDATE, "egrep -B 1 -A 1 '<div class=\"(TitluReteta|TitluGrup)' \"" . $ARGV[ 0 ] . "\" |";

my $level = 0;

my @entries;

while( my $line = <> )
  {
    chomp $line;

    if( $line =~ /<a name=\"(.*)\" \/>/ )
      {
	my ( $tag ) = $1;

	my $grup = 0;

	$line = <>; chomp $line;
	if( $line =~ /<div/ )
	  {
	    $level++;

	    $grup = 1
	      if $line =~ /class=\"TitluGrup/;
	  }

	$line = <>; chomp $line;
	my ( $info ) = $line =~ /^\s+(.*)$/;
	$info =~ s/
//g;

	$line = <>; chomp $line;

	push @entries, {
			tag => $tag,
			level => $level - 2,
			isgroup => $grup,
			text => $info
		       };

	if( $line =~ /<\/div>/ )
	  {
	    $level--;
	  }
      }
    elsif( $line =~ /<div/ )
      {
	$level++;
      }
    elsif( $line =~ /<\/div>/ )
      {
	$level--;
      }
  }

$level = 0;
foreach my $entry ( @entries )
  {
    if( $entry->{ level } > $level )
      {
	if( $entry->{ level } != 1 )
	  {
	    print "   " x ( $entry->{ level } - 1 );
	    print "<div style=\"margin-left: 2em\">\n";
	  }
      }
    elsif( $entry->{ level } < $level )
      {
	if( $entry->{ level } != 1 )
	  {
	    print "   " x $entry->{ level };
	    print "</div>\n";
	  }
      }

    print "   " x $entry->{ level };

    if( $entry->{ level } == 1 && $entry->{ isgroup } )
      {
	print "<span style=\"font-weight: bold\"> ";
	print "<a class=\"Onsite\" href=\"\#", $entry->{ tag }, "\"> ",
	  $entry->{ text }, " </a> <br>";
	print "</span>\n";
      }
    else
      {
	print "<a class=\"Onsite\" href=\"\#", $entry->{ tag }, "\"> ",
	  $entry->{ text }, " </a> <br>";
	print "\n";
      }

    $level = $entry->{ level };
  }

print "   " x ( $level - $_ ), "</div>\n"
  foreach @{ [ 1 .. $level - 1 ] };
