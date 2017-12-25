#!/bin/sh

DEPTH=4
DATE=`date`
PATH2ROOT=`perl -e '$d = '$DEPTH'; if( $d > 0 ) { print "../" x ( $d - 1 ); print ".."; } else { print "."; }'`

j=`basename "$1" | sed 's/\.xml$//g'`

cat <<EOF
<recipe-page>
  <location>
    <component order="1" name="main" url="../../../../index.html" />
    <component order="2" name="playground" url="../../../index.html" />
    <component order="3" name="food &amp; wine" url="../../index.html" />
    <component order="4" name="didi balmez" url="../cuprins.html" />
    <component order="5" name="mur&#259;turi &#351;i conserve" url="./index.html" />
    <component order="6" name="$j" />
  </location>

  <menu>
  </menu>

  <chapter>
    <title>Mur&#259;turi &#351;i conserve</title>
  </chapter>

EOF

cat "$1" | sed 's#</recipe>#<file>'"$j"'</file></recipe>#g'

cat <<EOF
  <current-date>$DATE</current-date>
  <doc-depth value="$DEPTH">
    <root-path>$PATH2ROOT</root-path>
  </doc-depth>
</recipe-page>
EOF
