#!/bin/sh

XML2HTML="java -classpath /u/m/i/mihai/public/html/tools:${CLASSPATH} processXML2HTML"

[ -n "${P4CLIENT}" ] && p4 edit cuprins.html
tools/cuprins-html-xml.sh > cuprins.xml && \
    ${XML2HTML} templates/cuprins.xsl cuprins.xml && \
    rm -f cuprins.xml
