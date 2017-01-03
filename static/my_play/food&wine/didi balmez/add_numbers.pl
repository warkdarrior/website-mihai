#!/s/std/bin/perl -w

use strict;

my $gc = 0;
my $rc = 0;

while( my $line = <> )
  {
    chomp $line;

    if( $line =~ /^(\s*)<div class=\"TitluGrup/ )
      {
	$gc++;
	print $1, "<a name=\"grup-", sprintf( "%02d", $gc ), "\" />\n";
      }
    elsif( $line =~ /^(\s*)<div class=\"TitluReteta/ )
      {
	$rc++;
	print $1, "<a name=\"reteta-", sprintf( "%02d", $rc ), "\" />\n";
      }

    print $line, "\n";
  }
