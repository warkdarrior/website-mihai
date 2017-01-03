#!/usr/bin/perl -w

use strict;
use English;
use IO::Handle;
autoflush STDERR 1;

my $stdout = 0;
$stdout = 1
  if grep { /^--standard-output$/ } @ARGV;
if( $stdout )
  {
    print "Using STDOUT.\n";
  }

my $counter = 0;
my $line;

my $done = 0;
while( ! $done )
  {
    my %reteta;
    $reteta{ titlu } = "";
    $reteta{ ingr } = "";
    $reteta{ instr }  = "";

    #
    # read title
    #
    while( $line = <STDIN> )
      {
	chomp $line;
	last if $line =~ /^\s*$/;
	$reteta{ titlu } .= " " . $line;
      }

    $reteta{ filename } = remove_html( $reteta{ titlu } );

    #
    # read ingredients
    #
    while( $line = <STDIN> )
      {
	chomp $line;
	last if $line =~ /^\s*$/;
	$reteta{ ingr } .= " " . $line;
      }

    #
    # read instructions
    #
    while( $line = <STDIN> )
      {
	chomp $line;
	last if $line =~ /^\s*$/;
	$reteta{ instr } .= " " . $line;
      }

    #
    # cleanup
    #
    foreach my $k ( keys( %reteta ) )
      {
	$reteta{ $k } =~ s/
//g;
	$reteta{ $k } =~ s/\r//g;
	$reteta{ $k } =~ s/^\s+//g;
	$reteta{ $k } =~ s/\s+$//g;
      }

    #
    # display / generation
    #
    if( length( $reteta{ titlu } . $reteta{ ingr } . $reteta{ instr } ) > 0 )
      {
	$counter++;
	$reteta{ id } = $counter;
	display_reteta( \%reteta );
      }
    else
      {
	$done = 1;
      }
  }

# ##############################################################################
# ##############################################################################
# ##############################################################################

sub remove_html
  {
    my $text = shift;

    $text =~ s/\&\#206;/I/g; # I^
    $text =~ s/\&\#238;/i/g; # i^

    $text =~ s/\&\#194;/A/g; # A^
    $text =~ s/\&\#226;/a/g; # a^

    $text =~ s/\&\#258;/A/g; # A~
    $text =~ s/\&\#259;/a/g; # a~

    $text =~ s/\&\#350;/S/g; # S,
    $text =~ s/\&\#351;/s/g; # s,

    $text =~ s/\&\#354;/T/g; # T,
    $text =~ s/\&\#355;/t/g; # t,

    return $text;
  }

# ##############################################################################
# ##############################################################################
# ##############################################################################

sub display_reteta
  {
    my $rtt = shift;

    my $titlu = $rtt->{ titlu };
    my $ingrediente = $rtt->{ ingr };
    my $instructiuni = $rtt ->{ instr };
    my $id = $rtt->{ id };

    $titlu =~ s/^\s+//g;
    $titlu =~ s/\s+$//g;
    $titlu =~ s/
//g;

    $ingrediente =~ s/^\s+//g;
    $ingrediente =~ s/\s+$//g;
    $ingrediente =~ s/\.$//g;
    $ingrediente =~ s/
//g;

    my @items = split( /, /, $ingrediente );
    my $listadeingrediente = join( "\n",
				   map { "    <item>" . $_ . "</item>"; }
				       @items
				 );

    $instructiuni =~ s/^\s+//g;
    $instructiuni =~ s/\s+$//g;
    $instructiuni =~ s/
//g;

    printf STDERR "Creating recipe %3d: [%s] ...", $id, lc( $rtt->{ filename } );

    my $recipetext = <<TEXT;
<recipe>

  <id>$id</id>

  <title>$titlu</title>

  <ingredients>
$listadeingrediente
  </ingredients>

  <preparation>
$instructiuni
  </preparation>

</recipe>
TEXT

    if( $stdout )
      {
	print $recipetext;
      }
    else
      {
	open FOUT, "> " . lc( $rtt->{ filename } ) . ".xml";
	print FOUT $recipetext;
	close FOUT;
      }

    print STDERR " done.\n";
  }
