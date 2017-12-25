#!/s/std/bin/perl -w

use strict;

my $line;

my $done = 0;
while( ! $done )
  {
    my %reteta;
    $reteta{ titlu } = "";
    $reteta{ ingr } = "";
    $reteta{ instr }  = "";

    while( $line = <> )
      {
	chomp $line;
	last if $line =~ /^\s*$/;
	$reteta{ titlu } .= " " . $line;
      }

    while( $line = <> )
      {
	chomp $line;
	last if $line =~ /^\s*$/;
	$reteta{ ingr } .= " " . $line;
      }

    while( $line = <> )
      {
	chomp $line;
	last if $line =~ /^\s*$/;
	$reteta{ instr } .= " " . $line;
      }

    if( length( $reteta{ titlu } . $reteta{ ingr } . $reteta{ instr } ) > 0 )
      {
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

sub display_reteta
  {
    my $rtt = shift;

    my $titlu = $rtt->{ titlu };
    my $ingrediente = $rtt->{ ingr };
    my $instructiuni = $rtt ->{ instr };

    if ( length( $instructiuni ) > 0 )
      {
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
	@items = map
	  { "<span class=\"Ingredient\">\n" . $_ . "\n</span>\n"; }
	    @items;
	my $listadeingrediente = join( ",\n", @items );

	$instructiuni =~ s/^\s+//g;
	$instructiuni =~ s/\s+$//g;
	$instructiuni =~ s/
//g;

	print <<"TEXT";
<!-- =========================================================== -->

<div class="Reteta">
<div class="TitluReteta">
$titlu
</div>

<div class="ListaDeIngrediente">
$listadeingrediente</div>

<div class="Instructiuni">
$instructiuni
</div>

	      <div class="FotografiiDeReteta">
		<div class="InvitatieFotoDeReteta">
		  Ai &#238;ncercat re&#355;eta aceasta? <a class="Onsite"
		  href="mailto:mihai@cs.wisc.edu">Trimite-mi o
		  poz&#259;</a> &#351;i o voi publica aici.
		</div>
	      </div>

</div>
TEXT
      }
    else
      {
	$titlu =~ s/^\s+//g;
	$titlu =~ s/\s+$//g;
	$titlu =~ s/
//g;

	$instructiuni = $ingrediente;

	$instructiuni =~ s/^\s+//g;
	$instructiuni =~ s/\s+$//g;
	$instructiuni =~ s/
//g;

	print <<"TEXT";

<!-- =========================================================== -->

<div class="Reteta">
<div class="TitluReteta">
$titlu
</div>

<div class="Instructiuni">
$instructiuni
</div>

	      <div class="FotografiiDeReteta">
		<div class="InvitatieFotoDeReteta">
		  Ai &#238;ncercat re&#355;eta aceasta? <a class="Onsite"
		  href="mailto:mihai@cs.wisc.edu">Trimite-mi o
		  poz&#259;</a> &#351;i o voi publica aici.
		</div>
	      </div>

</div>
TEXT
      }

}

#  while( $l = <> )
#   {
#     chomp $l;
#     @items = split( /, /, $l );
#     @items = map { "<span class=\"Ingredient\">\n" . $_ . "\n</span>\n"; } @items;
#     print join( ",\n", @items ); print "\n";
#   }
