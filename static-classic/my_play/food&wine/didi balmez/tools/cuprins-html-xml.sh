#!/bin/sh

DEPTH=3
DATE=`date`
PATH2ROOT=`perl -e '$d = '$DEPTH'; if( $d > 0 ) { print "../" x ( $d - 1 ); print ".."; } else { print "."; }'`

cat <<EOF
<didibalmez-cdb-cuprins>
  <location>
    <component order="1" name="main" url="../../index.html" />
    <component order="2" name="playground" url="../index.html" />
    <component order="3" name="food &amp; wine" url="../index.html" />
    <component order="4" name="didi balmez" />
  </location>

  <menu>
  </menu>

EOF

for i in */data/_chapter*.xml
do
  j=`basename "$i" | sed 's/\.xml$//g; s/_chapter //g;'`
  cat "$i" | sed 's#</chapter>#  <file>'"$j"'</file>\
</chapter>\
#g'
done

cat <<EOF
  <current-date>$DATE</current-date>
  <doc-depth value="$DEPTH">
    <root-path>$PATH2ROOT</root-path>
  </doc-depth>
</didibalmez-cdb-cuprins>
EOF
