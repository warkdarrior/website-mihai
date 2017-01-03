#!/bin/sh

DEPTH=4
DATE=`date`
PATH2ROOT=`perl -e '$d = '$DEPTH'; if( $d > 0 ) { print "../" x ( $d - 1 ); print ".."; } else { print "."; }'`

cat <<EOF
<didibalmez-cdb-chapter>
  <location>
    <component order="1" name="main" url="../../index.html" />
    <component order="2" name="playground" url="../index.html" />
    <component order="3" name="food &amp; wine" url="../index.html" />
    <component order="4" name="didi balmez" url="../cuprins.html" />
    <component order="5" name="preparate din ou&#259;" />
  </location>

  <menu>
  </menu>

  <chapter>
    <id>2</id>
    <title>Preparate din ou&#259;</title>
  </chapter>
EOF

for i in data/*.xml
do
  j=`basename "$i" | sed 's/\.xml$//g'`
  cat "$i" | sed 's#</recipe>#  <file>'"$j"'</file>\
</recipe>\
#g'
done

cat <<EOF
  <current-date>$DATE</current-date>
  <doc-depth value="$DEPTH">
    <root-path>$PATH2ROOT</root-path>
  </doc-depth>
</didibalmez-cdb-chapter>
EOF
